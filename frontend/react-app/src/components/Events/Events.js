import React, { useEffect, useState } from 'react'
import EventCard from '../EventCard/EventCard'
import axios from 'axios'
const Events = () => {
    const [events,setEvents] = useState([]);
    useEffect(
        ()=>{
            axios.get(
                'http://localhost:3001/api/events'
            ).then(
                (res)=>{
                    setEvents(res.data)
                }
            ).catch(
                (err)=>{
                    console.log(err)
                }
            )
        },[]
    )
  return (
    <div className='main-element'>
       <div className='d-flex'>
       {
        events?.map(
            (item)=>{
                return <EventCard event={item} />
            }
        )
      }
       </div>
    </div>
  )
}

export default Events