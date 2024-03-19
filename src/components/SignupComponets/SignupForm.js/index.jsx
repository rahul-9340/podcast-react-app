import React from 'react'
import { useState } from 'react'
import InputComponent from '../../common/input'
import Button from '../../common/Button'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth,db} from '../../../firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../slice.js/userSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
  
export default function SignupForm() {
  const[fullName,setFullName]= useState("")
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const[confirmPassword,setConfirmPassword] = useState("")
  const[loading,setLoading] = useState(false)
const navigate = useNavigate()
const dispatch = useDispatch()
const handleSignup = async()=>{
  setLoading(true)
  if(password == confirmPassword&&password.length>=6&&fullName&&email)
{
  try{
  const userCredential = await createUserWithEmailAndPassword(auth,email,password)
  const user = userCredential.user
  console.log(user)
  await setDoc(doc(db,"users",user.uid),{
    name:fullName,
    email:user.email,
    uid:user.uid,
  })
  dispatch(setUser(
    {
      name:fullName,
      email:user.email,
      uid:user.uid,
    }
  ))
  toast.success('welcome')
  setLoading(false)
  navigate("/profile")
}
catch(e){
  toast.error(e)
  setLoading(false)
console.log("Error",e)
}
}
else{
   if(!email||!fullName){
    toast.error(
      "fill required fields"
    )
   }

  else if(password!=confirmPassword){
    toast.error(
      "password do not match"
    )
  }
  else if(password.length<6){
    toast.error("password should we more that 6 character")
  }
  setLoading(false)
}
  } 


    return (
    <>
    <InputComponent 
    state={fullName}
    setState={setFullName}
    placeholder={"full Name"}
    type={"text"}  
    reqired={true}   
    />  
    <InputComponent  
    state={email}   
    setState={setEmail}  
    placeholder={"Email"}  
    type={"email"}  
    reqired={true}   
    />   
    <InputComponent   
    state={password}   
    setState={setPassword}  
    placeholder={"password"}   
    type={"password"}  
    reqired={true}   
    />                        
    <InputComponent                 
    state={confirmPassword}         
    setState={setConfirmPassword}      
    placeholder={"confirm Password"}   
    type={"password"}               
    reqired={true}                  
    /> 
    <Button text={loading?"Loading..":"SignUp"} disabled={loading} onClick={handleSignup} />  
    </>
  )
}




