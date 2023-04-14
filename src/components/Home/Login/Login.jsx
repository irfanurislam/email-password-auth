import { getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import app from "../../../firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef()

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    setError("");
    setSuccess("");
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError("at least one upper case");
      return;
    } else if (!/(?=.*[!@#$&*])/.test(password)) {
      setError("one special character");
      return;
    } else if (password.length < 6) {
      setError("password mustbe 6 character");

      return;
    }

    // form.reset('')

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedinUser = result.user;

        if(!loggedinUser.emailVerified){
            alert('email no verify')
        }
        setSuccess('User login successful.');
        setError('');
        
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  //reset pasword 
const handleResetPassword =(event) =>{
    //  console.log(emailRef.current.value)
    const email = emailRef.current.value
    if(!email){
       return alert('provide a email please and rest password')
    }
    sendPasswordResetEmail(auth,email)
    .then(()=>{
        alert('please email chech your email')
    })
    .catch(error =>{
        console.log(error)
        setError(error.message)
    })

}

  

  return (
    <div className="w-25 mx-auto">
      <h2>Please Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            ref={emailRef}
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" id="rememberMe" />
          <label className="form-check-label" htmlFor="rememberMe">
            Remember me
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
     <p><small>forget the  password <button onClick={handleResetPassword} className="btn btn-link"> reset password</button> </small></p>
      <p>
        <small>
          New to this website? Please <Link to="/register">Register</Link>
        </small>
      </p>
      <p className="text-danger">{error}</p>
      <p className="text-success">{success}</p>
    </div>
  );
};

export default Login;
