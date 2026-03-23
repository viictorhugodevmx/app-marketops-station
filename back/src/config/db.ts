import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI as string;

if (!uri) {
  throw new Error("❌ MONGO_URI is not defined");
}

const client = new MongoClient(uri);

export const connectDB = async () => {
  try {
    await client.connect();
    console.log("🟢 MongoDB connected");
  } catch (error) {
    console.error("🔴 MongoDB connection error:", error);
    process.exit(1);
  }
};

export const db = client.db(); // usa la db del URI
