import React from 'react'
import "./style.css"
import Button from '../../../Button'
export default function EpisodesDetails({index,title,description,audioFile,onClick}) {
  return (
    <div style={{width:"100%"}}>
    <h1 style={{textAlign:"left",marginBottom:"0"}}>{index}. {title}</h1>
    <p className='podcast-description' style={{margin:"left"}}>{description}</p>
    <Button width={"200px"} text={"Play"} onClick={()=>onClick(audioFile)}/>
    </div>
  )
}

