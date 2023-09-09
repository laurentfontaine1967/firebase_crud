import React from "react";
import { useForm } from "react-hook-form";
import { getDatabase } from "firebase/database";
import { ref, set, db } from "firebase/database";
import StartFirebase from "../Conponents/firebaseConfig.js";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";

function Registration() {
  StartFirebase();
  const database = getDatabase();
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

    // const db = getDatabase(data);
    const uuid = uid();
    set(ref(database, `users/${uuid}`), {
      id: uuid,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });
    history("/listusers");
  };

  // const newPostKey = push(child(ref(database), "users/")).key;
  // console.log(newPostKey);
  // const updates = {};
  // updates["/" + newPostKey] = data;
  // history("/listusers");
  // return update(ref(database), updates);

  return (
    <div class="container" style={divStyle}>
      <h1 class="mt-4">Register</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="row">
          <input
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
          {errors.password?.type === "required" && (
            <p role="alert">Ce champs est obligatoire</p>
          )}
          <input type="submit" class="btn btn-info mt-4" />
        </div>
      </form>
    </div>
  );
}

export default Registration;
