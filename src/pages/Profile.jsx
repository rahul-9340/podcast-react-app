import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/common/Header'
import Button from '../components/common/Button'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { toast } from 'react-toastify'
import Loader from '../components/common/Loader'

export default function Profile() {
const user = useSelector((state=>state.user.user))
console.log("MY user",user)

  if(!user){
    return <Loader/>
  }

  const handleLogout = async()=>{
   await signOut(auth).then(()=>{
    toast.success("user logged out")
   })
  .catch((error)=>{
toast.error(error.message)
  })

}
  return (
    <div>
        <Header/>
        <div className='profile-div'>
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
         <div className='dp-div'><img src={user.profilePic}/></div>
         <p>{user.name}</p>
         </div>
        <p>{user.email}</p>
        <Button width={"20%"} text={"Logout"} onClick={handleLogout}/>
        </div>
    </div>
  )
}



