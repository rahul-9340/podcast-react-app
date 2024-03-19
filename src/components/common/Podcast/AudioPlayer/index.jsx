import React, { useEffect } from 'react'
import "./style.css"
import {FaPlay,FaPause,FaVolumeUp,FaVolumeMute, FaVolumeOff} from "react-icons/fa"
import { useState,useRef } from 'react'
export default function AudioPlayer({audioSrc,image}) {
  const[isMute,setIsMute] = useState(false)
  const[isPlaying,setIsPlaying]= useState(false)
  const[volume,setVolume] = useState(1)
  const[duration,setDuration] = useState(0)
  const[currentTime,setCurrentTime] = useState(0)
  const audioRef = useRef()




  const handleDuration = (e)=>{
    setCurrentTime(parseFloat(e.target.value))
    audioRef.current.currentTime = parseFloat(e.target.value)
  }
  
const handleVolume = (e)=>{
setVolume(e.target.value)
audioRef.current.volume = e.target.value
} 




const handleTimeUpdate = ()=>{
  setCurrentTime(audioRef.current.currentTime)
}

const handleLoadedMetaData = ()=>{
setDuration(audioRef.current.duration)
}
const handleEnded = ()=>{
setCurrentTime(0)
setIsPlaying(false)
}

const formateTime = (time)=>{
  const minutes = Math.floor(time/60)
  const seconds = Math.floor(time%60)
  return `${minutes}:${seconds<10 ? "0":""}${seconds}`
}
  
  useEffect(()=>{
const audio = audioRef.current;
audio.addEventListener("timeupdate",handleTimeUpdate)
audio.addEventListener("loadedmetadata",handleLoadedMetaData)
audio.addEventListener("ended",handleEnded)
 
return ()=>{
audio.removeEventListener("timeupdate",handleTimeUpdate)
audio.removeEventListener("loadedmetadata",handleLoadedMetaData)
audio.removeEventListener("ended",handleEnded)
}

},[])


  useEffect(()=>{
if(isPlaying){
  audioRef.current.play()
}
else{
  audioRef.current.pause()
}
},[isPlaying])

useEffect(()=>{
if(!isMute){
  audioRef.current.volume = 1
  setVolume(1)
}
else{
  audioRef.current.volume = 0;
  setVolume(0)
}
},[isMute])



  const togglePlay = ()=>{
    if(isPlaying){
      setIsPlaying(false)
    }
    else{
      setIsPlaying(true)
    }
  }
  const toggleMute = ()=>{
    if(isMute){
      setIsMute(false)
    }
    else{
      setIsMute(true)
    }
  }
  
  return (
    <div className='custom-audio-player'>
     <img src={image} className='display-image-player'/>
  
    <audio ref={audioRef} src={audioSrc}/>
 <p className='audio-btn'  onClick={togglePlay}>{ isPlaying?<FaPause/>:<FaPlay/>}</p> 
    <div className='duration-flex'>
<p>{formateTime(currentTime)}</p>
<input type="range"
    onChange={handleDuration}
    className='duration-range'
    max={duration}
    value={currentTime}
    step={0.01}
    />
<p>{formateTime(duration-currentTime)}</p>
<p className='audio-btn'  onClick={toggleMute}>{!isMute?<FaVolumeUp/>:<FaVolumeMute/>}</p>
<input type="range"
value={volume}
step={0.01}
max={1}
min={0}
onChange={handleVolume}
className='volume-range'
    />
    </div>  
    </div>

  )
}
