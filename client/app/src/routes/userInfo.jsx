import React, { useState, useEffect, useContext } from "react";
import { useUserContext } from "../App";
import { Link } from "react-router-dom";
import "../styles/userInformation.css";
// Import CSS file

const UserInformation = ({ setAuth }) => {
  const { userId, setUserId } = useUserContext(); 

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [logoutClicked, setLogoutClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await fetch("http://localhost:3006/dashboard/", {
          method: "GET",
          headers: { token: localStorage.token },
        });
        const userData = await response.json();
        console.log(userData);
        setUserId(userData.userid);
        setFirstName(userData.firstname);
        setLastName(userData.lastname);
        setEmail(userData.email);
        setCity(userData.city);
        setDistrict(userData.district);
      } catch (err) {
        console.log("Could not fetch user info");
      }
    }
    getUserInfo();
  }, []);

  const buttonLogout = () => {
    console.log("Logout button clicked");
    try {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setAuth(false);
    } catch (err) {
      console.error("Could not logout", err);
    }
  };

  return (
    <div className="user-info-container">
      <div className="user-info-card">
        <div className="user-info-card-body">
          <h5 className="user-info-card-title">
            <strong>User Information</strong>
          </h5>
          <p className="user-info-item">
            <strong>User ID:</strong> {userId}
          </p>
          <p className="user-info-item">
            <strong>First Name:</strong> {firstName}
          </p>
          <p className="user-info-item">
            <strong>Last Name:</strong> {lastName}
          </p>
          <p className="user-info-item">
            <strong>Email:</strong> {email}
          </p>
          <p className="user-info-item">
            <strong>City:</strong> {city}
          </p>
          <p className="user-info-item">
            <strong>District:</strong> {district}
          </p>
          {logoutClicked && <p className="user-info-item">Logout button clicked</p>}
          <button className="user-info-button" onClick={buttonLogout}>
            Logout
          </button>
          <Link to="/edit" className="user-info-button ml-2">Edit Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
