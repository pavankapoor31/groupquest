import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import React from "react";
import Login from "../components/Login/Login";
import Home from "../components/Home/Home";
import Signup from "../components/Signup/Signup";

/**
 * @author Pavan, Mahima
 * Manages all the routes for the application. Add your routes inside the Route tag enclosed by Routes tag.
 * Define all the elements in Pages folder.
 */
function    RouteManager() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path={"/login"} element={<Login />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/home"} element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}
export default RouteManager;
