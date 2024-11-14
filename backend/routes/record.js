import express from "express";

// This will help us connect to the database
import dbPromise from "../db/connection.js"; // Update to import dbPromise

// This helps convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
const router = express.Router();

// Ensure db is resolved from the promise
let db;

dbPromise.then(database => {
  db = database;
}).catch(err => {
  console.error("Failed to connect to the database:", err);
});

// Get all records (list of employees)
router.get("/", async (req, res) => {
  try {
    let collection = await db.collection("records");
    let results = await collection.find({}).toArray();
    res.status(200).json(results); // Return array of records in JSON format
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching records");
  }
});

// Get a single record by id
router.get("/:id", async (req, res) => {
  try {
    let collection = await db.collection("records");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) {
      return res.status(404).send("Record not found"); // Return if no record found
    }
    res.status(200).json(result); // Return single record as JSON
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching record");
  }
});

// Create new record (single or bulk)
router.post("/", async (req, res) => {
  try {
    let newDocuments = req.body; // Assuming the body contains an array of employee records

    // Check if the body is an array or a single object
    if (!Array.isArray(newDocuments)) {
      newDocuments = [newDocuments]; // Convert to array if it's a single object
    }

    let collection = await db.collection("records");
    
    // Bulk insert if multiple records are sent
    let result = await collection.insertMany(newDocuments);
    
    res.status(201).json(result); // Return the result of the insert operation
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding records");
  }
});

// Update a record by id
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
      return res.status(404).send("Record not found"); // If no record is found to update
    }

    res.status(200).json(result); // Return the updated result
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// Delete a record by id
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = await db.collection("records");
    let result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      return res.status(404).send("Record not found"); // If no record is found to delete
    }

    res.status(200).send("Record deleted"); // Confirm the record is deleted
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;
