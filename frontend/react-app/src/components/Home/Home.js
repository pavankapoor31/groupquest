import React, { useEffect, useState } from 'react'
import './Home.css'
const Home = () => {
  const [profilename,setProfileName] = useState("")
  useEffect(
    ()=>{
      try{
        let name = localStorage.getItem('displayName');
        name = JSON.parse(name)
        setProfileName(name);
      }
      catch (err){
        console.log(err)
      }
    },[]
  )
  return (
    <div className='main-element'>
      <div className='about-event'>
        <div className='pb-2 text-danger'> </div>
          <span className='cursive-font h1 bg-gradient-black'>Welcome {profilename}!</span>
          <div className='d-flex gap-2'>
            <div className='card p-2'>
              New Events
            </div>
            <div className='card p-2'>
              New Groups
            </div>
          </div>
      </div>
    </div>
  )
}

export default Home