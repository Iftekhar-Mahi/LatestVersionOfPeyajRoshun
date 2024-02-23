// import React, { useState, useEffect } from "react";

// const UserInformation = ({setAuth}) => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [city, setCity] = useState("");
//   const [district, setDistrict] = useState("");
//   const [logoutClicked, setLogoutClicked] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(true);
  

//   useEffect(() => {
//     async function getUserInfo() {
//       try {
//         const response = await fetch("http://localhost:3006/dashboard/", {
//           method: "GET",
//           headers: { token: localStorage.token },
//         });
//         const userData = await response.json();
//         console.log(userData);
//         // Update states with received data
//         setFirstName(userData.firstname);
//         setLastName(userData.lastname);
//         setEmail(userData.email);
//         setCity(userData.city);
//         setDistrict(userData.district);
//       } catch (err) {
//         console.log("Could not fetch user info");
//       }
//     }
//     getUserInfo();
//   }, []);

//   const buttonLogout = () => {
//     console.log("Logout button clicked");
//     // You can add your logout logic here
//     try{
//       localStorage.removeItem("token");
//       setIsLoggedIn(false);
//       setAuth(false); 

//     }
//     catch(err){
//       console.error("Could not logout", err);
//     }
//   };

//   return (
//     <div className="user-info-container">
//       <p><strong>User Information</strong></p>  
//       <p><strong>First Name:</strong> {firstName}</p>
//       <p><strong>Last Name:</strong> {lastName}</p>
//       <p><strong>Email:</strong> {email}</p>
//       <p><strong>City:</strong> {city}</p>
//       <p><strong>District:</strong> {district}</p>
//       {/* Add more user info attributes here */}
//       {logoutClicked && <p>Logout button clicked</p>}
//       <button className="buttonLogOut" onClick={buttonLogout}>Logout</button>
//     </div>
//   );
// };

// export default UserInformation;



import React, { useState, useEffect, useContext } from "react";
import { useUserContext } from "../App";

const UserInformation = ({ setAuth }) => {
  const { userId, setUserId } = useUserContext(); // Access userId from context

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
        // Update states with received data
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
    // You can add your logout logic here
    try {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setAuth(false);
    } catch (err) {
      console.error("Could not logout", err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card border-danger p-4 rounded"> {/* Apply Bootstrap card class, border color, padding, and rounded corners */}
        <div className="card-body">
          <h5 className="card-title text-danger border-bottom pb-2 mb-4"><strong>User Information</strong></h5> {/* Apply Bootstrap card title class, text color, bottom border, padding */}
          <p><strong>User ID:</strong> {userId}</p>
          <p><strong>First Name:</strong> {firstName}</p>
          <p><strong>Last Name:</strong> {lastName}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>City:</strong> {city}</p>
          <p><strong>District:</strong> {district}</p>
          {/* Add more user info attributes here */}
          {logoutClicked && <p>Logout button clicked</p>}
          <button className="btn btn-danger" onClick={buttonLogout}>Logout</button> {/* Apply Bootstrap button class and danger color */}
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
