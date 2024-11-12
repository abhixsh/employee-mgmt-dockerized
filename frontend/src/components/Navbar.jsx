// src/components/Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
//import jwt_decode from "jwt-decode"; // Optional, for decoding JWT token

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      
      // Check if the user is an admin based on the token
      const decoded = jwt_decode(token);
      if (decoded && decoded.role === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/login");
  }

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-blue-600">Company Name</h1>
      </div>
      <div className="space-x-4 flex items-center">
        <NavLink to="/" className="text-blue-500">Home</NavLink>
        <NavLink to="/records" className="text-blue-500">Employees</NavLink>
        
        {isAdmin && (
          <NavLink to="/create" className="text-blue-500">Add Employee</NavLink>
        )}
        
        <NavLink to="/about" className="text-blue-500">About Us</NavLink>

        {isLoggedIn ? (
          <>
            <NavLink to="/profile" className="text-blue-500">Profile</NavLink>
            <button onClick={handleLogout} className="text-blue-500">
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login" className="text-blue-500">Login</NavLink>
        )}
      </div>
    </nav>
  );
}
