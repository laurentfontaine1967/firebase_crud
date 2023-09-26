import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Conponents/Header.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./Conponents/Registration.js";
import Login from "./Conponents/Login.js";
import Product from "./Conponents/Product.js";
import ListUsers from "./Conponents/ListUsers";
import EditUser from "./Conponents/EditUser";
import PrivateRoutes from "./PrivateRoutes.js";
import Admin from "./Conponents/Admin.js";
import Context from "./Context.js";
function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/product" element={<Product />} />
          <Route path="/login" element={<Context component={Login} />} />
          <Route
            path="/register"
            element={<Context component={Registration} />}
          />
          <Route
            path="/listusers"
            element={<PrivateRoutes component={ListUsers} />}
          />
          <Route path="/admin" element={<PrivateRoutes component={Admin} />} />

          <Route path="/editusers/:id" element={<EditUser />} />
          <Route />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
