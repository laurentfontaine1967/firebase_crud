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

function App() {
  // const { users } = useState([]);

  // const passName = window.localStorage.getItem("passName");
  // const passKey = window.localStorage.getItem("passKey");
  // if (passName && passKey) {
  //   const users = [];
  //   users.push(passName);
  //   console.log(users);

  //   function road() {
  //     return (
  //       <>
  //         <Route path="/listusers" element={<ListUsers />} />
  //         <Route path="/editusers/:id" element={<EditUser />} />
  //       </>
  //     );
  //   }

  //   function road2() {
  //     return (
  //       <>
  //         <Route path="/product" element={<Product />} />
  //         <Route path="/register" element={<Registration />} />
  //         <Route path="/login" element={<Login />} />
  //       </>
  //     );
  //   }

  //   function choice() {
  //     if (passName && passKey) {
  //       return road();
  //     } else {
  //       return road2();
  //     }
  //   }
  // }
  // console.log(users);

  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/product" element={<Product />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/listusers"
            element={<PrivateRoutes component={<ListUsers />} />}
          />
          <Route path="/editusers/:id" element={<EditUser />} />
          <Route />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
