import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./EventCard.css";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventCard = ({ event }) => {
  let profileId = localStorage.getItem("profile.id");
  profileId = JSON.parse(profileId);
  const [isGoingClicked, setGoingClicked] = useState(
    event.members && event.members.includes(profileId)
  );
  const { title, description, startTime } = event;
  const formattedStartTime = moment(startTime).format("DD MMMM YYYY HH:mm:ss");
  const navigate = useNavigate();
  const defaultImg = require("./../../assets/event-default.png");
  const [memberCount, setMemberCount] = useState(event.members?.length??0);
  const handleCardClick = () => {
    navigate(`/events/details/${event.id}`);
  };
  const handleGoingClick = () => {
    setGoingClicked(true);
    if (!isGoingClicked) {
      console.log(event.members, "going click payload stored");
      let payload = [profileId];
      if (event.members) payload = [...event.members, profileId];
      // http://localhost:3001/api/Events/update?where={"id":${JSON.stringify(id)}}
      axios
        .post(
          ` http://localhost:3001/api/events/update?where={"id":"${event.id}"}`,
          { members: payload }
        )
        .then(() => {
          console.log("POST request sent successfully");
          setMemberCount((prev) => prev + 1);
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    }
  };
  const handleShareClick = () => {
    const shareLink = `http://localhost:3000/events/details/${event.id}`;
    navigator.clipboard
      .writeText(shareLink)
      .then(() => {
        toast.success("Copied to clipboard!", {
          position: "top-right",
          autoClose: 2000, // 2 seconds
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log("Link copied to clipboard:", shareLink);
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
  };
  return (
    <Card
      sx={{
        maxWidth: 350,
        height: 350,
        margin: "16px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
      className="position-relative"
    >
      <CardMedia
        onClick={handleCardClick}
        component="img"
        height="120"
        image={event.image ?? defaultImg}
        alt={title}
        sx={{ objectFit: "cover" }}
        className="event-card-image"
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 2 }}
        >
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          From {formattedStartTime}
        </Typography>
        <div className="d-flex justify-content-between position-absolute" style={{ bottom: "10px", right:"10px", "left":'10px'}}>
         <div className="d-flex w-100" style={{justifyContent:'space-between'}}>
         <div>
            <ShareIcon
              className="mr-3"
              role="button"
              onClick={handleShareClick}
              style={{marginRight:'5px'}}
            />
            <span className="mx-2 mb-0">{memberCount} attending</span>
          </div>
          <div>
            <Button
              onClick={handleGoingClick}
              className={`btn bg-${isGoingClicked ? "success" : "primary"}`}
              style={{ color: "#fff" }}
            >
              RSVP
            </Button>
          </div>
         </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
