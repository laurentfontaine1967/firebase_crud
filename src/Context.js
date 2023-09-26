import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Context = ({ component: Component, ...rest }) => {
  const [user, setUser] = useState();
  let history = useNavigate();
  useEffect(() => {
    if (!window.localStorage.getItem("passName")) {
      return <Component {...rest} />;
    }
    const user = window.localStorage.getItem("passName");
    setUser(user);
    alert("Vous etes déja connectés");
    history("/product");
    // <Navigate to="/product" />;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};
export default Context;
