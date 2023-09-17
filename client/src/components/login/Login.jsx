import "./Login.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EmailContext } from "../../App.js";
import { useContext, useEffect } from "react";
import ReactGA from 'react-ga';

const Login = () => {

  const { emailAs } = useContext(EmailContext)

  const schema = yup.object().shape({
    email: yup.string().email("Please provide a valid email address").required("Email Required"),
    password: yup.string().min(4,"Password must be Min 4 characters").max(10,"Password must be Max 10 characters"),
  });

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

const onsubmit = (data) => {
  axios.post("http://localhost:8800/api/login", data).then((res) => {
  if (res.status === 200 ) {
      if(res.data.password){
      emailAs(res.data.email);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful..!");
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
      ReactGA.event({
        category: 'Button',
        action: 'Click',
        label: 'sign in'
      });
    } else {
      toast.error("Error login credential..!", res.data); 
    }
    } else {
      toast.error("Error login credential..!"); 
    }
  }).catch((error) => {
    console.error("An error occurred:", error);
    toast.error("User not found..!");
  });
};

useEffect(()=>{
  ReactGA.pageview(window.location.pathname);
},[])



  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <form onSubmit={handleSubmit((data) => {
            onsubmit(data);  
        })}>
        <div className="loginContainer">
          <h1>LogIn</h1>
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
          <button type="submit" className="loginBut">
            <p>Sign in</p>
          </button>
          <span>
            Not a Member&nbsp;
            <Link className="loginlink" to="/Register">
              Click to Register
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
