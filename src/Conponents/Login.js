import React from "react";
import { useForm } from "react-hook-form";

function Login() {
  const divStyle = {
    width: "50%",
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div class="container" style={divStyle}>
      <h1 class="mt-4">Login</h1>

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
export default Login;
