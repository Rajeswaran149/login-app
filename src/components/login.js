import React, { useState } from 'react'
import './login.css'

function Login() {
 const [username , setUsername] = useState('')
 const [password , setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

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