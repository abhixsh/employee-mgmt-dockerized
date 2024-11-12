import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import empRoutes from "./routes/emp.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes); // Separate route for authentication
app.use("/emp", empRoutes);   // Separate route for employee management

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
