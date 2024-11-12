import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    async function onSubmit(e) {
        e.preventDefault();
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        if (response.ok) navigate('/login'); // Redirect to login after registration
    }

    return (
        <form onSubmit={onSubmit}>
            {/* Form fields for name, email, password */}
            <button type="submit">Register</button>
        </form>
    );
};
export default Register;
