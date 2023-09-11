import React from "react";
import { useParams } from "react-router-dom";
import StartFirebase from "../Conponents/firebaseConfig.js";
import { getDatabase } from "firebase/database";
import { set, get, child, ref } from "firebase/database";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { onValue } from "firebase/database";
import { ref as sRef } from "firebase/storage";
//https://www.youtube.com/watch?v=Ph6r58iuAWw&ab_channel=HACodes

function EditUser() {
  StartFirebase();
  // let history = useNavigate();
  const database = getDatabase();
  const { id } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const database = getDatabase();
    //console.log(database);
    const usersRef = ref(database, `users/${id}`);
    onValue(usersRef, (snapshot) => {
      const users = snapshot.val();
      // console.log(data);
      // const users = [];
      // for (let id in data) {
      //   users.push(data[id]);
      // }
      setUsers(users);
      console.log(users);
    });
  }, []);

  const divStyle = {
    width: "50%",
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  let history = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    const uuid = { id };
    set(ref(database, `users/${uuid}`), {
      id: uuid,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });
    history("/listusers");
  };

  return (
    <div class="container" style={divStyle}>
      <h1 class="mt-4">Edit user</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="row">
          <input
            value={users.firstName}
            {...register("firstName", {
              required: true,
              maxLength: 20,
              minLength: 2,
            })}
            placeholder="first name"
            class="mt-4"
            aria-invalid={errors.firstName ? "true" : "false"}
          />
          {errors.firstName?.type === "required" && (
            <p role="alert">ce champs est obligatoire</p>
          )}
          {errors.firstName?.type === "minLength" && (
            <p role="alert">minimun 2 caractères</p>
          )}
          <input
            value={users.lastName}
            {...register("lastName", {
              required: true,
              maxLength: 20,
              minLength: 2,
            })}
            placeholder="last name"
            class="mt-4"
            aria-invalid={errors.lastName ? "true" : "false"}
          />
          {errors.lastName?.type === "required" && (
            <p role="alert">ce champs est obligatoire</p>
          )}
          {errors.lastName?.type === "minLength" && (
            <p role="alert">minimun 2 caractères</p>
          )}
          <input
            value={users.email}
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
            value={users.password}
            {...register("password", { required: true, minLength: 8 })}
            placeholder="password"
            class="mt-4"
          />
          {errors.password?.type === "minLength" && (
            <p role="alert">Ce champs doit contenir minimum 8 caractères</p>
          )}
          {errors.password?.type === "required" && (
            <p role="alert">Ce champs est obligatoire</p>
          )}
          <input type="submit" class="btn btn-info mt-4" />
        </div>
      </form>
    </div>
  );
}
export default EditUser;
