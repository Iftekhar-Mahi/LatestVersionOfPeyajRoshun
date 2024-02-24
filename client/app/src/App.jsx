import React, { useState, useEffect, createContext, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import UserInformation from "./routes/userInfo";
import ProductDetails from "./routes/ProductDetails";   
import PeyajRoshun from "./routes/PeyajRoshun";
import ProductCategoryWise from "./routes/ProductCategoryWise";
import UserDetailsPage from "./routes/UserDetailsPage";
import LoginPage from "./routes/LoginPage";
import SignUpPage from "./routes/SignUp";
import SearchProducts from "./routes/SearchProducts";
import Cart from "./routes/Cart";
import Home from "./routes/HomePage";
import Checkout from "./routes/Checkout"; // Import the Checkout component

// Create a custom context for userId and setUserId
const UserContext = createContext();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null); // to store the user id

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  

  const isAuth = async () => {
    try {
      const response = await fetch("http://localhost:3006/auth/is-verify/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      // Set userId if authenticated
      if (parseRes === true) {
        const userDataResponse = await fetch("http://localhost:3006/dashboard/", {
          method: "GET",
          headers: { token: localStorage.token },
        });
        const userData = await userDataResponse.json();
        setUserId(userData.userid);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    console.log(userId);
    isAuth();
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      <h1 style={{ textAlign: "center" }}>UserId: {userId}</h1>
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<PeyajRoshun/>} />
            <Route exact path="/login" element={!isAuthenticated ? <LoginPage setAuth={setAuth}/> : <Navigate to="/home" />} />
            <Route exact path="/signup" element={!isAuthenticated ? <SignUpPage setAuth={setAuth} /> : <Navigate to="/login" />} />
            <Route exact path="/home" element={isAuthenticated ? <Home/> : <Navigate to="/login" />} />
            <Route exact path="/productscategorywise/:categoryid" element={isAuthenticated ? <ProductCategoryWise/> : <Navigate to="/home" />} />
            <Route exact path="/cart" element={isAuthenticated ? <Cart/> : <Navigate to="/login" />} />
            <Route exact path="/userProfile" element={isAuthenticated ? <UserInformation setAuth={setAuth}/> : <Navigate to="/login" />} />
            <Route exact path="/productDetails/:id" element={isAuthenticated ? <ProductDetails/> : <Navigate to="/login" />} />
            <Route exact path="/searchProducts" element={isAuthenticated ? <SearchProducts/> : <Navigate to="/login" />} />
            <Route exact path="/checkout" element={isAuthenticated ? <Checkout/> : <Navigate to="/login" />} /> 
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);

export default App;
