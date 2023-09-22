// https://www.youtube.com/watch?v=g0ShSFlJa2U
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ component: Component, ...rest }) => {
  const passName = window.localStorage.getItem("passName");
  if (passName === "Laurent") {
    return <Component {...rest} />;
  } else {
    // return <Navigate to="/login" />;
    alert("Vous n'avez pas les droits");
    return <Navigate to="/login" />;
  }
};
export default PrivateRoutes;
