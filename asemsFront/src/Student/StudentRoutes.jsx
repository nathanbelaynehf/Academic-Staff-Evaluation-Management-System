import Eval from "./Eval";
import Instrctors from "./Instrctors";
import ReportEval from "./ReportEval";
import StudentHome from "./StudentHome";
import ProtectedRoute from "../ProtectedRoute"; // Import the ProtectedRoute component

const StudentRoutes = [
  {
    path: "/stud",
    element: (
      <ProtectedRoute requiredRole="ROLE_STUDENT">
        <StudentHome />
      </ProtectedRoute>
    ),
  },
  {
    path: "/stud/evalfake",
    element: (
      <ProtectedRoute requiredRole="ROLE_STUDENT">
        <Eval />
      </ProtectedRoute>
    ),
  },
  {
    path: "/stud/eval",
    element: (
      <ProtectedRoute requiredRole="ROLE_STUDENT">
        <Instrctors />
      </ProtectedRoute>
    ),
  },
  {
    path: "/stud/report",
    element: (
      <ProtectedRoute requiredRole="ROLE_STUDENT">
        <ReportEval />
      </ProtectedRoute>
    ),
  },
];

export default StudentRoutes;