// eslint-disable-next-line @typescript-eslint/no-var-requires
const { MongoClient } = require('mongodb');

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const uri = `mongodb+srv://${process.env.MONGO_INITDB_USERNAME}:${process.env.MONGO_INITDB_PASSWORD}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority`;

void (async () => {
  console.log('Cleaning collection..');
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(process.env.MONGO_INITDB_DATABASE).collection('people');
  await db.deleteMany({});
  console.log('Collection cleaned.');
  await client.close();
})();
