// DhRoutes.js
import Classes from "./Classes";
import Course from "./Course";
import DhHome from "./DhHome";
import Evaluation from "./Evaluation";
import StudResult from "./StudResult";
import ProtectedRoute from "../ProtectedRoute"; // Import the ProtectedRoute component

const DhRoutes = [
  {
    path: "/dh",
    element: (
      <ProtectedRoute requiredRole="ROLE_DH">
        <DhHome />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dh/course",
    element: (
      <ProtectedRoute requiredRole="ROLE_DH">
        <Course />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dh/class",
    element: (
      <ProtectedRoute requiredRole="ROLE_DH">
        <Classes />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dh/evaluate",
    element: (
      <ProtectedRoute requiredRole="ROLE_DH">
        <Evaluation />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dh/result",
    element: (
      <ProtectedRoute requiredRole="ROLE_DH">
        <StudResult />
      </ProtectedRoute>
    ),
  },
];

export default DhRoutes;