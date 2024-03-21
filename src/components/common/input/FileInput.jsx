import React, { useState } from "react";
import "./style.css"
export default function FileInput({accept,id,fileHandleFn,text}) {
  
    const[fileSelected,setFileSelected] = useState("")

  const onchange = (e)=>{
    // console.log(e.target.files)
    setFileSelected(e.target.files[0].name)
    fileHandleFn(e.target.files[0])
  }
  
    return (
    <>
      <label htmlFor={id} className={`custom-input ${!fileSelected?"label-input":"active"}`}>
       { fileSelected?` the File ${fileSelected} was selected`: text}
      </label>
      <input type="file"
     accept={accept} id={id}
      style={{display:"none"}}
      onChange={onchange}
      />
    </>
  );
}
