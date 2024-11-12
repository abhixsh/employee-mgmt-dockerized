import express from "express";
import cors from "cors";
import userRoutes from "./routes/auth.js"; 
import employeeRoutes from "./routes/emp.js"; 
import dotenv from 'dotenv';

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes); 
app.use("/emp", employeeRoutes); 

app.get("/", (req, res) => {
  res.send("Everything is fine");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
