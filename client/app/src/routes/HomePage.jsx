import React, { Fragment, useState, useEffect } from "react";
import "./LoginPage.css"; // Import CSS file

import CategoryList from "../components/CategoryList";
import UserInformation from "../routes/userInfo";

const Home = ({ setAuth }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");

  async function getUserInfo() {
    try {
      const response = await fetch("http://localhost:3006/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const userData = await response.json();
      console.log(userData);
      setFirstName(userData.firstname);
      setLastName(userData.lastname);
      setEmail(userData.email);
      setCity(userData.city);
      setDistrict(userData.district);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="container" style={{ backgroundColor: "tomato" }}>
      <h1
        className="home-heading text-center"
        style={{ fontSize: "3rem", color: "cyan" }}
      >
        Welcome to Home
      </h1>

      <h2 className="text-center" style={{color:"cyan"}}>
        {firstName} {lastName}
      </h2>
      <button onClick={logout} className="btn btn-primary">
        LogOut
      </button>
      <br></br>
      <UserInformation
        userInfo={{ firstName, lastName, email, city, district }}
      />
      <br></br>
      <CategoryList />
    </div>
  );
};

export default Home;
