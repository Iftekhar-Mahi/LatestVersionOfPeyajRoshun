import React, { useState, useEffect, useContext } from "react";
import { useUserContext } from "../App";
import { Link } from "react-router-dom"; 
import "../styles/EditPage.css";
const EditPage = () => {
    const { userId, setUserId } = useUserContext(); 

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [isProfileUpdated, setIsProfileUpdated] = useState(false); 

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

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleDistrictChange = (e) => {
        setDistrict(e.target.value);
    };

    const handleEditClick = async () => {
        try {
            const response = await fetch("http://localhost:3006/edit/" + userId, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId,
                    firstName,
                    lastName,
                    email,
                    city,
                    district,
                }),
            });
            console.log("req.body", JSON.stringify({ userId, firstName, lastName, email, city, district }));
            const data = await response.json();
            console.log(data);
            setIsProfileUpdated(true); 
        } catch (err) {
            console.log("Could not update user info");
        }
    };

    return (
        <div className="edit-container">
            <div className="edit-card">
                <div className="edit-card-body">
                    <h5 className="edit-card-title">
                        <strong>User Information</strong>
                    </h5>
                    <p>
                        <strong>User ID:</strong> {userId}
                    </p>
                    <div className="edit-field">
                        <strong>First Name:</strong>{" "}
                        <input
                            type="text"
                            value={firstName}
                            onChange={handleFirstNameChange}
                            className="edit-input"
                        />
                    </div>
                    <div className="edit-field">
                        <strong>Last Name:</strong>{" "}
                        <input
                            type="text"
                            value={lastName}
                            onChange={handleLastNameChange}
                            className="edit-input"
                        />
                    </div>
                    <div className="edit-field">
                        <strong>Email:</strong>{" "}
                        <input
                            type="text"
                            value={email}
                            onChange={handleEmailChange}
                            className="edit-input"
                        />
                    </div>
                    <div className="edit-field">
                        <strong>City:</strong>{" "}
                        <input
                            type="text"
                            value={city}
                            onChange={handleCityChange}
                            className="edit-input"
                        />
                    </div>
                    <div className="edit-field">
                        <strong>District:</strong>{" "}
                        <input
                            type="text"
                            value={district}
                            onChange={handleDistrictChange}
                            className="edit-input"
                        />
                    </div>
                    <button onClick={handleEditClick} className="edit-button">OK</button>
                    {isProfileUpdated && (
                        <p className="edit-success-message">
                            Your Profile Has been Updated. Email May or May not be updated based on validity
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditPage;
