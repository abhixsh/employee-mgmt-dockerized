// src/components/Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove token on logout
    navigate('/login');  // Redirect to login page
  };

  const isAuthenticated = localStorage.getItem('token');

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between">
      <div>
        <h1 className="text-2xl font-bold text-blue-600">Employee Management</h1>
      </div>
      <div className="space-x-4">
        <NavLink to="/" className="text-blue-500">Home</NavLink>
        <NavLink to="/records" className="text-blue-500">Employees</NavLink>
        <NavLink to="/about" className="text-blue-500">About Us</NavLink>

        {!isAuthenticated ? (
          <>
            <NavLink to="/login" className="text-blue-500">Login</NavLink>
            <NavLink to="/register" className="text-blue-500">Register</NavLink>
          </>
        ) : (
          <button onClick={handleLogout} className="text-blue-500">Logout</button>
        )}
      </div>
    </nav>
  );
}
