import React, { useEffect, useState } from "react";
import ChatApp from "../ChatApp/ChatApp";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { CardMedia } from "@mui/material";
const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState();
  const [loading, setLoading] = useState(true);
  const [createdBy, setCreatedBy] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let Pid = localStorage.getItem('profile.id');
    if(!Pid) navigate('/login')
    axios
      .get(`http://localhost:3001/api/events?filter={"where":{"id":"${id}"}}`)
      .then((res) => {
        if (res.data.length > 0) setEvent(res.data[0]);
        setLoading(false);
        console.log(res.data, "ress");
        try {
          axios
            .get(
              `http://localhost:3001/api/users?filter={"where":{"id":"${res.data[0].createdBy}"}}`
            )
            .then((res) => {
              console.log(res.data, "dataa");
              setCreatedBy(res.data[0]?.username);
            });
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(id, "idFromEventDeets");
  const defaultImg = require('./../../assets/event-default.png')
  return (
    <div className="main-element">
      <div className="d-flex  justify-content-between p-2 ">
        <div className="event-info w-100 justify-content-center align-items-center">
          <div style={{marginLeft:'2rem', marginTop:'3rem'}}>
            <div className="h1">{event?.title}</div>
            {createdBy && (
              <div className="my-0">
                Organized by <strong>{createdBy}</strong>
              </div>
            )}
            <div className="my-4"></div>
            <div className="h5 my-0">
              <div> About the event:</div>
            </div>
            {event?.description}

            <div className="my-3"></div>
            {event?.startTime && (
              <div>
                <strong>
                  <span className="pr-2">Starts on: </span>
                </strong>
                {moment(event?.startTime).format("DD, MMM, YYYY hh:mm A")}
              </div>
            )}
            {event?.endTime && (
              <div>
                <strong>
                  <span className="pr-2">Ends on: </span>
                </strong>
                {moment(event?.endTime).format("DD, MMM, YYYY hh:mm A")}
              </div>
            )}
             {!loading && <CardMedia onClick={()=>{}}
              component="img"
              height="440"
              image={event?.image??defaultImg}
              alt={'Event image'}
              sx={{ objectFit: 'fit' }}
              className=""
              style={{paddingRight:'1rem'}} 
            />}
          </div>
         
        </div>

        <div style={{marginTop:'3rem'}}><ChatApp groupId={id} /></div>
      </div>
    </div>
  );
};

export default EventDetails;
