import React, { useState, useEffect } from "react";
import CategoryList from "../components/CategoryList";
import UserInformation from "../routes/userInfo";
import "../styles/Home.css";


const Home = ({ setAuth }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // State to track login status
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [showUserInfo, setShowUserInfo] = useState(false); // State to track whether to show user info

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

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      setAuth(false); // Update authentication status
      setIsLoggedIn(false); // Update login status
    } catch (err) {
      console.error(err.message);
    }
  };

  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo); // Toggle the showUserInfo state
  };

  return (
    <div>
      <button onClick={toggleUserInfo} className="btn">
        {showUserInfo ? "Close Profile" : "See My Profile"}
      </button>
      <div className="container">
        <h1
          className="home-heading text-center"
          style={{ fontSize: "3rem", color: "cyan" }}
        >
          Welcome to Home
        </h1>

        {isLoggedIn && (
          <>
            <h2 className="text-center" style={{ color: "black" }}>
              {firstName} {lastName}
            </h2>
            {showUserInfo && (
              <UserInformation
                userInfo={{ firstName, lastName, email, city, district }}
                handleLogout={handleLogout}
              />
            )}
          </>
        )}
      </div>
      <CategoryList/>
    </div>
  );
};

export default Home;
