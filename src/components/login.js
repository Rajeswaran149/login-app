import React, { useState } from 'react'
import './login.css'
// import ApiService from './apiService'
import axios from 'axios'
import { Link, Navigate , } from 'react-router-dom'



function Login() {
 const [email , setEmail] = useState('')
 const [password , setPassword] = useState('')
 const [ loggedin , setLoggedin ] = useState(false)
 const [ error , setError ] = useState({})
 const [showErrorMessage , setShowErrorMessage] = useState(false)
 



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = await axios.post( 'https://login-api-iota.vercel.app/api/auth/login' , {email , password});
      // const credentials = await ApiService.login ;
      console.log('logged in with :',credentials);

      if (credentials) {
        setLoggedin(true)
      

      } else {
        setError("Authentication failed. Please check your credentials.");
        setShowErrorMessage(true);
        setTimeout(() => {
          setShowErrorMessage(false)
        }, 3000);
      }

    }catch (error) {  
      console.error("login failed : " , error.message);
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false)
      }, 3000);
    }

    const error = {};
    if(!email.trim()) {
      error.email = 'email is required'
    }

    if(!password.trim()) {
      error.password = "Password is required"
    }
    
    if(Object.keys(error).length > 0){
      setError(error);
      setTimeout(() => {
        setError({});
      }, 3000);
      return;
    }
    // console.log("email :" , email);
    // console.log("password :", password);
  }

  if (loggedin) {
    return <Navigate to = "/home" />
  }

  return (
    <div className='container'>
      <div className='login-page'>
        <form className='form-group' onSubmit={handleSubmit}>
          <p className='paragraph'>Login here !!!</p>
            <input className='input-field' type='text' placeholder='email' id='' name='email' value={email} onChange={(e) =>setEmail(e.target.value)}></input><br></br>
            {error.email && <p className="error-message">{error.email}</p>}
            <input type='password' className='input-field' placeholder='password' id='' name='password' value={password} onChange={(e) => setPassword(e.target.value)}></input><br></br>
            {error.password && <p className="error-message">{error.password}</p>}
            <button className='btn' type='submit' >Login</button>
            {showErrorMessage && <p className='error-message'>invalid credentials</p>}
        
          <p className='paragraph'>create your account here...  <Link className='anchor' to='/signup'>Signup</Link></p>
        </form>
      </div>
    </div>  
  )
}

export default Login