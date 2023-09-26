import React from "react";
import { useForm } from "react-hook-form";
import StartFirebase from "../Conponents/firebaseConfig.js";
import { ref, onValue, getDatabase } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// https://www.youtube.com/watch?v=Vv_Oi7zPPTw

function Test() {
  const divStyle = {
    width: "50%",
  };
  let history = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  // const onSubmit = (data) => console.log(data);
  const [users, setUsers] = useState([]);

  const onSubmit = (data) => {
    const emailVal = data.email;
    const passwordVal = data.password;
    StartFirebase();
    const database = getDatabase();
    const usersRef = ref(database, "users");

    // //console.log(usersRef);
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      // console.log(data);
      const usersEntity = [];

      for (let id in data) {
        usersEntity.push(data[id]);
      }
      //console.log(usersEntity);
      const userSearchMail = usersEntity.filter((user) => {
        return user.email === emailVal;
      });

      if (userSearchMail.length === 0) {
        alert("Ce compte n'existe pas");
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        history("/login");
        //console.log(userSearchMail);
      }

      if (userSearchMail.length > 0) {
        const users = userSearchMail;
        setUsers(users[0].lastName);
        if (users[0].password === passwordVal) {
          // console.log(userSearchMail);
          alert("Bonjour " + users[0].lastName);

          window.localStorage.setItem("passKey", users[0].id);
          window.localStorage.setItem("role", users[0].role);
          window.localStorage.setItem("passName", users[0].lastName);
          history("/product");
          //console.log(users);
        } else {
          document.getElementById("password").value = "";
          alert("Mot de passe incorrect");
          history("/login");
        }
      }
    });
  };
  return (
    <div class="container" style={divStyle}>
      <h1 class="mt-4">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="row">
          <input
            id="email"
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
            aria-invalid={errors.email ? "true" : "false"}
            placeholder="email"
            class="mt-4"
          />
          {errors.email?.type === "required" && (
            <p role="alert">Adresse mail invalide</p>
          )}

          <input
            id="password"
            {...register("password", { required: true, minLength: 8 })}
            placeholder="password"
            class="mt-4"
          />
          {errors.password?.type === "minLength" && (
            <p role="alert">Ce champs doit contenir minimum 8 caractères</p>
          )}
          {errors.email?.type === "required" && (
            <p role="alert">Ce champs est obligatoire</p>
          )}
          <input type="submit" class="btn btn-info mt-4" />
        </div>
      </form>
    </div>
  );
}
export default Test;
