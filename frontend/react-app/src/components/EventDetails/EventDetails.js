import React, { useEffect, useState } from 'react'
import ChatApp from '../ChatApp/ChatApp'
import { useParams } from 'react-router-dom'

const EventDetails = () => {
    const { id } = useParams();
    // useEffect(
    //     ()=>{
           
    //         setGroupId(id)
    //     },[]
    // )
  return (
    <div className='main-element'>
        
        Event Details

        <ChatApp groupId={id}/>
    </div>
  )
}

export default EventDetails