import express from "express";
import cors from "cors";
import userRoutes from "./routes/auth.js"; // Import user routes
import employeeRoutes from "./routes/emp.js"; // Import employee routes
import dotenv from 'dotenv';
dotenv.config(); // Load the .env file

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes); // User routes (login, register)
app.use("/emp", employeeRoutes); // Employee routes (admin only)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
