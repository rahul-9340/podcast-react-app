import React from 'react'
import { useState } from 'react'
import InputComponent from '../../common/input'
import Button from '../../common/Button'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../../firebase'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { setUser } from '../../../slice.js/userSlice'
import { toast } from 'react-toastify'
  export default function LoginForm() {
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const[loading,setLoading] = useState(false)
 const dispatch=useDispatch()
 const navigate = useNavigate()





const handleLogin = async()=>{
    setLoading(true)
    if(email&&password)
{
    try{
    const userCredential = await signInWithEmailAndPassword(auth,email,password)
    const user = userCredential.user

    const userDoc = await getDoc(doc(db,"users",user.uid))
    const userData = userDoc.data()
    console.log(userData)
    dispatch(setUser({
        name:userData.name,
        email:userData.email,
        uid:userData.uid,
        profile:userData.profilePic,
    }
    ))
    setLoading(false)
    toast.success("Login Successful")
    navigate("/profile")
}
catch(e){
   console.log(e)
   toast.error(e.code)
   setLoading(false)
}
}
else{
setLoading(false)
toast.error("email and password are not empty")
}
} 

    return (
    <> 
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
    
    <Button text={loading?"Loading..":"Login"} onClick={handleLogin} disabled={loading} />  
    </>
  )
}




