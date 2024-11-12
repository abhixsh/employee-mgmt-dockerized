// src/main.jsx
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import App from "./App";
import RecordList from "./components/RecordList";
import Record from "./components/Record";
import Landing from "./components/Landing";
import AddEmployee from "./components/AddEmployee";
import AboutUs from "./components/AboutUs";
import Login from "./components/Login"; // New
import Profile from "./components/Profile"; // New
import "./index.css";

// Simple auth check function to protect routes
function ProtectedRoute({ element, requiresAdmin = false }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;
  
  const user = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
  if (requiresAdmin && user.role !== "admin") {
    return <Navigate to="/" />;
  }
  
  return element;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/records", element: <RecordList /> },
      { path: "/create", element: <ProtectedRoute element={<AddEmployee />} requiresAdmin={true} /> },
      { path: "/edit/:id", element: <Record /> },
      { path: "/about", element: <AboutUs /> },
      { path: "/login", element: <Login /> }, // New Login Route
      { path: "/profile", element: <ProtectedRoute element={<Profile />} /> }, // New Profile Route
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
