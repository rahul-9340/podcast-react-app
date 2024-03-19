import React from 'react'
import Header from '../components/common/Header'
import CreateAPodcastForm from '../components/StartAPodcast/CreateAPodcastForm'
export default function CreateAPodcast() {
  return (
    <div>
        <Header/>
        <div className='input-wrapper'>
  <h1>create a podcast</h1>
     <CreateAPodcastForm/>
        </div>
    </div>
  )
}



