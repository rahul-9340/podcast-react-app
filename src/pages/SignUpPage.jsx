import React from 'react'
import { useState } from 'react'
import LoginForm from '../components/SignupComponets/LoginForm/index.jsx'
import Button from '../components/common/Button/index.jsx'
import SignupForm from '../components/SignupComponets/SignupForm.js/index.jsx'
import InputComponent from '../components/common/input/index.jsx'
import Header from '../components/common/Header/index.jsx'
export default function SignUp() {
  const[flag,setFlag] = useState(false)

  return(
    <div>
  <Header/>
  <div className='input-wrapper'>
 {!flag?<h1>SignUp</h1>:<h1>Login</h1>}
    {!flag?<SignupForm/>:<LoginForm/>}
{ !flag ? <p style={{cursor:'pointer'}} onClick={()=>setFlag(!flag)}>Already have an Account? click here to Login.</p>:
<p style={{cursor:'pointer'}} onClick={()=>setFlag(!flag)}>Dont have an account? click here to signup.</p>}</div>
   </div>
  )
}



