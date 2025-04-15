import React from 'react';
import { useState,useEffect } from 'react';
import "./Signup.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';

function Signup() {
  const initialValue={username:"",email:"",number:"",password:"",confirm:"",role:""};
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
    const validationErrors = validate(formValues);
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    if(Object.keys(validationErrors).length ===0){
      setFormErrors({});

      console.log("Signup Started!!!!!");

      const data ={
        "userId": Math.floor(Math.random()*100),
        "email": formValues.email,
        "password": formValues.password,
        "username": formValues.username,
        "mobileNumber": formValues.number,
        "userRole": formValues.role
      };
      console.log("Signup Started2!!!!!");
      console.log(data);
  
      axios.post(`${API_BASE_URL}api/register`, data)
        .then(response => {
          console.log(response); // The response data from the server
          localStorage.setItem("userRole",formValues.role);
          localStorage.setItem("userName",formValues.username);
          localStorage.setItem("userId",data.userId);
          console.log(localStorage.getItem("userRole"));
          console.log("Signup success!!!");  
          navigate("/");
          
        })
        .catch(error => {
          console.error(error); // Handle any errors that occur
          //setFormErrors({password : "Invalid Email or Password"});

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
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobileRegex = /^[0-9]{10}$/;
    const passwordRegex =/[0-9a-zA-Z]{6,}/;
    if(!values.username)
    {
        errors.username="User Name is required"
    }
    if (!values.email) {
      errors.email = "Email is required";
 
    }
    else if (!emailRegex.test(values.email)) {
      errors.email = "Please enter a valid email";
 
    }
    if (!values.number) {
      errors.number = "Mobile number is required";
    }
    else if (!mobileRegex.test(values.number)) {
      errors.number = "Mobile number must be 10 digits";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    else if (!passwordRegex.test(values.password)) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!values.confirm) {
      errors.confirm = "Confirm Password is required";
    }
    else if (values.confirm!== values.password) {
      errors.confirm = "Passwords do not match";
    }
    if (!values.role) {
      errors.role = "Please select a role";
    }
    return errors;
  };
 
  return (
 
    <div className="signup-bg">
        <div className="Signup_sec">
            <div className="right">
              <div className="formback-signup" id='grad1'>
                <h2>Signup</h2>
                <form onSubmit={handleSubmit} className="login_form">
                    <label htmlFor="username">User Name<span>*</span></label>
                  <input type="text" placeholder="UserName" name='username' value={formValues.username} onChange={handleChange}/>
                  <p className='errortxt'>{formErrors.username}</p>
 
                  <label htmlFor="email">Email<span>*</span></label>
                  <input type="email" placeholder="Email" name='email' value={formValues.email} onChange={handleChange}/>
                  <p className='errortxt'>{formErrors.email}</p>
 
                  <label htmlFor="number">Mobile Number<span>*</span></label>
                  <input type="number" placeholder="Mobile" name='number' value={formValues.number} onChange={handleChange}/>
                  <p className='errortxt'>{formErrors.number}</p>
 
                  <label htmlFor="password">Password<span>*</span></label>
                  <input type="password" placeholder="Password" name='password' value={formValues.password} onChange={handleChange}/>
                  <p className='errortxt'>{formErrors.password}</p>
                 
                  <label htmlFor="confirm">Confirm Password<span>*</span></label>
                  <input type="password" placeholder="Confirm Password" name='confirm' value={formValues.confirm} onChange={handleChange}/>
                  <p className='errortxt'>{formErrors.confirm}</p>
 
                  <label htmlFor="role">Role<span>*</span></label>
                  <select name="role" id="role" value={formValues.role} onChange={handleChange}>
                    <option value="">Select Role</option>
                    <option value="BookReader">BookReader</option>
                    <option value="BookRecommender">BookRecommender</option>

                  </select>
                  <p className='errortxt'>{formErrors.role}</p>
 
                  <div className="btncover">
                      <button type="submit">Submit</button>
                  </div>
                <span>Already have an Account? <a href='/'>Login</a></span>
                </form>
              </div>
            </div>
        </div>
    </div>
  )
}
 
export default Signup
 
