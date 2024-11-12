// src/components/Landing.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        async function fetchEmployees() {
            const response = await fetch("http://localhost:5050/record/");
            if (response.ok) {
                const data = await response.json();
                setEmployees(data);
            }
        }
        fetchEmployees();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="p-6 text-center"
        >
            <h2 className="text-3xl font-bold mb-4">Welcome to Employee Management</h2>
            <p className="text-lg text-gray-600 mb-6">View and manage employees efficiently.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {employees.slice(0, 6).map((employee) => (
                    <motion.div
                        key={employee._id}
                        className="p-4 border rounded-lg shadow-lg hover:bg-slate-100"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 className="text-xl font-semibold">{employee.name}</h3>
                        <p>Position: {employee.position}</p>
                        <p>Level: {employee.level}</p>
                        <Link to={`/edit/${employee._id}`} className="text-blue-500">Edit</Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
