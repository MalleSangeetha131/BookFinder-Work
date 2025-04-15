import React from 'react';
import { useState,useEffect } from 'react';
import "./Login.css";
import axios from 'axios';
import API_BASE_URL from '../apiConfig'
import { useNavigate } from 'react-router-dom';


function Login() {
 
  const initialValue={email:"", password:""};
  const [formValues,setFormValues]=useState(initialValue);
  const [formErrors,setFormErrors]=useState({});
  const [isSubmit,setIsSubmit]=useState(false);
  const navigate = useNavigate();
  
  
 
  const handleChange=(e)=>
  {
    const{name,value}=e.target;
    setFormValues({...formValues,[name]:value});
  };
 
  const handleSubmit=(e)=>
  {
    e.preventDefault();
    const validationErrors = validate(formValues);
    setFormErrors(validationErrors);
    setIsSubmit(true);
    if(Object.keys(validationErrors).length ===0){
      setFormErrors({});

      console.log("Login Started!!!!!");

      const data = {
        email: formValues.email,
        password: formValues.password
      };
     
       
      axios.post(`${API_BASE_URL}api/login`, data)
        .then(response => {
          console.log(response.data); // The response data from the server
          localStorage.setItem("isAuthenticated" , "true");
          localStorage.setItem("token",response.data.user);
          console.log("Login success!!!");  
          navigate("/Home");
          
        })
        .catch(error => {
          console.error(error); // Handle any errors that occur
          setFormErrors({password : "Invalid Email or Password"});

        });
      

    }
    
  }
 
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
 
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required";
    }
    else if (!regex.test(values.email)) {
      errors.email = "Invalid Email or Password";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };
 
  return (
    <div className="bg">
        <div className="login_sec">
            <div className="left" id="grad2">
                <h1>BookFinder</h1>
                <p>An app to discover, explore, and recommend books tailored to your reading preferences</p>
            </div>
            <div className="right" id="grad">
              <div className="formback">
                <h1>Login</h1>
                <form onSubmit={handleSubmit} className="login_form">
                  <input type="email" placeholder="Email" name='email' value={formValues.email} onChange={handleChange}/>
                  <p className='errortxt'>{formErrors.email}</p>
                  <input type="password" placeholder="Password" name='password' value={formValues.password} onChange={handleChange}/>
                  <p className='errortxt'>{formErrors.password}</p>
                  <div className="btncover">
                      <button type="submit">Login</button>
                  </div>
                    <span>Don't have an account? <a href='/Signup'>Signup</a></span>
                    
                </form>
              </div>
            </div>
        </div>
    </div>
  )
}
 
export default Login;