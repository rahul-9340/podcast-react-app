import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../firebase'
import PodcastCard from '../components/common/Podcast/PodcastCard'
import { setPodcast } from '../slice.js/podcastSlice'
import InputComponent from '../components/common/input'
export default function PodcastPage() {
 
 const dispatch = useDispatch()
 const podcasts = useSelector((state)=>state.podcasts.podcasts)
 const[search,setSearch]= useState("")
 useEffect(()=>{
const unsubscribe = onSnapshot(
    query(collection(db,"podcast")),
    (querySnapshot)=>{
     const podcastData = []
     querySnapshot.forEach((doc)=>{
        podcastData.push({id:doc.id,...doc.data()})
     });
     dispatch(setPodcast(podcastData))
    },
    (error)=>{
console.error("error in fetching podcast",error)
    }
);
return ()=>{
    unsubscribe()
}
 },[dispatch])

var filterPodcasts = podcasts.filter((items)=>items.title.trim().toLowerCase().includes(search.toLocaleLowerCase()))

   return (
    <div>
     <Header/> 
     <div className='input-wrapper' style={{marginTop:"2rem"}}>
     <h1>Discover Podcasts</h1>
     <InputComponent  
    state={search}   
    setState={setSearch}  
    placeholder={"Search By Title"}  
    type={"email"}   
    />  
<div className='podcast-flex' style={{marginTop:"1.5rem"}}>
    {filterPodcasts.length>0?<>
    {filterPodcasts.map((item)=>{
      return  <PodcastCard
      key={item.id}
      id={item.id}
      title={item.title}
      displayImage={item.displayImage}
      />
    })}
    </>:<p>{search?"Podcast not found":"No Podcast On THe Plateform"}</p>}
     </div>
     </div>
    </div>
  )
}
