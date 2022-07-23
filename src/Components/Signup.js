import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';

const Signup = (props) => {
  const [credentials , setCredentials] = useState ({name:"", email: "" , password: "", cpassword:""});
  const navigate = useNavigate()

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const {name , email,password} = credentials ; 
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name,email,password}) 
      });
      const json = await response.json();
      console.log(json)
      if (json.success){
        //Save the auth token and redirect
        localStorage.setItem('token' , json.authtoken);
        navigate('/')
        props.showAlert('Account Created Successfully', 'success')
      }
      else {
        props.showAlert('Invalid Credentials', 'danger')
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
      <div className="formBx formTx">
        <h1>Create an Account to continue to Noteega</h1>
        <form onSubmit={handleSubmit}>
        <div className="inputBx">
          <label htmlFor="email" className="form-label">
            Enter Your Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            onChange={onChange}
            name="name"
            aria-describedby="emailHelp"
          />
          </div>
        <div className="inputBx">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={onChange}
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="inputBx">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}
            name="password"
            minLength= {5} required
          />
        </div>
        <div className="inputBx">
          <label htmlFor="password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            onChange={onChange}
            name="cpassword"
            minLength= {5} required
          />
        </div>
        <button type="submit" className="inputBx" >
          Submit
        </button>
      </form>
     </div>
    </div>
    </section>
  )
}

export default Signup
