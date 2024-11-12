import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const URI = process.env.MONGODB_URI;
if (!URI) {
    console.error("MongoDB URI not defined");
    process.exit(1);
}

const client = new MongoClient(URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Successfully connected to MongoDB");
        return client.db("company"); // Specify your DB name
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

const dbPromise = connectToDatabase();
export default dbPromise;
