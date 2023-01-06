import express, { Request, Response } from 'express';
import fs from 'fs';
import { closeFile, getFile } from './fileHandlers';
import path from 'path';
import { ErrorGettingPoems, NewPoemBody } from './types';

const folderName = process.env.FOLDER_NAME ?? 'poems';
const fileName = process.env.FILE_NAME ?? 'poems.txt';

const folderPath = path.join(__dirname, folderName);
if (!fs.existsSync(folderPath)) {
  console.log('Creating poems folder...');
  fs.mkdirSync(folderPath);
}

const filePath = path.join(__dirname, folderName, fileName);

const app = express();

app.use(express.json());

app.post('/new-poem', async (req: Request, res: Response) => {
  const poemSeparator = '\n***\n';
  const { title, text } = req.body as NewPoemBody;
  const poem = `${title}\n\n${text}\n${poemSeparator}`;
  const fd = await getFile(filePath);

  return fs.appendFile(fd, poem, async err => {
    if (err) throw err;
    console.log('The poem was appended to file!');
    await closeFile(fd);
    res.send('The poem was appended to file!');
  });
});

app.gsdset('/poems', async (req: Request, res: Response) => {
  try {
    const fd = await getFile(filePath);

    return fs.readFile(fd, 'utf8', async (err, data) => {
      if (err) throw err;
      console.log('The file has been read!');
      await closeFile(fd);
      res.send(data);
    });
  } catch (e: any) {
    console.log(e);
    const error = e as ErrorGettingPoems;
    return res.send(error.message).status(500);
  }
});

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

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  const rocketshipEmoji = String.fromCodePoint(0x1f680);
  console.log('\x1b[32m%s\x1b[0m', `${rocketshipEmoji} Server is running on port ${PORT}`);
});
