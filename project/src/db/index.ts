import { MongoClient } from 'mongodb';
import { getEnv, successConnectionMsg } from '@utils/index';

const username = getEnv('MONGO_INITDB_USERNAME');
const password = getEnv('MONGO_INITDB_PASSWORD');
const cluster = getEnv('MONGO_CLUSTER');
const dbName = getEnv('MONGO_INITDB_DATABASE');
const protocol = getEnv('MONGO_CONNECTION_PROTOCOL');

const uri = `${protocol}://${username}:${password}@${cluster}/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

export const db = client.db(dbName).collection('people');

export const connectMongodb = async () => {
  await client.connect();
  successConnectionMsg('Connected successfully to mongodb');
};
