// eslint-disable-next-line @typescript-eslint/no-var-requires
const { MongoClient } = require('mongodb');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const uri = `${process.env.MONGO_CONNECTION_PROTOCOL}://${process.env.MONGO_INITDB_USERNAME}:${process.env.MONGO_INITDB_PASSWORD}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority`;

void (async () => {
  // eslint-disable-next-line no-console
  console.log('Cleaning collection..');
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(process.env.MONGO_INITDB_DATABASE).collection('people');
  await db.deleteMany({});
  // eslint-disable-next-line no-console
  console.log('\x1b[32m%s\x1b[0m', 'Collection cleaned.');
  await client.close();
})();
