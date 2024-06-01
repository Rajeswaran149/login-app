import React, { useState } from 'react'
import './signup.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Signup() {

  const [ username , setUsername ] = useState('');
  const [ email , setEmail ] = useState('');
  const [ password , setPassword ] = useState('');

  const handleSubmit = (async (e) => {
    e.preventDefault()
    try {
     const credentials = await axios.post('https://login-api-iota.vercel.app/api/auth/signup' , { username ,email , password });
     console.log('credential :' , credentials);
    } catch (error){
      console.error('signup failed :' , error.message )
    }
    console.log( 'username :' , username );
    console.log( 'email :' , email );
    console.log( 'password :' , password );
  })

  return (
    <div className='container'>
      <div className='signup-page'>
          <form className='form-group' onSubmit={handleSubmit} >
              <p className='paragraph'>Signup here..!!!</p>
              <input className='input-field' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}/><br />
              <input className='input-field' type='text' placeholder='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)}  /><br />
              <input className='input-field' type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} /> <br />  
              <button className='btn' type='submit'>Submit</button>
              <p className='paragraph'>Login your account here.. <Link className='anchor' to='/'>Login</Link></p>
          </form>
      </div>
    </div>
  )
}
