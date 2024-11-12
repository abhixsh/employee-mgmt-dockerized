import express from "express";
import multer from "multer";
import dbPromise from "../db/connection.js";
import { ObjectId } from "mongodb";
import { auth, adminOnly } from "./middlewares.js"; // Import middleware

const router = express.Router();
let db;

dbPromise.then((database) => {
    db = database;
}).catch((err) => {
    console.error("Failed to connect to the database:", err);
});

// File upload configuration for employee photos
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Add Employee (admin only)
router.post("/", auth, adminOnly, upload.single("photo"), async (req, res) => {
    try {
        const newEmployee = {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
            photo: req.file ? req.file.buffer : null, // Save photo as binary
        };

        const collection = await db.collection("records");
        const result = await collection.insertOne(newEmployee);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding employee");
    }
});

// Get All Employees
router.get("/", async (req, res) => {
    try {
        const collection = await db.collection("records");
        const employees = await collection.find({}).toArray();
        res.status(200).json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching employees");
    }
});

// Get Employee by ID
router.get("/:id", async (req, res) => {
    try {
        const collection = await db.collection("records");
        const employee = await collection.findOne({ _id: new ObjectId(req.params.id) });
        if (!employee) return res.status(404).send("Employee not found");

        res.status(200).json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching employee");
    }
});

// Update Employee (admin only)
router.patch("/:id", auth, adminOnly, async (req, res) => {
    try {
        const updates = { $set: req.body };
        const collection = await db.collection("records");

        const result = await collection.updateOne({ _id: new ObjectId(req.params.id) }, updates);
        if (result.matchedCount === 0) return res.status(404).send("Employee not found");

        res.status(200).send("Employee updated");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating employee");
    }
});

// Delete Employee (admin only)
router.delete("/:id", auth, adminOnly, async (req, res) => {
    try {
        const collection = await db.collection("records");
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).send("Employee not found");

        res.status(200).send("Employee deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting employee");
    }
});

export default router;
