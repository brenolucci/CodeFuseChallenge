import { Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Landspace/HomePage";
import RegisterBook from "./pages/BookRegister/RegisterPage";
import SeeBookPage from "./pages/BookRegister/SeeBookPage";

const Routes = () => {
   return(
       <BrowserRouter>
           <Route Component = { Home }  path="/" />
           <Route Component = { RegisterBook }  path="/register" />
           <Route Component = {SeeBookPage} path="/see-book/:bookId" />
       </BrowserRouter>
   )
}

export default Routes;