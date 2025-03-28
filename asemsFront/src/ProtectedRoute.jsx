// ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { userRole } = useContext(AuthContext);
  console.log("User role in ProtectedRoute:", userRole); // Log the user role from AuthContext

  // If the user is not logged in, redirect to the homepage
  if (!userRole) {
    console.log("User is not logged in. Redirecting to homepage.");
    return <Navigate to="/" />;
  }

  // If the user's role doesn't match the required role, redirect to their dashboard
  if (userRole !== requiredRole) {
    console.log(`User role (${userRole}) does not match required role (${requiredRole}). Redirecting to dashboard.`);

    // Redirect based on the user's role
    switch (userRole) {
      case "ROLE_ADMIN":
        return <Navigate to="/admin" />;
      case "ROLE_STUDENT":
        return <Navigate to="/stud" />;
      case "ROLE_TEACHER":
        return <Navigate to="/teach" />;
      case "ROLE_REG":
        return <Navigate to="/reg" />;
      case "ROLE_AD":
        return <Navigate to="/ad" />;
      case "ROLE_DH":
        return <Navigate to="/dh" />;
      default:
        return <Navigate to="/" />; // Fallback to homepage
    }
  }

  // If the role matches, render the children (the requested component)
  return children;
};

export default ProtectedRoute;