import React, { useRef } from "react";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";
const Profile = () => {
  const nameRef = useRef();
  const urlRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const photoUrl = urlRef.current.value;
    const token = localStorage.getItem("token");

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAQMsUvpW0VDlrT8udsQOqk9uN4im3NOJA",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: token,
          displayName: name,
          photoUrl: photoUrl,
          returnSecureToken: true,
        }),
      }
    ).then((res) => res.json()).then(data=>console.log(data));
  };
  return (
    <>
      <div className={classes.header}>
        <span>
          <i>Winners never quite,Quitters never wins</i>
        </span>{" "}
        <span>
          Your profile is 64% complete. Complete Profile has higher Chances of
          landing a job <Link to="/">Complete now</Link>
        </span>
      </div>
      <hr></hr>

      <div className={classes.outer}>
        <div className={classes.contact}>
          <h2>Contact Detail</h2>
          <Link to="/home"><button>Cancel</button></Link>
        </div>

        <form className={classes.form} onSubmit={formSubmitHandler}>
          <label>
            <b>Full Name:</b>
          </label>
          <input ref={nameRef} type="text"></input>
          &nbsp; &nbsp;
          <label>
            <b>Profile Photo Url:</b>
          </label>
          <input ref={urlRef} type="text"></input>
          <br></br>
          <button type="submit">Update</button>
        </form>
      </div>
    </>
  );
};
export default Profile;