import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbPromise from "../db/connection.js";

const router = express.Router();
let db;

dbPromise.then((database) => {
    db = database;
}).catch((err) => {
    console.error("Failed to connect to the database:", err);
});

// User Registration
router.post("/register", async (req, res) => {
    try {
        const { username, password, role = "user" } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const collection = await db.collection("users");

        await collection.insertOne({ username, password: hashedPassword, role });
        res.status(201).send("User registered successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error registering user");
    }
});

// User Login
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const collection = await db.collection("users");

        const user = await collection.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).send("Invalid credentials");
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error logging in");
    }
});

export default router;
