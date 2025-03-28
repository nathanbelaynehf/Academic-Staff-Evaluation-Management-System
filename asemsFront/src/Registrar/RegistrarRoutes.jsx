import Account from "./Account";
import Course from "./Course";
import RegHome from "./RegHome";
import Register from "./Register";
import ProtectedRoute from "../ProtectedRoute"; // Import the ProtectedRoute component

const RegistrarRoutes = [
  {
    path: "/reg",
    element: (
       <ProtectedRoute requiredRole="ROLE_REG">
        <RegHome />
       </ProtectedRoute>
    ),
  },
  {
    path: "/reg/register",
    element: (
      <ProtectedRoute requiredRole="ROLE_REG">
        <Register />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reg/course",
    element: (
      <ProtectedRoute requiredRole="ROLE_REG">
        <Course />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reg/account",
    element: (
      <ProtectedRoute requiredRole="ROLE_REG">
        <Account />
      </ProtectedRoute>
    ),
  },
];

export default RegistrarRoutes;