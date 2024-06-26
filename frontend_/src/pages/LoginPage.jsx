import gsap from "gsap";
import React, { useEffect } from "react";
import { useState } from "react";

import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const LoginPage = ({Verification}) => {
   const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const notify = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  useEffect(() => {
    gsap.to(".login-inner", {
      opacity: 1,
      duration: 0.6,
    });
  });
  const Login = async () => {
    setLoading(true);
    if (!email || !password){ setLoading(false); return notify("Enter credentials");}
    try { const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/users/login`, {
      method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
       credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    });

   
     
    if(response.ok){
      const data= await response.json()
      console.log(data)
      setLoading(false)
       Verification()
       navigate('/');
     
    }else {
      const data= await response.json()
      notify(data.message)
       setLoading(false)
   }
    } catch (error) {
      setLoading(false);
      notify("Somthing wents wrong")
      return
    }
  };

  return (
    <div className="main-login">
      <ToastContainer
        position="center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <h1>Stack</h1>
      <div className="login-inner">
        <h2 className="mt">
          <span>welcome to </span>Stack
        </h2>
        <div className="register-form">
          <div class="form">
            <input
              class="input"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
            <span class="input-border"></span>
          </div>
          <div class="form">
            <input
              class="input"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              type="text"
            />
            <span class="input-border"></span>
          </div>
        </div>
        <div className="submit-button" onClick={Login}>
          {loading ? <div className="loader"></div> : <h1>Login</h1>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
