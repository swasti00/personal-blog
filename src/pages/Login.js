import React, { useRef, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login({ setIsAuth }) {
    const [error, setError] = useState('');
    let navigate = useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const SignIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then(result => {
            localStorage.setItem("isAuth",true);
            setIsAuth(true);
            navigate("/");
        }).catch(err => {
            setError("Invalid Email or Password.")
            console.log(err)
        })
    }
    return (
        <div className="loginPage">
        <div className="login">
            <form>
                <h1>Sign In</h1>
                <div className="row">
                  <div className="col-25">
                    <label className="label">Username:</label>
                  </div>
                  <div className="col-75">
                    <input id="input" placeholder="Username.." required ref={emailRef}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-25">
                    <label className="label">Password:</label>
                  </div>
                  <div className="col-75">
                    <input id="input" type="password" placeholder="Password..." required ref={passwordRef}
                    />
                  </div>
                </div>
                {error && <div className="error">{ error }</div>}
                <button className="submit" onClick={SignIn}>Sign In</button>
            </form>
        </div>
        </div>
    );
}

export default Login;