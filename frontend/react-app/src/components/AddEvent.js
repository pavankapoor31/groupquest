// import React, { useState } from 'react';
// import { Card, CardContent, Typography, TextField, Button, Container } from '@mui/material';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
// import axios from 'axios';

// const AddEvent = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [startTime, setStartTime] = useState(null);
//   const [endTime, setEndTime] = useState(null);
//   const [image, setImage] = useState(null);

//   const handleTitleChange = (e) => setTitle(e.target.value);
//   const handleDescriptionChange = (e) => setDescription(e.target.value);
//   const handleStartTimeChange = (date) => setStartTime(date);
//   const handleEndTimeChange = (date) => setEndTime(date);

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     const readAsDataURL = () => {
//       return new Promise((resolve, reject) => {
//         reader.onloadend = () => {
//           resolve(reader.result);
//         };
//         reader.onerror = reject;
//         reader.readAsDataURL(file);
//       });
//     };

//     if (file) {
//       try {
//         const imageDataUrl = await readAsDataURL();
//         setImage(imageDataUrl);
//       } catch (error) {
//         console.error('Error reading image file:', error);
//       }
//     }
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     try {
//       let profileId = localStorage.getItem('profile.id');
//       profileId = JSON.parse(profileId)
//       const formData = {
//         title,
//         description,
//         startTime: startTime.toISOString(),
//         endTime: endTime.toISOString(),
//         image,
//         createdBy:profileId
//       };

//       axios
//         .post('http://localhost:3001/api/Events', formData)
//         .then((response) => {
//           console.log('Event created successfully!', response.data);
//           // Handle success
//         })
//         .catch((error) => {
//           console.error('Error creating event:', error);
//           // Handle error
//         });
//     } catch (error) {
//       console.error('Error creating event:', error);
//       // Handle error
//     }
//   };

//   return (
//     <Container maxWidth="md">
//       <Card>
//         <CardContent>
//           <Typography variant="h5" component="div" gutterBottom>
//             Create Event
//           </Typography>

//             <TextField
//               label="Title"
//               value={title}
//               onChange={handleTitleChange}
//               fullWidth
//               margin="normal"
//               required
//             />
//             <TextField
//               label="Description"
//               value={description}
//               onChange={handleDescriptionChange}
//               fullWidth
//               margin="normal"
//               required
//               multiline
//               rows={10} 
//             />

//             <div style={{ marginBottom: '20px' }}>
//                 <div className=''>

//              <span className='h6'>From: </span> <DatePicker
//                     selected={startTime}
//                     onChange={(date) => handleStartTimeChange(date)}
//                     showTimeSelect
//                     timeFormat="HH:mm"
//                     timeIntervals={15}
//                     dateFormat="MMMM d, yyyy h:mm aa"
//                     placeholderText="Select start time"
//                     className='border border-light w-100'
//                     popperClassName='date-picker-popper'
//                     wrapperClassName='date-picker-wrapper'

//                     />
//                 <div>
//                    <span className='h6'>To: </span> <DatePicker
//                     selected={endTime}
//                     onChange={(date) => handleEndTimeChange(date)}
//                     showTimeSelect
//                     timeFormat="HH:mm"
//                     timeIntervals={15}
//                     dateFormat="MMMM d, yyyy h:mm aa"
//                     placeholderText="Select end time"
//                     className='border border-light w-100'
//                     popperClassName='date-picker-popper'
//                     wrapperClassName='date-picker-wrapper'
//                 />
//                 </div>
//                 </div>

//             </div>

//             <input type="file" accept="image/*" onChange={handleImageChange} />

//             <Button type="submit" variant="contained" color="primary" onClick={handleFormSubmit}>
//               Create Event
//             </Button>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export default AddEvent;
