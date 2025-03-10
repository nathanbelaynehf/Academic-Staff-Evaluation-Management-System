import AdminHome from "./AdminHome";
import RegisterAdmin from "./RegisterAdmin";


const adminRoutes = [
  { path: "/admin", element: <AdminHome /> },
  { path: "/admin/reg", element: <RegisterAdmin /> },
];

export default adminRoutes;
