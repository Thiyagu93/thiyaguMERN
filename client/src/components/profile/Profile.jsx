import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import "./Profile.css";
import { EmailContext } from "../../App.js";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const [editEmail, setdataEmail] = useState("");
  const [userId, setUserid] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const { regEmail } = useContext(EmailContext);

  const schema = yup.object().shape({
    username: yup.string().required("Username required").typeError(),
    email: yup
      .string()
      .email("Please provide a valid email address")
      .required("Email required")
      .typeError(),
    age: yup
      .number()
      .positive()
      .integer()
      .min(18, "You must be at least 18 & above")
      .typeError("Age required"),
    dob: yup
      .string()
      .required("Date of Birth required"),
    mobile: yup
      .string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
    gender: yup.string().oneOf(["male", "female", "other"], "Invalid gender"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onsubmit = (data) => {
    axios
      .put(`https://thiyagumern.onrender.com/api/update/${userId}`, data)
      .then((res) => {
        toast.success("Profile successfully Updated!");
      });
  };

  useEffect(() => {
    if(regEmail === "" ) return;
    axios.get(`https://thiyagumern.onrender.com/api/user/${regEmail}`).then((res) => {

      setUsername(res.data.username);
      setdataEmail(res.data.email);
      setAge(res.data.age);
      setDob(res.data.dob);
      setMobile(res.data.mobile);
      setGender(res.data.gender);
      setUserid(res.data._id);
    });
  }, [regEmail]);

  const navigate = useNavigate()

  function userLogout(e){
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('regemail')
    toast.success("Logout successful..!");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }

  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
      <form
        onSubmit={handleSubmit((data) => {
          onsubmit(data);
        })}
      >
        <div className="profileContainer">
          <h1>Profile</h1>
          <span>You can update the details</span>
          <div className="profileContainer_wrapper">
            <div className="input-container_profile">
              <input
                placeholder="Username"
                type="text"
                {...register("username")}
                value={username || ""}
                onChange={(e)=>{
                  setUsername(e.target.value)
                }}
              />
              {errors.username && (
                <p className="error-message">{errors.username.message}</p>
              )}
            </div>
            <div className="input-container_profile">
              <input
                placeholder="Email"
                type="email"
                {...register("email")}
                value={editEmail || ""}
                onChange={(e)=>{
                  setdataEmail(e.target.value)
                }}
              />
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}
            </div>
            <div className="input-container_profile">
              <input
                placeholder="Age"
                type="number"
                {...register("age")}
                value={age || ""}
                onChange={(e)=>{
                  setAge(e.target.value)
                }}
              />
              {errors.age && (
                <p className="error-message">{errors.age.message}</p>
              )}
            </div>
            <div className="input-container_profile">
              <input
                placeholder="D.O.B"
                type="text"
                {...register("dob")}
                value={dob || ""}
                onChange={(e) => {
                  setDob(e.target.value)
                }}                
              />
              {errors.dob && (
                <p className="error-message">{errors.dob.message}</p>
              )}
            </div>
            <div className="input-container_profile">
              <input
                placeholder="Mobile"
                type="number"
                {...register("mobile")}
                value={mobile || ""}
                onChange={(e)=>{
                  setMobile(e.target.value)
                }}
              />
              {errors.mobile && (
                <p className="error-message">{errors.mobile.message}</p>
              )}
            </div>

            <div className="input-container_profile">
              <input
                placeholder="Gender"
                type="text"
                {...register("gender")}
                value={gender || ""}
                onChange={(e)=>{
                  setGender(e.target.value)
                }}
              />
              {errors.gender && (
                <p className="error-message">{errors.gender.message}</p>
              )}
            </div>
          </div>

          <button className="loginBut">
            <p>Update</p>
          </button>
          <span>
            Come Back later ?&nbsp;
            <button type="submit"  className="reglink" onClick={userLogout}>
              Logout
            </button>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Profile;
