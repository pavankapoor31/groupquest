import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import React from "react";
import Login from "../components/Login/Login";
import Home from "../components/Home/Home";
import Signup from "../components/Signup/Signup";
import Sidebar from "../SideBar";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import Groups from "../components/Goals/Goals";
import Events from "../components/Events/Events";
import EventDetails from "../components/EventDetails/EventDetails";

const Pages = styled.div`
  width: 100vw;
  height: 100vh;

  h1 {
    font-size: calc(2rem + 2vw);
    background: linear-gradient(to right, #803bec 30%, #1b1b1b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
/**
 * @author Pavan, Mahima
 * Manages all the routes for the application. Add your routes inside the Route tag enclosed by Routes tag.
 * Define all the elements in Pages folder.
 */

function RouteManager() {
  return (
    <div className="bg-main">
      <Pages>
        <Router>
          {/* <Sidebar /> */}
          <AnimatePresence mode="wait">
            <Routes>
              <Route path={"/login"} element={<Login />} />
              <Route path={"/signup"} element={<Signup />} />
              <Route
                path={"/home"}
                element={
                  <>
                    {" "}
                    <Sidebar />
                    <Home/>{" "}
                  </>
                }
              />
              <Route
                path={"/goals"}
                element={
                  <>
                    {" "}
                    <Sidebar />
                    <Groups />{" "}
                  </>
                }
              />
              <Route
                path={"/events"}
                element={
                  <>
                    {" "}
                    <Sidebar />
                    <Events/>{" "}
                  </>
                }
              />
              <Route
                path={"/events/details/:id"}
                element={
                  <>
                    {" "}
                    <Sidebar />
                    <EventDetails/>{" "}
                  </>
                }
              />
              <Route
                path={"/resources"}
                element={
                  <>
                    {" "}
                    <Sidebar />
                    <EventDetails/>{" "}
                  </>
                }
              />
            </Routes>
          </AnimatePresence>
        </Router>
      </Pages>
    </div>
  );
}
export default RouteManager;
