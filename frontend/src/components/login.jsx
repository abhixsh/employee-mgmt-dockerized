import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
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
            {/* Form fields for email and password */}
            <button type="submit">Login</button>
        </form>
    );
};
export default Login;
