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
      const response = await fetch("http://localhost:3006/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      // Set userId if authenticated
      if (parseRes === true) {
        const userDataResponse = await fetch("http://localhost:3006/auth/user", {
          method: "GET",
          headers: { token: localStorage.token },
        });
        const userData = await userDataResponse.json();
        setUserId(userData.id);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
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
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

// Custom hook to use both userId and setUserId
export const useUserContext = () => useContext(UserContext);

export default App;












// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";

// import UserInformation from "./routes/userInfo";
// import ProductDetails from "./routes/ProductDetails";   
// import PeyajRoshun from "./routes/PeyajRoshun";
// import ProductCategoryWise from "./routes/ProductCategoryWise";
// import UserDetailsPage from "./routes/UserDetailsPage";
// import LoginPage from "./routes/LoginPage";
// import SignUpPage from "./routes/SignUp";
// import SearchProducts from "./routes/SearchProducts";
// import Cart from "./routes/Cart";
// import Home from "./routes/HomePage";

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userId, setUserId] = useState(""); // to store the user id

//   const setAuth = (boolean) => {
//     setIsAuthenticated(boolean);
//   };

//   const isAuth = async () => {
//     try {
//       const response = await fetch("http://localhost:3006/auth/is-verify", {
//         method: "GET",
//         headers: { token: localStorage.token },
//       });

//       const parseRes = await response.json();
//       parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   useEffect(() => {
//     isAuth();
//   });

//   return (
//     <div>
//     <Router>
//         <Routes>
//             <Route exact path="/" element={<PeyajRoshun/>} />
//             {/* //if user is authenticated then redirect to home page else redirect to login page */}
//             <Route exact path="/login" element={!isAuthenticated ? <LoginPage setAuth={setAuth}/> : <Navigate to="/home" />} />
//             {/* if user is authentiacated then rediredt to signup page else redirect to login page */}
//             <Route exact path="/signup" element={!isAuthenticated ? <SignUpPage setAuth={setAuth} /> : <Navigate to="/login" />} />
//             <Route exact path="/home" element={isAuthenticated ? <Home/> : <Navigate to="/login" />} />
//             <Route exact path="/productscategorywise/:categoryid" element={isAuthenticated ? <ProductCategoryWise/> : <Navigate to="/home" />} />
//             <Route exact path="/cart" element={isAuthenticated ? <Cart/> : <Navigate to="/login" />} />
//             <Route exact path="/userProfile" element={isAuthenticated ? <UserInformation setAuth={setAuth}/> : <Navigate to="/login" />} />
//             <Route exact path="/productDetails/:id" element={isAuthenticated ? <ProductDetails/> : <Navigate to="/login" />} />
//             <Route exact path="/searchProducts" element={isAuthenticated ? <SearchProducts/> : <Navigate to="/login" />} />
//         </Routes>
//     </Router>
//    </div>
//   );

// }
// export default App;

//prev version