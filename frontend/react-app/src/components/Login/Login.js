// src/components/Login.js
import { useState } from "react";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase";
import { auth } from "../../firebase";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        axios.get(
          `http://localhost:3001/api/users?filter={"where":{"email":"${user.email}"}}`
        ).then(
          (res)=>{
            try{
              localStorage.setItem('profile.id',JSON.stringify(res.data[0].id))
            }
            catch (err){
              console.log(err)
            }
          }
        )
       
        localStorage.setItem('profile.email',JSON.stringify(user.email))
        localStorage.setItem('stsTokenManager',JSON.stringify(user.stsTokenManager))
        localStorage.setItem('displayName',JSON.stringify(user.displayName))
        toast.success('Login successful.', { toastId: 'success', icon: false });
        navigate('/home')
        // ...
      })
      .catch((error) => {
        toast.error('Login failed '+error, { toastId: 'failure', icon: true });
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert("Login Failed")
      });
      // User has been logged in successfully
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <div className=" content-wrapper d-flex justify-center align-center">
      <div className="Auth-form-container mw-400 card p-4">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 w-100 mt-3">
              <button type="button" className="btn btn-primary" onClick={handleLogin}>
                Sign in
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              New here? <a href="#" onClick={()=>{navigate('/signup')}}>Sign up</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
