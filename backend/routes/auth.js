import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbPromise from "../db/connection.js"; // Database connection

const router = express.Router();
let db;

dbPromise.then((database) => {
    db = database;
}).catch((err) => {
    console.error("Failed to connect to the database:", err);
});

// Register route - for creating users (including admin)
router.post("/register", async (req, res) => {
    const { username, password, isAdmin } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await db.collection("users").findOne({ username });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            username,
            password: hashedPassword,
            isAdmin: isAdmin || false, // Default to regular user if not specified
        };

        // Insert the new user into the database
        await db.collection("users").insertOne(newUser);
        res.status(201).send("User registered successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error registering user");
    }
});

// Login route - for user authentication
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user in the database
        const user = await db.collection("users").findOne({ username });
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Compare password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send("Invalid password");
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin }, // Payload
            process.env.JWT_SECRET, // Secret key from the .env file
            { expiresIn: '1h' } // Optional expiration time
          );
          console.log(process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error logging in");
    }
});

// Middleware to protect routes - only admin can access
export const isAdmin = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Extract the token from the "Authorization" header

    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.isAdmin) {
            return res.status(403).send("Access denied. You are not an admin.");
        }
        req.user = decoded; // Save the user info in the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error(err);
        res.status(400).send("Invalid token");
    }
};

export default router;
