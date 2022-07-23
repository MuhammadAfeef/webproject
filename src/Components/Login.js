import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';


const Login = (props) => {
    const [credentials , setCredentials] = useState ({email: "" , password: ""});
    let navigate = useNavigate()

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:credentials.email ,password:credentials.password}) 
          });
          const json = await response.json();
          console.log(json)
          if (json.success){
            //Save the auth token and redirect
            localStorage.setItem('token' , json.authtoken);
            navigate('/')
            props.showAlert('Logged in Successfully', 'success')
          }
          else {
            props.showAlert('Invalid Details', 'danger')
            
          }
        }
 const onChange = (e) =>{
            setCredentials({...credentials ,[e.target.name]:e.target.value })
        }
  return (
    <section>
      <div className="imgBx">
        <img src="https://wallpaper.dog/large/856177.jpg" alt="background" />
      </div>
      <div className=" contentBx ">
        <div className="formBx">
        <h1>Login </h1>
      <form onSubmit={handleSubmit}>
        <div className="inputBx">
          <label htmlFor="Email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={onChange}
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="inputBx">
          <label htmlFor="Password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}
            name="password"
            value={credentials.password}
          />
        </div>
        <button type="submit" className="inputBx">Sign in</button>
        <div className="inputBx">
          <p>Don't have an account? <Link style={{color:"#133978"}} to ="/signup"> Sign up </Link></p>
        </div>
      </form>
      </div>
    </div>
    </section>
  );
};

export default Login;
