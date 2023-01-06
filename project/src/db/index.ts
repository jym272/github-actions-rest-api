import { MongoClient } from 'mongodb';

const username = 'rest-api-user';
const password = 'manzana';
const cluster = 'cluster0.hhxxk.mongodb.net';

const uri = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

export const db = client.db('rest-api').collection('people');

export const connectMongodb = async () => {
  await client.connect();
  console.log('Connected successfully to server');
};
