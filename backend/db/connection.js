import { MongoClient, ServerApiVersion } from "mongodb";

const URI = "mongodb://localhost:27017"; // Use the correct URI for your setup
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Create an async function to handle the connection
async function connectToDatabase() {
  try {
    await client.connect(); // Connect the client to the server
    await client.db("admin").command({ ping: 1 }); // Send a ping to confirm connection
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return client.db("employees"); // Return the database instance
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

// Call the function to connect and export the database instance
const dbPromise = connectToDatabase();

export default dbPromise; // Export the promise, which resolves to the db instance
