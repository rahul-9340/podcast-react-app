import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
export default function Header() {
const location = useLocation()
const currentPath = location.pathname
  
return (
    <div className='navbar'>
        <div className='gradient'></div>
<div className='links'>
<Link  to="/" className={currentPath == "/"? "active":""}>SignUp</Link>
<Link  to="/podcasts" className={currentPath == "/podcasts"? "active":""}>Podcast</Link>
<Link  to="/create-a-podcast" className={currentPath == "/create-a-podcast"? "active":""}>Start a Podcast</Link>
<Link  to="/profile" className={currentPath == "/profile"? "active":""}>Profile</Link>
</div>


    </div>
  )
}







