import React, { useState } from 'react'
import './login.css'
// import ApiService from './apiService'
import axios from 'axios'

function Login() {
 const [username , setUsername] = useState('')
 const [password , setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = await axios.post( 'http://localhost:5000/api/auth/login' , {username , password});
      // const credentials = await ApiService.login ;
      console.log('logged in with :',credentials);
    }catch (error) {
      console.error("login failed : " , error.message);
    }

    console.log("usename :" ,username);
    console.log("password :",password);
  }

  return (
      <div className='login-page'>
        <form className='form-group' onSubmit={handleSubmit}>
          <p className='paragraph'>Login here !!!</p>
            <input className='input-field' type='text' placeholder='username' id='' name='username' value={username} onChange={(e) =>setUsername(e.target.value)}></input><br></br>
            <input type='text' className='input-field' placeholder='password' id='' name='password' value={password} onChange={(e) => setPassword(e.target.value)}></input><br></br>
            <button className='btn' type='submit'>Login</button>
          <p className='paragraph'>create your account here...  <a className='anchor' href=''>Sign up</a></p>
        </form>
      </div>
  )
}

export default Login