import React from "react";
import { useForm } from "react-hook-form";
import StartFirebase from "../Conponents/firebaseConfig.js";
import { ref, onValue, getDatabase } from "firebase/database";
import { useNavigate } from "react-router-dom";

// https://www.youtube.com/watch?v=Vv_Oi7zPPTw

function Test() {
  const divStyle = {
    width: "50%",
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  // const onSubmit = (data) => console.log(data);

  let history = useNavigate();

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

      const userSearchMail = usersEntity.filter((user) => {
        return user.email === emailVal;
      });
      const userSearchPassword = usersEntity.filter((user) => {
        return user.password === passwordVal;
      });

      if (userSearchMail.length === 0) {
        alert("Ce compte n'existe pas");
        history("/login");
        //console.log(userSearchMail);
      }
      if (userSearchPassword.length === 0) {
        alert("Mot de passe incorrect");
        history("/login");
      } else if (userSearchMail && userSearchPassword) {
        // console.log(userSearchMail);
        alert("Vous etes identifiés");
        const users = userSearchMail;
        //console.log(users);

        window.localStorage.setItem("passKey", users[0].id);
        window.localStorage.setItem("role", users[0].role);
        window.localStorage.setItem("passName", users[0].lastName);
        history("/product");
      }
    });
  };
  return (
    <div class="container" style={divStyle}>
      <h1 class="mt-4">Login-test</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="row">
          <input
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
