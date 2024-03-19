import React from 'react'
import "./style.css"
export default function Button({text,onClick,disabled,width}) {
  return (
    <div style={{width:width}} onClick={onClick} className='custom-btn' disabled={disabled}>{text}</div>
  )
}






