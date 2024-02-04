import React, { useEffect, useState } from 'react';
import './Home.css'; // Make sure to import your CSS file

const GroupQuest = () => {
  const [profilename, setProfileName] = useState('');
  const studyImage = require('./../../assets/studying.jpeg')
  useEffect(() => {
    try {
      let name = localStorage.getItem('displayName');
      name = JSON.parse(name);
      setProfileName(name);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className='main-element'>
      <div className='group-quest-section'>
        <h2 className='text-danger mb-0 pt-2'>Welcome to GroupQuest</h2>

        {/* Information about GroupQuest */}
        <div className='row mt-4'>
          <div className='col-md-4'>
            <div className='card p-3 mb-4'>
              <h4 className='card-title'>Empower Your Study Experience</h4>
              <p className='card-text'>GroupQuest is your ultimate study companion, empowering you to create and join study events, collaborative projects, and workshops. Connect with fellow students to enhance your learning journey.</p>
            </div>

            <div className='card p-3 mb-4'>
              <h4 className='card-title'>Create Engaging Study Events</h4>
              <p className='card-text'>Host study sessions, workshops, or group projects tailored to your academic needs. Invite classmates to collaborate, share knowledge, and succeed together in your academic endeavors.</p>
            </div>

            <div className='card p-3'>
              <h4 className='card-title'>Discover New Learning Opportunities</h4>
              <p className='card-text'>Explore a world of educational possibilities by receiving invitations from other students. Join study groups, attend insightful events, and broaden your knowledge horizon by connecting with like-minded peers.</p>
            </div>
          </div>

          <div className='col-md-8'>
            <div className='card p-3 mb-4'>
              <h4 className='card-title'>Enhance Collaboration</h4>
              <p className='card-text'>GroupQuest fosters collaboration by providing a platform for seamless communication and coordination. Communicate with your study group, share resources, and achieve academic success through collective efforts.</p>
            </div>

            <img
              src={studyImage} // Replace with your image URL
              alt="GroupQuest Image"
              className='img-fluid col-md-11'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupQuest;
