import express, { Request, Response } from 'express';
import { connectMongodb, db } from './db';
import { Person } from './types';
import { getEnv } from './utils';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello there!');
});

app.get('/crash-server', (req: Request, res: Response) => {
  res.send('Crashing server!');
  process.exit(1);
});

app.get('/health', (req: Request, res: Response) => {
  res.send('OK');
});

app.get('/env', (req: Request, res: Response) => {
  res.send(process.env);
});

app.get('/get', async (req, res) => {
  const people = await db.find({}).toArray();
  res.json(people);
});

app.post('/save', async (req, res) => {
  const { name, age } = req.body as Person;
  const person = { name, age };
  await db.insertOne(person);
  res.json({ message: 'Person saved.' });
});

app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await db.deleteOne({ _id: id });
  res.json({ message: 'Person deleted.' });
});

const PORT = getEnv('PORT');

app.listen(PORT, async () => {
  await connectMongodb();
  const rocketshipEmoji = String.fromCodePoint(0x1f680);
  console.log('\x1b[32m%s\x1b[0m', `${rocketshipEmoji} Server is running on port ${PORT}`);
});
