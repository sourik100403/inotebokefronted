import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
const URL=process.env.REACT_APP_URL;
const Signup = (props) => {
    const [credential, setCredential] = useState({ name:"", email:"",password:"",cpassword:""})
    let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password}=credential
    const response = await fetch(`${URL}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,email,password
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
       props.showAlert("Account created successfully","success");
    } else {
      props.showAlert("Invalid Details","danger");
    }
  };

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  return (
    <div className='mx-5'>
       <h2>Create an account to use inotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className=" p-2 mb-2 bg-primary text-white rounded-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Enter Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            onChange={onChange}
            name="name"
          />
        </div>
        <div className=" p-2 mb-2 bg-primary text-white rounded-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            name="email"
          />
          <div id="emailHelp" className="form-text text-white rounded-3">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className=" p-2 mb-2 bg-primary text-white">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}
            name="password"
            minLength={5}
            required
          />
        </div>
        <div className=" p-2 mb-2 bg-primary text-white rounded-3">
          <label htmlFor="cpassword" className="form-label">
            confirm password
          </label>
          <input
            type="cpassword"
            className="form-control"
            id="cpassword"
            onChange={onChange}
            name="cpassword"
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary bg-success">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
