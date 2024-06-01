import React, { useState } from 'react'
import './login.css'
// import ApiService from './apiService'
import axios from 'axios'
import { Link } from 'react-router-dom'


function Login() {
 const [email , setEmail] = useState('')
 const [password , setPassword] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = await axios.post( 'https://login-api-iota.vercel.app/api/auth/login' , {email , password});
      // const credentials = await ApiService.login ;
      console.log('logged in with :',credentials);

    }catch (error) {  
      console.error("login failed : " , error.message);
    }

    console.log("email :" ,email);
    console.log("password :",password);
  }

  return (
    <div className='container'>
      <div className='login-page'>
        <form className='form-group' onSubmit={handleSubmit}>
          <p className='paragraph'>Login here !!!</p>
            <input className='input-field' type='text' placeholder='email' id='' name='email' value={email} onChange={(e) =>setEmail(e.target.value)}></input><br></br>
            <input type='password' className='input-field' placeholder='password' id='' name='password' value={password} onChange={(e) => setPassword(e.target.value)}></input><br></br>
            <button className='btn' type='submit'>Login</button>
          <p className='paragraph'>create your account here...  <Link className='anchor' to='/signup'>Signup</Link></p>
        </form>
      </div>
    </div>  
  )
}

export default Login