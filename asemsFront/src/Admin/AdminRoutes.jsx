import Accounts from "./Accounts";
import AdminHome from "./AdminHome";
import RegisterAdmin from "./RegisterAdmin";
import System from "./System";
import ProtectedRoute from "../ProtectedRoute"; // Import the ProtectedRoute component

const adminRoutes = [
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole="ROLE_ADMIN">
        <AdminHome />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/reg",
    element: (
      <ProtectedRoute requiredRole="ROLE_ADMIN">
        <RegisterAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/system",
    element: (
      <ProtectedRoute requiredRole="ROLE_ADMIN">
        <System />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/accounts",
    element: (
      <ProtectedRoute requiredRole="ROLE_ADMIN">
        <Accounts />
      </ProtectedRoute>
    ),
  },
];

export default adminRoutes;