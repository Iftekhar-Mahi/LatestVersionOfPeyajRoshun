import React, { useState } from 'react'
import {Link} from 'react-router-dom'

const AddUser = () => {
    // const[firstName,setFirstName]= useState("")
    // const[lastName,setLastName]= useState("")
    // const[email,setEmail]= useState("")
    // const[password,setPassword]= useState("")
    // const[roadNo,setRoadNo]= useState("")
    // const[houseNo,setHouseNo]= useState("")
    // const[city,setCity]= useState("")
    // const[district,setDistrict]= useState("")
    // const[confirmPassword,setConfirmPassword]= useState("")
    const[inputs,setInputs]= useState({
        FirstName:"",
        LastName:"",
        Email:"",
        RoadNo:"",
        HouseNo:"",
        City:"",
        District:"",
        Password:""
    })
    const { FirstName, LastName, Email, RoadNo, HouseNo, City, District, Password } = inputs
    const onChange = (e) => {
        setInputs({...inputs,[e.target.name]:e.target.value});
    };


    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = { FirstName, LastName, Email, RoadNo, HouseNo, City, District , Password}
            const response = await fetch("http://localhost:3006/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            
            const parseRes = await response.json()
            console.log(parseRes)
            alert("Request to Add has been sent to server!") // Add alert message
        } catch (err) {
            console.error(err.message)
        }
    }
    
  return (
    <div className='mb-4'>
        <form action="" onSubmit={onSubmitForm}>    
            <div className="form-row">
                <div className="form-row">
                    <div className="form-group col-6">
                        <label htmlFor="FirstName">First Name</label>
                        <input name="FirstName" value={FirstName} onChange={e=>onChange(e)}  className="form-control" type="text" />
                    </div>
                    <div className="form-group col-6">
                        <label htmlFor="LastName">Last Name</label>
                        <input name="LastName" value={LastName} onChange={e=>onChange(e)}  className="form-control" type="text" />
                    </div>
                </div>
                <div className="form-group col-6">
                    <label htmlFor="Email">Email</label>
                    <input name="Email" value={Email} onChange={e=>onChange(e)} className="form-control" type="email" />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-12">
                    <label htmlFor="Password">Password</label>
                    <input name="Password" value={Password} onChange={e=>onChange(e)} className="form-control" type="password" />
                </div>
                {/*<div className="form-group col-6">
                    <label htmlFor="password">Confirm Password</label>
                    <input id="password" value={confirmPassword} onChange={e=>confirmPassword(e.target.value)} className="form-control" type="password" />
                </div>*/}
            </div>

            <div className="form-row">
                <div className="form-row">
                    <div className="form-group col-3">
                        <label htmlFor="RoadNo">Road No</label>
                        <input name="RoadNo" value={RoadNo} onChange={e=>onChange(e)} className="form-control" type="text" />
                    </div>
                    <div className="form-group col-3">
                        <label htmlFor="HouseNo">House No</label>
                        <input name="HouseNo" value={HouseNo} onChange={e=>onChange(e)} className="form-control" type="text" />
                    </div>
                    <div className="form-group col-3">
                        <label htmlFor="City">City</label>
                        <input name="City" value={City} onChange={e=>onChange(e)} className="form-control" type="text" />
                    </div>
                    <div className="form-group col-3">
                        <label htmlFor="District">District</label>
                        <input name="District" value={District} onChange={e=>onChange(e)} className="form-control" type="text" />
                    </div>
                </div>
            </div>

            <button type="submit" className="btn btn-success btn-block">Submit</button>
        </form>
        <Link to="/login">Login</Link>
    </div>
  )
}

export default AddUser
