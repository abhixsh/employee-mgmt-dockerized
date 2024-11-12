// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between">
      <div>
        <h1 className="text-2xl font-bold text-blue-600">Employee Management</h1>
      </div>
      <div className="space-x-4">
        <NavLink to="/" className="text-blue-500">Home</NavLink>
        <NavLink to="/records" className="text-blue-500">Employees</NavLink>
        <NavLink to="/create" className="text-blue-500">Add Employee</NavLink>
        <NavLink to="/about" className="text-blue-500">About Us</NavLink>
      </div>
    </nav>
  );
}
