// src/components/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const isAuthenticated = localStorage.getItem('token');
  const isAdmin = isAuthenticated ? JSON.parse(atob(localStorage.getItem('token').split('.')[1])).isAdmin : false;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Outlet /> {/* This will render the child routes */}
    </>
  );
}
