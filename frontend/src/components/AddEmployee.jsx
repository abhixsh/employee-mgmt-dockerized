// src/components/AddEmployee.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
    const [form, setForm] = useState({ name: "", position: "", level: "" });
    const navigate = useNavigate();

    const updateForm = (value) => setForm({ ...form, ...value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:5050/record", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        navigate("/records");
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto shadow-lg rounded-md bg-white">
            <h3 className="text-2xl font-semibold mb-4">Add New Employee</h3>
            <label>Name</label>
            <input
                type="text"
                value={form.name}
                onChange={(e) => updateForm({ name: e.target.value })}
                className="w-full border p-2 mb-4"
                required
            />
            <label>Position</label>
            <input
                type="text"
                value={form.position}
                onChange={(e) => updateForm({ position: e.target.value })}
                className="w-full border p-2 mb-4"
                required
            />
            <label>Level</label>
            <select
                value={form.level}
                onChange={(e) => updateForm({ level: e.target.value })}
                className="w-full border p-2 mb-4"
                required
            >
                <option value="">Select level</option>
                <option value="Intern">Intern</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
            </select>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Add Employee</button>
        </form>
    );
}
