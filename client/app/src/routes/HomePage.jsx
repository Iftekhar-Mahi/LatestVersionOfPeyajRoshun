import React, { useState, useEffect } from "react";
import CategoryList from "../components/CategoryList";
import UserInformation from "../routes/userInfo";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css";
import NavbarHome from "../components/NavbarHome";

const Home = ({ setAuth }) => {
  console.log("Home Page");
  useEffect(() => {
    console.log("Home Page Mounted");
  });
  return (
    <div>
      <NavbarHome/>
      <CategoryList/>
    </div>
  );
};

export default Home;
