// https://www.youtube.com/watch?v=g0ShSFlJa2U

import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ component: Component, ...rest }) => {
  const role = window.localStorage.getItem("role");
  console.log(role);
  if (role === "admin") {
    return <Component {...rest} />;
  } else {
    // return <Navigate to="/login" />;
    alert("Vous n'avez pas les droits");
    return <Navigate to="/login" />;
  }
};
export default PrivateRoutes;
