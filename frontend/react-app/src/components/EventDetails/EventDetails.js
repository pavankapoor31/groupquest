import React, { useEffect, useState } from 'react'
import ChatApp from '../ChatApp/ChatApp'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState();
    useEffect(
      ()=>{
          axios.get(
              `http://localhost:3001/api/events?filter={"where":{"id":${id}}`
          ).then(
              (res)=>{
                setEvent(res.data)
              }
          ).catch(
              (err)=>{
                  console.log(err)
              }
          )
      },[]
  )
    console.log(id,'idFromEventDeets')
  return (
    <div className='main-element'>
        
        Event Details

        <ChatApp groupId={id}/>
    </div>
  )
}

export default EventDetails