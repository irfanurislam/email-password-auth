import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "../../firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";



const RegisterBS = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [user,setUser] = useState(null)

  

 const [error,setError] = useState('')
 const [success,setSucces] = useState('')



const handleSubmitGoogle =(e) =>{
  e.preventDefault();
  signInWithPopup(auth,provider)
  .then(result =>{
       const loggin = result.user
       console.log(loggin)
       setUser(loggin)
       setSucces('succesfully added')
       
       setError('')
       e.target.reset()
  }).catch(error =>{
    setError(error.message)
  })
}




 const  handleemailchange =(event) =>{
     console.log(event.target.value)
 }
const handlesignout=()=>{
  signOut(auth)
  .then(result =>{
    setUser(null)
  }).catch(error =>{
    console.log(error)
  })
}
const handleSignIn = () => {
  signInWithPopup(auth, provider)
  .then( result => {
      const loggedUser = result.user;
      console.log(loggedUser);
      setUser(loggedUser);
  })
  .catch(error => {
      console.log(error)
  })
}



 //hide and how 
 const [passwordType, setPasswordType] = useState("password");
 const [passwordInput, setPasswordInput] = useState("");
 const handlePasswordChange =(event)=>{
  console.log(event.target.value)
  // setPasswordInput(event.target.value);
}
const togglePassword =()=>{
  if(passwordType === "password")
  {
   setPasswordType("text")
   return;
  }
  setPasswordType("password")
}

  return (
    <div className="w-50 mx-auto">
      <form onSubmit={handleSubmitGoogle}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
          onChange={handleemailchange}
            type="email"
            name='email'
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          
        </div>

        <InputGroup className="mb-3">
        <Button onClick={togglePassword} variant="outline-secondary" id="button-addon1">
        { passwordType==="password"? 'show' :'hide' }
        </Button>
        <Form.Control
        onBlur={handlePasswordChange}
          aria-label="Example text with button addon"
          aria-describedby="basic-addon1"
          type={passwordType}
          name='password'
            className="form-control"
            id="password"
        />
      </InputGroup>
        {/* <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div> */}
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
       
         {
          user ? <button onClick={handleSignIn} type="submit" className="btn btn-primary">
          Submit
        </button> :
         <button onClick={handlesignout}  type="submit" className="btn btn-warning">
          Signout
        </button>
         }



        <p className="text-danger">{error}</p>
        <p className="text-success">{success}</p>
      </form>
     {
      user && <div>
        <p>User: {user.displayName}</p>
        <p>email: {user.email}</p>
      </div>
     }
      
    </div>
  );
};

export default RegisterBS;
