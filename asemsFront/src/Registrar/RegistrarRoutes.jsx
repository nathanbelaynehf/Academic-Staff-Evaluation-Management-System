import Course from "./Course";
import RegHome from "./RegHome";
import Register from "./Register";

const RegistrarRoutes=[
    {path:'/reg',element:<RegHome/>},
    {path:'/reg/register',element:<Register/>},
    {path:'/reg/course',element:<Course/>},
]
export default RegistrarRoutes;