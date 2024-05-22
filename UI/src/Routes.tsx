import { Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Landspace/HomePage";
import RegisterBook from "./pages/BookRegister/RegisterPage";

const Routes = () => {
   return(
       <BrowserRouter>
           <Route Component = { Home }  path="/" />
           <Route Component = { RegisterBook }  path="/register" />
       </BrowserRouter>
   )
}

export default Routes;