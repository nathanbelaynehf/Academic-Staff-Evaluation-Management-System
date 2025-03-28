import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import adminRoutes from './Admin/AdminRoutes';
import AdRoutes from './Academic Dean/AdRoutes';
import DhRoutes from './Department Head/DhRoutes';
import RegistrarRoutes from './Registrar/RegistrarRoutes';
import StudentRoutes from './Student/StudentRoutes';
import HomeRoutes from './HomePage/HomeRoutes';
import TeacherRoutes from './Teacher/TeacherRoutes';
import { AuthProvider } from './AuthContext';


const routers=createBrowserRouter([
     ...HomeRoutes,
    ...AdRoutes,
    ...DhRoutes,
    ...RegistrarRoutes,
    ...StudentRoutes,
    ...adminRoutes,
    ...TeacherRoutes,
]);
function App() {
  return (
    <AuthProvider>
    <RouterProvider 
    router={routers}
    />
    </AuthProvider>
  )
}

export default App
