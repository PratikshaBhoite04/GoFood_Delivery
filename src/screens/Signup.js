import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

export default function Signup() {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        geolocation: ""
    });

    // Define the onChange function
    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/api/createuser", {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.geolocation
            }),
        });
        
        const json = await response.json();
        console.log(json);
        if (!json.success) {
            alert("Enter valid credentials");
        }
    };

    return (
        <div className="signup-container d-flex justify-content-center align-items-center">
            <div className="signup-card p-4 shadow-lg rounded bg-success">
                <h2 className="text-center mb-4" style={{color:"black"}}>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label" >Name</label>
                        <input type="text" className="form-control" style={{background:"white"}} name='name' value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
                        <input type="email" className="form-control" style={{background:"white"}} name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text" style={{color:"black"}}>We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" style={{background:"white"}} name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputGeolocation" className="form-label">Address</label>
                        <input type="text" className="form-control" style={{background:"white"}} name='geolocation' value={credentials.geolocation} onChange={onChange} id="exampleInputGeolocation" />
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-outline-danger px-4 py-2" style={{background: "#5ce198"}}>Sign Up</button>
                        <Link to="/login" className="btn btn-outline-danger px-4 py-2" style={{background: "#5ce198"}}>Already a User?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
