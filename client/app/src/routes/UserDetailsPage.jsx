import React, { useState, useEffect } from "react";

const UserDetailsPage = ({ match }) => {
  const [user, setUser] = useState(null);
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

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Extract the user ID from the URL params
        const userId = match.params.id;
        
        // Make a request to your backend to fetch user details based on the ID
        const response = await fetch(`http://localhost:3000/api/user/${userId}`);
        const userData = await response.json();
        
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  }, [match.params.id]); // Re-run effect when ID changes

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>City: {user.city}</p>
      <p>District: {user.district}</p>
      {/* Add more attributes as needed */}
    </div>
  );
};

export default UserDetailsPage;
