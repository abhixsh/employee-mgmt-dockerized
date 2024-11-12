import express from "express";
import cors from "cors";
import userRoutes from "./routes/auth.js"; 
import employeeRoutes from "./routes/emp.js"; 
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
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
   console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});

// Swagger documentation setup
const swaggerOptions = {
  definition: {
      openapi: "3.0.0",
      info: {
          title: "Employee Management API",
          version: "1.0.0",
          description: "API documentation for the Employee Management application",
      },
  },
  apis: ["./routes/emp.js", "./routes/auth.js"],  // Point to your routes file(s)
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Use Swagger UI to serve the docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));