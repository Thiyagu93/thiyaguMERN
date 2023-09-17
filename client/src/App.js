import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './components/login/Login';
import Register from './components/register/Register';
import Profile from './components/profile/Profile';
import { createContext, useEffect, useState } from 'react';
import { AuthorizeUser } from './helper/middleware.js';
import ReactGA from 'react-ga';

export const EmailContext = createContext(null)

function App() {

  const [regEmail, setEmail] = useState("")

  function emailAs (email) {
    localStorage.setItem("regemail", email)
    setEmail(email)
  }

  function emailCheck () {
    const email = localStorage.getItem("regemail")
    if(email !== undefined && email !== null ){
      setEmail(email);
    }else{
      setEmail("")
    }
  }

  useEffect(()=>{
    emailCheck()
  },[])

  const TrackingID = 'G-TXDFDT0LHN';
  ReactGA.initialize(TrackingID)

  return (
    <BrowserRouter>
    <EmailContext.Provider value={{regEmail, emailAs}}>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile'  element={<AuthorizeUser><Profile /></AuthorizeUser> }/>
      </Routes>
    </EmailContext.Provider>
    </BrowserRouter>
  );
}

export default App;
