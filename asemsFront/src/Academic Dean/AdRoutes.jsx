import Adhome from "./Adhome";
import Department from "./Department";
import Teachers from "./Teachers";
import ViewResult from "./ViewResult";

const AdRoutes=[
    {path:'/ad',element:<Adhome/>},
    {path:'/ad/department',element:<Department/>},
    {path:'/ad/evaluate',element:<Teachers/>},
    {path:'/ad/result',element:<ViewResult/>},
];
export default AdRoutes;