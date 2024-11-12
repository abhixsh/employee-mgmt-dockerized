import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    async function onSubmit(e) {
        e.preventDefault();
        // Assume API to POST login details
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            navigate('/dashboard'); // Navigate to dashboard upon login
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
