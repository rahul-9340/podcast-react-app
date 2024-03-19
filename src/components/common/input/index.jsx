import React from 'react'
import "./style.css"
export default function InputComponent({type,state,setState,placeholder,reqired}) {
  return (
    <input
    type={type}
    value={state}
    onChange={(e)=>setState(e.target.value)}
    placeholder={placeholder}
    required={reqired}
    className='custom-input'
    />
  )
}



