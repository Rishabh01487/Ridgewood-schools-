import { MongoClient, Db } from "mongodb";

const uri = process.env.DATABASE_URL || "";
let client: MongoClient | null = null;
let db: Db | null = null;

export async function getDb(): Promise<Db> {
  if (db) return db;
  if (!uri) {
    throw new Error("DATABASE_URL not set");
  }
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(); // uses default DB from connection string
  return db;
}

// Collections
export const collections = {
  parents: () => getDb().then(db => db.collection("parents")),
  students: () => getDb().then(db => db.collection("students")),
  reportCards: () => getDb().then(db => db.collection("reportCards")),
  subjects: () => getDb().then(db => db.collection("subjects")),
  notices: () => getDb().then(db => db.collection("notices")),
  noticeReads: () => getDb().then(db => db.collection("noticeReads")),
  participation: () => getDb().then(db => db.collection("participation")),
  galleryItems: () => getDb().then(db => db.collection("galleryItems")),
  admissions: () => getDb().then(db => db.collection("admissions")),
};
