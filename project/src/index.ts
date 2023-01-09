import express, { Request, Response } from 'express';
import { connectMongodb, db } from './db';
import { Person, DecodedPermission } from './types';
import { getEnv } from './utils';
import jwt from 'jsonwebtoken';
const app = express();

const secret = getEnv('JWT_SECRET');
// const permission = {
//   delete: true
// };
// const options = {
//   expiresIn: '1d'
// };
// // Generate the JWT
// const token = jwt.sign(permission, secret, options);
// console.log(token)

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

app.delete('/delete-people-collection', async (req, res) => {
  const rawToken = req.headers.authorization;
  if (!rawToken) {
    res.status(401).json({ message: 'Unauthorized.' });
    return;
  }
  let token = rawToken;
  if (rawToken.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  let decoded;
  try {
    decoded = jwt.verify(token, secret);
    console.log('DECODED', decoded);
  } catch (err) {
    console.log('ERROR', err);
    res.status(401).json({ message: 'Unauthorized.' });
    return;
  }
  const permissions = JSON.parse(JSON.stringify(decoded)) as DecodedPermission;
  if (permissions.exp < Math.floor(Date.now() / 1000) || !permissions.delete) {
    res.status(401).json({ message: 'Unauthorized.' });
    return;
  }
  await db.drop();
  res.json({ message: 'Collection deleted.' });
});

const PORT = getEnv('PORT');

app.listen(PORT, async () => {
  await connectMongodb();
  const rocketshipEmoji = String.fromCodePoint(0x1f680);
  console.log('\x1b[32m%s\x1b[0m', `${rocketshipEmoji} Server is running on port ${PORT}`);
});
