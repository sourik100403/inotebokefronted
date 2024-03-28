import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
const URL=process.env.REACT_APP_URL;
const Login = (props) => {
    const [credential, setCredential] = useState({email:"",password:""})
    let navigate = useNavigate();
    const handleSubmit = async (e)=>{
     e.preventDefault();
        const response = await fetch(`${URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type":"application/json",
          },
          body: JSON.stringify({email:credential.email,password:credential.password}),
        });
        const json = await response.json();
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            props.showAlert("Logged in successfully","success");
            navigate("/");
        }
        else{
          props.showAlert("Invalid credentials","danger");
        }
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
      };
  return (
    <div className='mx-5'>
      <h2>Login to continue in inotebook</h2>
     <form onSubmit={handleSubmit}>
  <div className=" p-3 mb-2 bg-primary text-white rounded-5">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" value={credential.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3 p-3  bg-primary text-white rounded-5">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={credential.password} onChange={onChange} name="password" id="password"/>
  </div>
  <button type="submit" className="btn btn-primary bg-success" >Submit</button>
  <Link to={'/ForgotPassword'}>Lost Password?</Link>
</form>
    </div>
  )
}

export default Login
