import React,{Fragment,useState,useEffect} from "react";
import './LoginPage.css'; // Import CSS file

import CategoryList from "../components/CategoryList";

const Home = ({setAuth}) => {
   
  const [FirstName, setFirstName] = useState("");
  async function getFirstName() {
    try {
      const response = await fetch("http://localhost:3006/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();
      console.log(parseRes);
      //
      setFirstName(parseRes.firstname);
    } catch (err) {
      console.error(err.message);
    }
    //commit ay
  }
  useEffect(() => {
    getFirstName();
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
    <Fragment>
    <div className="container">
        <h1 className="font-weight-light display text-center">Home {FirstName}</h1>
        <button onClick={e=>logout(e)} className="btn btn-primary">LogOut</button>
        <CategoryList /> {/**/}

    </div>
    </Fragment>
  );
};

export default Home;
