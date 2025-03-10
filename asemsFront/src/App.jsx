import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import adminRoutes from './Admin/AdminRoutes';
import AdRoutes from './Academic Dean/AdRoutes';
import DhRoutes from './Department Head/DhRoutes';
import RegistrarRoutes from './Registrar/RegistrarRoutes';
import StudentRoutes from './Student/StudentRoutes';
import HomeRoutes from './HomePage/HomeRoutes';


const routers=createBrowserRouter([
     ...HomeRoutes,
    ...AdRoutes,
    ...DhRoutes,
    ...RegistrarRoutes,
    ...StudentRoutes,
    ...adminRoutes,
]);
function App() {
  return (
    <RouterProvider 
    router={routers}
    />
  )
}

export default App
