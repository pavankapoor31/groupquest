import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {moment} from 'moment'
import ShareIcon from '@mui/icons-material/Share';

const EventCard = ({ event }) => {
    console.log(event,'evvv ')
  let { title, description, startTime, endTime } = event;
    let image = null;
    // let title='test';
    // let description='test';
    // let startTime= '123'
    // let endTime= '123'
    const defaultImg = require('./../../assets/event-default.png')
  return (
    <Card sx={{ maxWidth: 350, margin: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} >
      <CardMedia
        component="img"
        height="140"
        image={image??defaultImg}
        alt={title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        From {startTime} to {endTime}
        </Typography>
        <div className='pull-right'>
        <ShareIcon className='mr-3' role="button"/>
        <span className='mx-2 mb-0  '>  5 people attending</span>
        <Button>
            RSVP
        </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
