import React, { useEffect, useState } from "react";
import {
  XYPlot,
  VerticalBarSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
} from "react-vis";
import {
  List,
  ListItem,
  Checkbox,
  Typography,
  Paper,
  LinearProgress,
} from "@mui/material";
import axios from "axios";
const Goals = () => {
  const [goals, setGoals] = useState([
    { id: 1, name: "Learn React", achieved: false },
    { id: 2, name: "Build a project", achieved: false },
    { id: 3, name: "Master CSS", achieved: true },
    // Add more goals as needed
  ]);
  let profileId = localStorage.getItem("profile.id");
  profileId = JSON.parse(profileId);
  const fetchGoals = () => {
    axios
      .get(
        `http://localhost:3001/api/goals?filter={"where":{"createdBy":"${profileId}"}}`
      )
      .then((res) => {
        setGoals(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchGoals();
    const intervalId = setInterval(fetchGoals, 10000);
    return () => clearInterval(intervalId);
  }, []);
  const handleCheckboxChange = (id) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>{

        if(goal.id === id) {
          axios.post(
            `http://localhost:3001/api/goals/update?where={"id":"${id}"}`,
            {achieved: !goal.achieved}
          ).catch((err)=>{
            console.log(err)
          })
          return { ...goal, achieved: !goal.achieved }
        } else return goal
        return 
      }
      )
    );

  };

  const calculateProgress = () => {
    const totalGoals = goals.length;
    const achievedGoals = goals.filter((goal) => goal.achieved).length;
    return (achievedGoals / totalGoals) * 100 || 0;
  };

  const progressData = goals.map((goal) => ({
    x: goal.name,
    y: goal.achieved ? 100 : 0,
  }));

  return (
    <div className="main-element ">
      <Typography variant="h4" gutterBottom className="pt-2">
        My Goals
      </Typography>
      {goals.length > 0 ? (
        <>
          <Paper elevation={3} style={{ padding: "16px", marginRight: "12px" }}>
            <List>
              {goals.map((goal) => (
                <ListItem key={goal.id} disablePadding>
                  <Checkbox
                    checked={goal.achieved}
                    onChange={() => handleCheckboxChange(goal.id)}
                  />
                  <Typography variant="body1" style={{ marginLeft: "8px" }}>
                    {goal.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={goal.achieved ? "textSecondary" : "error"}
                    style={{ marginLeft: "auto" }}
                  >
                    Status: {goal.achieved ? "Achieved" : "Pending"}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Paper>
          <div style={{ marginTop: "16px", marginRight: "12px" }}>
            <Typography variant="h6" gutterBottom>
              Progress Chart
            </Typography>
            <Paper elevation={3} style={{ padding: "16px" }}>
              <XYPlot
                height={300}
                width={500}
                xType="ordinal"
                yDomain={[0, 100]}
              >
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <VerticalBarSeries data={progressData} />
              </XYPlot>
              <LinearProgress
                variant="determinate"
                value={calculateProgress()}
                style={{ marginTop: "8px" }}
              />
            </Paper>
          </div>
        </>
      ) : (
        <div className="text-primary pt-2">
          {" "}
          You have not added any goals yet!{" "}
        </div>
      )}
    </div>
  );
};

export default Goals;
