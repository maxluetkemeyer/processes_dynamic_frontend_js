import * as mongoDB from "mongodb";
import { type MyLink, type MyNode } from "./types";

export interface EventLog {
  _id: string;
  name: string;
  activities: string[];
  edges: [[string, string, number]];
}

export interface EventLogWindows {
  _id: string;
  activities: string[];
  edges: [[string, string, number]];
}

export const collections: { mylog?: mongoDB.Collection, mylogWindows?: mongoDB.Collection } = {};

export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    "mongodb://admin:password@mongodb:27017",
  );
  await client.connect();

  const db: mongoDB.Db = client.db("mydatabase");

  const myLogConnection: mongoDB.Collection = db.collection("mylog");
  collections.mylog = myLogConnection;

  const myLogWindowsConnection: mongoDB.Collection = db.collection("mylog-windows");
  collections.mylogWindows = myLogWindowsConnection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${myLogConnection.collectionName}`,
  );
}

export async function fetchEventLog(): Promise<EventLog> {
  const myDoc = (await collections.mylog!.findOne({})) as unknown as EventLog; //TODO: handle error
  return myDoc;
}

export async function fetchEventLogWindows(): Promise<EventLogWindows[]> {
  const myWindows = (await collections.mylogWindows!.find({}).toArray()) as unknown as EventLogWindows[]; //TODO: handle error
  return myWindows;
}

export function createMyNodeList(myDoc: EventLog) {
    const nodes = myDoc.activities.map<MyNode>((activity) => ({
        id: activity,
        level: 0,
        x: 0,
        y: 0,
        steps: [],
    }));
    
    return nodes;
}

export function createMyLinkList(myDoc: EventLog) {
    const links = myDoc.edges.map((edge) => ({
        source: edge[0],
        target: edge[1],
        weight: edge[2],
        steps: []
    }));
    
    return links;
}

export function extractSteps(nodes: MyNode[], links: MyLink[], myWindows: EventLogWindows[]) {
    for(let i = 0; i < myWindows.length; i++) {
        const step = i;
        const window = myWindows[i]!;

        for (const activity of window.activities) {
            const node = nodes.find(node => node.id === activity);
            if (node) {
                node.steps.push(step);
            } else {
                console.warn(`Node with id ${activity} not found in nodes.`);
            }
        }

        for (const edge of window.edges) {
            const source = edge[0];
            const target = edge[1];
            const link = links.find(link => link.source === source && link.target === target);
            if (link) {
                link.steps.push(step);
            } else {
                console.warn(`Link from ${source} to ${target} not found in links.`);
            }
        }
    }
}