import React, { useRef, useState } from "react";
import classes from "./ForgotPassword.module.css";
import { Link } from "react-router-dom";
const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const mailInputRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const email = mailInputRef.current.value;
    setIsLoading(true);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAQMsUvpW0VDlrT8udsQOqk9uN4im3NOJA",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: email,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setEmailSent(true);
        setIsLoading(false);
        console.log(data);
      });
  };
  return (
    <section className={classes.auth}>
      <h1>Reset Your Password</h1>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">
            Enter the Email with which you have resistered
          </label>
          <input ref={mailInputRef} type="email" id="email" required />
        </div>

        <div className={classes.actions}>
          <button>Send Link</button>

          {isLoading && <p>Loading....</p>}
          {emailSent && <p>Reset Link has been sent successfully.</p>}
          <p>
            {" "}
            Already a user?{" "}
            <Link to="/login">
              <button className={classes.toggle}> Login</button>{" "}
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};
export default ForgotPassword;
