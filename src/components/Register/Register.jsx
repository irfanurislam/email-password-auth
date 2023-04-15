import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faIcons,faSlash } from '@fortawesome/free-solid-svg-icons'
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from "../../firebase/firebase.config";
import { Link } from "react-router-dom";

 const auth = getAuth(app)
const Register = () => {
  const [error,setError] = useState('')
  const [email,setEmail] = useState('');
const [success,setSuccess] = useState('')


const handleSubmit = (event) =>{
  event.preventDefault()
  setSuccess('')
  const email = event.target.email.value;
  const password = event.target.password.value;
  const name = event.target.name.value
  console.log(name,email,password)
//validated

if(!/(?=.*[A-Z])/.test(password)){
setError('please add at least one upercase');
return
}
else if(!/(?=.*[0-9])/.test(password)){
  setError('please add at least two number')
 return
}
else if (password.length < 6){
  setError('at least 7 charatcter')
  return
}


  // form firebase
  createUserWithEmailAndPassword(auth,email,password)
  .then(result =>{
    const loggedUser = result.user;
    console.log(loggedUser)
    setError('')
    event.target.reset()
    setSuccess('user successfully created')
    sendvarificationemail(result.user)
    updateUserData(result.user,name)


  }).catch(error =>{
     console.error(error.message)
     setError(error.message)
  })
   
};

const sendvarificationemail = (user) =>{
     sendEmailVerification(user)
     .then(result =>{
      console.log(result);
      alert('varify your email')
     })
}

// update name
const updateUserData = (user,name) =>{
       updateProfile(user,{
        displayName: name
       }).then(() =>{
        console.log('user name updated')
       }).catch(error =>{
        console.log(error)
       })
}


// password type

const [passwordType, setPasswordType] = useState("password");


  const handleEmailChange = (event) =>{
    console.log(event.target.value)
    setEmail(event.target.value)
  }
  const handlePasswordBlur = (event) =>{
    console.log(event.target.value)
    
  }

  const togglePassword =()=>{
    if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  }





  return (
    <div className="w-50 mx-auto">
      <h2>please Register</h2>
      <form onSubmit={handleSubmit}>
        <input className="w-50 mb-4" type="twxt" name="name" id="name" required  placeholder="your name" />
        <br />
        <input onChange={handleEmailChange} className="w-50 mb-4" type="email" name="email" id="email" required  placeholder="your email" />
        <br />
        <input
        onBlur={handlePasswordBlur}
          type="password"
          name="password"
          className="w-50 mb-4"
          id="password"
          placeholder="your password"
          required
          
        />
        <div className="input-group-btn">
                     <button className="btn btn-outline-primary" onClick={togglePassword}>
                     { passwordType==="password"? <i className="bi bi-eye-slash"></i> :<i className="bi bi-eye"></i>
                      }
                     </button>
                    </div>
        <br />
        <p className="text-danger">{error}</p>
        <input  type="submit" value="Register" className="btn btn-primary" />
        <p className="text-success">{success}</p>
      </form>
      <p><small>ALready have an account? Please <Link to="/login">Login</Link></small></p>
    </div>
  );
};

export default Register;
