import React, { useState, useEffect } from "react";
import CategoryList from "../components/CategoryList";
import UserInformation from "../routes/userInfo";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { useUserContext } from "../App";

import NavbarHome from "../components/NavbarHome";

const Home = ({ setAuth }) => {
  const { userId, setUserId } = useUserContext(); // Access userId from context

  console.log("Home Page");


  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await fetch("http://localhost:3006/dashboard/", {
          method: "GET",
          headers: { token: localStorage.token },
        });
        const userData = await response.json();
        console.log(userData);
        // Update states with received data
        setUserId(userData.userid);
      } catch (err) {
        console.log("Could not fetch user info");
      }
    }
    getUserInfo();
  }, []);



  return (
    <div>
      <NavbarHome/>
      <br/>
      <br/>
      <br/>
      <CategoryList/>
    </div>
  );
};

export default Home;
