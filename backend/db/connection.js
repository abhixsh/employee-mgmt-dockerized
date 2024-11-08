import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const URI = process.env.MONGODB_URI; // Use environment variable

if (!URI) {
    console.error("Error: MongoDB URI is not defined in the environment variables.");
    process.exit(1); // Exit if URI is missing
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
        console.log("Successfully connected to MongoDB Atlas!");
        return client.db("employees"); // Return specific database instance
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

const dbPromise = connectToDatabase();
export default dbPromise;
