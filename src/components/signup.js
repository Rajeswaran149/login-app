import React, { useState } from 'react'
import './signup.css'
import axios from 'axios';
import { Link} from 'react-router-dom';

export default function Signup() {

  const [ username , setUsername ] = useState('');
  const [ email , setEmail ] = useState('');
  const [ password , setPassword ] = useState('');
  const [ signup , setSignupin ] = useState(false);
  const [ error , setError ] = useState('')
  const [ showSignupErrorMessage , setShowSignupErrorMessage ] = useState(false)
  const [ showRegisteredMessage , setShowRegisteredMessage ] = useState(false)

  const handleSubmit = (async (e) => {
    e.preventDefault()

    const error = {};
    if(!username){
      error.username = 'Username is required '
    }
    if(!email || email === "example@gmail.com"){
      error.email = ' Email id is required '
    }

    if(!password){
      error.password = 'Password is required'  
      }

    if(Object.keys(error).length > 0){
      setError(error)
      setTimeout(() => {
        setError({})
      }, 3000);
    }

    try {
     const credentials = await axios.post('https://login-api-iota.vercel.app/api/auth/signup' , { username ,email , password });
     console.log('credential :' , credentials);
     
     if (credentials) {
      setSignupin(true)
      setShowRegisteredMessage(true)
      setTimeout(() => {
        setShowRegisteredMessage(false)
      }, 3000);
     } else {
      setError("check your credentials")
      setShowSignupErrorMessage(true);
      setTimeout(() => {
        setShowSignupErrorMessage(false);
      }, 3000);
     }

    } catch (error){
      console.error('signup failed :' , error.message )
      setError("email id is already used ")
      setShowSignupErrorMessage(true);
      setTimeout(() => {
        setShowSignupErrorMessage(false);
      }, 3000);
      
    }
    // console.log( 'username :' , username );
    // console.log( 'email :' , email );
    // console.log( 'password :' , password );
    
   
    setUsername('');
    setEmail('');
    setPassword('')
  })

  // if(signup) {
  //   return <Navigate to = "/" />
  // }
 

  return (
    <div className='container'>
      <div className='signup-page'>
          <form className='form-group' onSubmit={handleSubmit} >
              <p className='paragraph'>Signup here..!!!</p>
              <input className='input-field' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}/><br />
              {error.username && <p className='error-message'>{error.username}</p>}
              <input className='input-field' type='text' placeholder='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)}  /><br />
              {error.email && <p className='error-message'>{error.email}</p>}
              <input className='input-field' type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} /> <br />  
              {error.password && <p className='error-message'>{error.password}</p>}
              <button className='btn' type='submit'>Submit</button>
              { showRegisteredMessage && <p className='succes-message'>Registered succesful</p>}
              { showSignupErrorMessage && <p className='error-message'>check your credentials </p> }
              <p className='paragraph'>Login your account here.. <Link className='anchor' to='/'>Login</Link></p>
          </form>
      </div>
    </div>
  )
}
