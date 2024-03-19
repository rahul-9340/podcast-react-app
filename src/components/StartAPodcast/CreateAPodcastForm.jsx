import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import InputComponent from '../common/input'
import { toast } from 'react-toastify'
import Button from '../common/Button'
import FileInput from '../common/input/FileInput'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { auth, db, storage } from '../../firebase'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
export default function CreateAPodcastForm() {
    const[title,settitle]= useState("")
  const[desc,setDesc] = useState("")
  const[displayImage,setDisplayImage] = useState("")
  const[bannerImage,setBannerImage] = useState("")
  const[loading,setLoading] = useState(false)
   const navigate = useNavigate()
   const dispatch = useDispatch()
  
   const handleSubmit =async()=>{
    toast.success("handling form") 
   if(title&&desc&&bannerImage&&displayImage) {
    setLoading(true)
   try{
     const bannerImageRef = ref(storage,`podcast/${auth.currentUser.uid}/${Date.now()}`);
     await uploadBytes(bannerImageRef,bannerImage)
   const bannerImageURL = await getDownloadURL(bannerImageRef)

    const displayImageRef = ref(storage,`podcast/${auth.currentUser.uid}/${Date.now()}`)
    await uploadBytes(displayImageRef,displayImage)     
    const displayImageURL =await getDownloadURL(displayImageRef)

    console.log(displayImageURL)
    const podcastData = {
        title:title,
        description:desc,
        bannerImage:bannerImageURL,
        displayImage:displayImageURL,
        createdBy:auth.currentUser.uid
       }
const docRef = await addDoc(collection(db,"podcast"),podcastData);
settitle("")
setBannerImage(null)
setDesc("")
setDisplayImage(null)
toast.success("Podcast Created")
setLoading(false)
  }
  catch(e){
    console.log(e)
    setLoading(false)
  }
}
   else{
    setLoading(false)
    toast.error("please enter all values")
   }
 }

const displayImageHandle =(file)=>{
   setDisplayImage(file) 
}

const bannerImageHandle =(file)=>{
   setBannerImage(file) 
}
   
    return (
    <>
    <InputComponent 
    state={title}
    setState={settitle}
    placeholder={"title"}
    type={"text"}  
    reqired={true}   
    />  
    <InputComponent  
    state={desc}   
    setState={setDesc}  
    placeholder={"Description"}  
    type={"email"}  
    reqired={true}   
    /> 
    
    <FileInput accept={"image/*"} id={"display-image-input"}
    fileHandleFn={displayImageHandle}
    text={"display image uploded"}
    />
    <FileInput accept={"image/*"} id={"banner-image-input"}
    fileHandleFn={bannerImageHandle}
    text={"banner image upload"}
    />
    
    <Button text={loading?"Loading..":"Create Podcast"}
     disabled={loading} 
     onClick={handleSubmit} />  
    </>
  )
}

