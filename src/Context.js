import { Navigate } from "react-router-dom";

const Context = ({ component: Component, ...rest }) => {
  if (window.localStorage.getItem("passName") == null) {
    return <Component {...rest} />;
  }
  return () => {
    console.log("oui user");
    <Navigate to="/product" />;
  };
};
export default Context;
