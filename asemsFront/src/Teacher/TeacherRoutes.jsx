import TeacherHome from "./TeacherHome";
import EvalResult from "./EvalResult";
import Report from "./Report";
import ProtectedRoute from "../ProtectedRoute"; // Import the ProtectedRoute component

const TeacherRoutes = [
  {
    path: "/teach",
    element: (
      <ProtectedRoute requiredRole="ROLE_TEACHER">
        <TeacherHome />
      </ProtectedRoute>
    ),
  },
  {
    path: "/teach/result",
    element: (
      <ProtectedRoute requiredRole="ROLE_TEACHER">
        <EvalResult />
      </ProtectedRoute>
    ),
  },
  {
    path: "/teach/report",
    element: (
      <ProtectedRoute requiredRole="ROLE_TEACHER">
        <Report />
      </ProtectedRoute>
    ),
  },
];

export default TeacherRoutes;