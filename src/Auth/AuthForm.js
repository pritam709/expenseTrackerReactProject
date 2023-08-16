import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
   const history= useHistory();
  const mailInputRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [matchPassword,setMatchPassword]=useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const eneterdEmail = mailInputRef.current.value;
    const eneterdPassword = passwordRef.current.value;
   if(!isLogin) {
    const reEneterdPassword = confirmPasswordRef.current.value;
    if(eneterdPassword !== reEneterdPassword){
        setMatchPassword(true);
        return;
    }}
    setMatchPassword(false);
    setIsLoading(true);
    let url;

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQMsUvpW0VDlrT8udsQOqk9uN4im3NOJA";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQMsUvpW0VDlrT8udsQOqk9uN4im3NOJA";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: eneterdEmail,
        password: eneterdPassword,
        returnSecureToken: true,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
          
        } else {
          return res.json().then((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        const token= data.idToken;
        console.log(data.idToken);
        localStorage.setItem("token",token);
        history.replace("/home")
        // console.log(data);
        window.location.reload();
    console.log("signed up successfully");
      })
      .catch((err) => {
        console.log(err.message);
        window.alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={mailInputRef} type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input ref={passwordRef} type="password" id="password" required />
        </div>
        { !isLogin && <div className={classes.control}>
          <label htmlFor="password">Confirm Password</label>
          <input
            ref={confirmPasswordRef}
            type="password"
            id="password"
            required
          />
          {matchPassword && <p>passwords did not match</p>}
        </div>}
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Loading....</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
