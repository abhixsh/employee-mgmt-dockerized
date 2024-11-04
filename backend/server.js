const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Employee schema and model
const employeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  department: String,
});

const Employee = mongoose.model('Employee', employeeSchema);

// Routes
app.get('/employees', async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

app.post('/employees', async (req, res) => {
  const newEmployee = new Employee(req.body);
  await newEmployee.save();
  res.status(201).json(newEmployee);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
