import React, { useState } from 'react'
import Header from '../components/common/Header'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import InputComponent from '../components/common/input'
import FileInput from '../components/common/input/FileInput'
import Button from '../components/common/Button'
import { toast } from 'react-toastify'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { auth, db, storage } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'

export default function CreateAnEpisodePage() {
  
  const {id} = useParams()
  const[title,setTitle]= useState("")
  const[desc,setDesc] = useState("")
  const[audioFile,setAudioFile] = useState("")
  const[loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
const audioFileHandle = (file)=>{
setAudioFile(file)
}
  
const handleSubmit = async()=>{
setLoading(true)
    if(audioFile&&desc&&title&&id){
try{
const audioRef = ref(
    storage,
    `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
);
await uploadBytes(audioRef,audioFile)
const audioURL = await getDownloadURL(audioRef)
const episodeData = {
  title:title,
  description:desc,
  audioFile:audioURL  
}

await addDoc(collection(db,"podcast",id,"episodes"),
  episodeData 
)


toast.success("Episode created Successfully")
navigate(`/podcast/${id}`);
setTitle("")
setDesc("")
setAudioFile("")
setLoading(false)
}


catch(e){
    console.log(e)
    setLoading(false)
    toast.error(e.message)
}
}
else{
setLoading(false)
    toast.error("All files should be there")
}
}
 
 
    return (
    <div>
        <Header/>
        <div className='input-wrapper'>
        <h1>Create An Episodes</h1>
        <InputComponent 
    state={title}
    setState={setTitle}
    placeholder={"Title"}
    type={"text"}  
    reqired={true}   
    />  
    <InputComponent  
    state={desc}   
    setState={setDesc}  
    placeholder={"Description"}  
    type={"text"}  
    reqired={true}   
    />   
     <FileInput accept={"audio/*"} id={"audio-file-input"}
     fileHandleFn={audioFileHandle}
     text={"audio file uploded"}
    /> 
     <Button text={loading?"Loading..":"Create Podcast"}
     disabled={loading} 
     onClick={handleSubmit} />     
        
    </div>
    </div>
  )
}
