import { useState } from "react";
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../index.css'; // Import the CSS file

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
  
    const json = await response.json();
    console.log("API Response:", json);
  
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      navigate("/");
    } else {
      alert(json.errors || "Enter valid credentials");
    }
  };

  return (
    <div className="login-container bg-success">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Welcome Back!</h2>
        <div className="mb-3">
          <label htmlFor="loginEmail" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            style={{background:"white"}}
            name="email"
            value={credentials.email}
            onChange={onChange}
            id="loginEmail"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text" style={{color:"black"}}>
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="loginPassword" className="form-label" >Password</label>
          <input
            type="password"
            className="form-control"
            style={{background:"white"}}
            name="password"
            value={credentials.password}
            onChange={onChange}
            id="loginPassword"
          />
        </div>
        <button type="submit" className="btn  btn-outline-danger" style={{background: "#5ce198"}}>Login</button>
        <Link to="/createuser" className="btn  btn-outline-danger" style={{background: "#5ce198"}}>I'm a new user</Link>
      </form>
    </div>
  );
}
