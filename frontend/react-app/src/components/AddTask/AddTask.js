import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Container } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import axios from 'axios';
import moment from 'moment';
const AddTask = ({setShowAddTask}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [endTime, setEndTime] = useState(null);
  const [image, setImage] = useState(null);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleEndTimeChange = (date) => setEndTime(date);


  const handleFormSubmit = (e) => {
    e.preventDefault();

    try {
      let profileId = localStorage.getItem('profile.id');
      profileId = JSON.parse(profileId)
      const formData = {
        name:title,
        description,
        createdOn: moment(new Date).toISOString(),
        dueDate: endTime?.toISOString(),
        image,
        createdBy:profileId
      };

      axios
        .post('http://localhost:3001/api/goals', formData)
        .then((response) => {
          console.log('Event created successfully!', response.data);
          // Handle success
        })
        .catch((error) => {
          console.error('Error creating event:', error);
          // Handle error
        }).finally(
            ()=>{
                setShowAddTask(false);
            }
        )
    } catch (error) {
      console.error('Error creating event:', error);
      // Handle error
    }
  };

  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Create Goal
          </Typography>

            <TextField
              label="Title"
              value={title}
              onChange={handleTitleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Description"
              value={description}
              onChange={handleDescriptionChange}
              fullWidth
              margin="normal"
              required
              multiline
              rows={10} 
            />

            <div style={{ marginBottom: '20px' }}>
                <div className=''>
                <div>
                   <span className='h6'>Due date </span> <DatePicker
                    selected={endTime}
                    onChange={(date) => handleEndTimeChange(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    placeholderText="Select due time"
                    className='border border-light w-100'
                    popperClassName='date-picker-popper'
                    wrapperClassName='date-picker-wrapper'
                />
                </div>
                </div>

            </div>


            <Button type="submit" variant="contained" color="primary" onClick={handleFormSubmit}>
              Create goal
            </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddTask;
