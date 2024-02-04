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
          <div className='row'>
            {events?.map((item, index) => (
              <div key={index} className="col-md-3 mb-4">
                <EventCard event={item} className="event-card" />
              </div>
            ))}
          </div>
        </div>
      );
      
      
}

export default Events