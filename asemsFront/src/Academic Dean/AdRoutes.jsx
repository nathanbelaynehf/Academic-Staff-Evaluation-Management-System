import Adhome from "./Adhome";
import Department from "./Department";
import Teachers from "./Teachers";
import ViewResult from "./ViewResult";
import ProtectedRoute from "../ProtectedRoute"; // Import the ProtectedRoute component

const AdRoutes = [
  {
    path: "/ad",
    element: (
      <ProtectedRoute requiredRole="ROLE_AD">
        <Adhome />
      </ProtectedRoute>
    ),
  },
  {
    path: "/ad/department",
    element: (
      <ProtectedRoute requiredRole="ROLE_AD">
        <Department />
      </ProtectedRoute>
    ),
  },
  {
    path: "/ad/evaluate",
    element: (
      <ProtectedRoute requiredRole="ROLE_AD">
        <Teachers />
      </ProtectedRoute>
    ),
  },
  {
    path: "/ad/result",
    element: (
      <ProtectedRoute requiredRole="ROLE_AD">
        <ViewResult />
      </ProtectedRoute>
    ),
  },
];

export default AdRoutes;