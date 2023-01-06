import { MongoClient } from 'mongodb';
import { getEnv } from '../utils';

const username = getEnv('MONGO_INITDB_USERNAME');
const password = getEnv('MONGO_INITDB_PASSWORD');
const cluster = getEnv('MONGO_CLUSTER');
const dbName = getEnv('MONGO_INITDB_DATABASE');

const uri = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

export const db = client.db(dbName).collection('people');

export const connectMongodb = async () => {
  await client.connect();
  console.log('Connected successfully to server');
};
