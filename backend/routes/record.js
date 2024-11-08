import express from "express";

// This will help us connect to the database
import dbPromise from "../db/connection.js"; // Update to import dbPromise

// This helps convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// Ensure db is resolved from the promise
let db;

dbPromise.then(database => {
  db = database;
}).catch(err => {
  console.error("Failed to connect to the database:", err);
});

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  try {
    let collection = await db.collection("records");
    let results = await collection.find({}).toArray();
    res.status(200).send(results); // Status should be set before sending the response
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching records");
  }
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  try {
    let collection = await db.collection("records");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) {
      return res.status(404).send("Not found"); // Return here to avoid sending multiple responses
    }
    res.status(200).send(result); // Status should be set before sending the response
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching record");
  }
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };
    let collection = await db.collection("records");
    let result = await collection.insertOne(newDocument);
    res.status(201).send(result); // Use 201 for created resource
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };

    let collection = await db.collection("records");
    let result = await collection.updateOne(query, updates);
    if (result.matchedCount === 0) {
      return res.status(404).send("Record not found"); // Handle case where no records match
    }
    res.status(200).send(result); // Send response after checking updates
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = await db.collection("records"); // Use await here
    let result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      return res.status(404).send("Record not found"); // Handle case where no records are deleted
    }
    res.status(200).send("Record deleted"); // Confirm deletion
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;
