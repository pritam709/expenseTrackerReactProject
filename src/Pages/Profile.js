import React, { useRef, useState ,useEffect} from "react";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";
const Profile = () => {
   
    const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [sent,SetSent]=useState(false);
    useEffect(()=>{

        const userDetail=async()=>{
            // const email= localStorage.getItem("email")
            const token =localStorage.getItem("token")
            fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAQMsUvpW0VDlrT8udsQOqk9uN4im3NOJA",
                {
                  method: "POST",
                  headers: {
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify({
                    idToken: token,
                  }),
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  console.log(data.users);
                  const users= data.users;
                  setName(users[0].displayName);
                          setImg(users[0].photoUrl);
                
              });
        }

        userDetail();

    },[name])
  
  const nameRef = useRef();
  const urlRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const photoUrl = urlRef.current.value;
    const token = localStorage.getItem("token");
    // const email= localStorage.getItem("email");

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
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        
      });
  };

  const verifyEmailHandler=()=>{
    const token =localStorage.getItem("token")
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAQMsUvpW0VDlrT8udsQOqk9uN4im3NOJA",{
        method:"POST",
        body:JSON.stringify({
            idToken:token,
            requestType:"VERIFY_EMAIL"
        })

    }).then(res=>res.json()).then(data=>{
        console.log(data);
    SetSent(true);
})
  }
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
          <Link to="/home">
            <button>Cancel</button>
          </Link>
        </div>

        <form className={classes.form} onSubmit={formSubmitHandler}>
          <label>
            <b>Full Name:</b>
          </label>
          <input ref={nameRef} defaultValue={name} type="text"></input>
          &nbsp; &nbsp;
          <label>
            <b>Profile Photo Url:</b>
          </label>
          <input defaultValue={img} ref={urlRef} type="text"></input>
          <br></br>
          <button type="submit">Update</button>

        </form>
        <button className={classes.btn} onClick={verifyEmailHandler} >Verify your Email</button>

         {sent && <p>Verification email sent. Check your Email</p>}

      </div>
    </>
  );
};
export default Profile;
