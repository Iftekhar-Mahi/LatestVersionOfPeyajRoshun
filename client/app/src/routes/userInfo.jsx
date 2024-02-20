import React from "react";
import "./userInformation.css"; // Import CSS file

const UserInformation = ({ userInfo, handleLogout }) => {
  const handleLogoutClick = () => {
    handleLogout();
  };
    
      return (
        <div className="user-info-container">
          <p><strong>First Name:</strong> {userInfo.firstName}</p>
          <p><strong>Last Name:</strong> {userInfo.lastName}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>City:</strong> {userInfo.city}</p>
          <p><strong>District:</strong> {userInfo.district}</p>
          {/* Add more user info attributes here */}
            <button className="buttonLogOut" onClick={handleLogoutClick}>Logout</button>
        </div>
      );
  
};

export default UserInformation;
