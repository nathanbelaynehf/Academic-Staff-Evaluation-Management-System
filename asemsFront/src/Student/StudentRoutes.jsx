import Eval from "./Eval";
import Instrctors from "./Instrctors";
import StudentHome from "./StudentHome";

const StudentRoutes=[
    {path:'/stud',element:<StudentHome/>},
  {path:'/stud/evalfake',element:<Eval/>}, 
  {path:'/stud/eval',element:<Instrctors/>}, 
]
export default StudentRoutes;