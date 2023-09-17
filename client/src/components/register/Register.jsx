import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "./Register.css";

const Register = () => {

  
  const schema = yup.object().shape({
    username: yup.string().required("Username required").typeError(),
    email: yup.string().email().required("Email required").typeError(),
    password: yup
      .string()
      .min(4, "Password must be Min 4 characters")
      .max(10, "Password must be Max 10 characters"),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password confirmation doesn't match")
      .required("Confirmpassword Required")
      .typeError(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onsubmit = (data) => {
    axios.post("https://thiyagumern.onrender.com/api/register", data).then((res) => {
    toast.success("Registed successfully!");
    setTimeout(() => {
      navigate("/");
    }, 2000);
    });
  };
  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <form
        onSubmit={handleSubmit((data) => {
          onsubmit(data);
        })}
      >
        <div className="registerContainer">
          <h1>Create Account</h1>
          <div className="input-container">
            <input
              placeholder="Username"
              type="text"
              {...register("username")}
            />
            {errors.username && (
              <p className="error-message">{errors.username.message}</p>
            )}
          </div>
          <div className="input-container">
            <input placeholder="Email" type="email" {...register("email")} />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>
          <div className="input-container">
            <input
              placeholder="Password"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>
          <div className="input-container">
            <input
              placeholder="Confirm Password"
              type="password"
              {...register("confirmpassword")}
            />
            {errors.confirmpassword && (
              <p className="error-message">{errors.confirmpassword.message}</p>
            )}
          </div>
          <button type="submit" className="registerBut">
            <p>Sign Up</p>
          </button>
          <span>
            Already Registed&nbsp;
            <Link className="loginlink" to="/">
              Click to login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
