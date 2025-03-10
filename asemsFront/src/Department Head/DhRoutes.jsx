import Classes from "./Classes";
import Course from "./Course";
import DhHome from "./DhHome";
import Evaluation from "./Evaluation";
import StudResult from "./StudResult";

const DhRoutes=[
    {path:'/dh',element:<DhHome/>},
    {path:'/dh/course',element:<Course/>},
    {path:'/dh/class',element:<Classes/>},
    {path:'/dh/evaluate',element:<Evaluation/>},
    {path:'/dh/result',element:<StudResult/>},
]
export default DhRoutes;