import * as mongoDB from "mongodb";

export interface EventLog {
  _id: string;
  name: string;
  activities: string[];
  edges: [[string, string, number]];
}

export const collections: { mylog?: mongoDB.Collection } = {};

export async function connectToDatabase(): Promise<EventLog> {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    "mongodb://admin:password@mongodb:27017",
  );
  await client.connect();

  const db: mongoDB.Db = client.db("mydatabase");

  const myLogConnection: mongoDB.Collection = db.collection("mylog");

  collections.mylog = myLogConnection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${myLogConnection.collectionName}`,
  );

  const myDoc = (await collections.mylog.findOne({})) as unknown as EventLog;

  return myDoc;
}
