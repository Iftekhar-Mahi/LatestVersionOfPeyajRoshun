import React, { useState, useEffect } from "react";

const UserDetailsPage = ({ match }) => {
  const [user, setUser] = useState(null);

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
