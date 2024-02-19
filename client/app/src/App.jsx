import React,{useState,useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom'

import PeyajRoshun from './routes/PeyajRoshun'
import HomePage from './routes/HomePage'
import ProductCategoryWise from './routes/ProductCategoryWise'
import UserDetailsPage from './routes/UserDetailsPage'
import LoginPage from './routes/LoginPage'
import SignUpPage from './routes/SignUp'
//import { CategoriesContext } from './context/CategoriesContext'
import CategoriesContext from './context/categoriesContext'


const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = (boolean) =>{
        setIsAuthenticated(boolean);
    };

    const isAuth = async () => {
        try {
            const response = await fetch("http://localhost:3006/auth/is-verify", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        isAuth();
    });

    return (
        <CategoriesContext>
            <div style={{backgroundColor:"tomato"}}>
            <Router>
                <Routes>
                    <Route exact path="/" element={<PeyajRoshun/>} />
                    <Route exact path="/login"  element={!isAuthenticated ? <LoginPage setAuth={setAuth}/> : <Navigate to = "/home" /> } />
                    <Route exact path="/signup" element={!isAuthenticated ? <SignUpPage setAuth={setAuth}/> : <Navigate to = "/login" />} />
                    <Route exact path="/home" element={isAuthenticated ? <HomePage setAuth={setAuth}/> : <Navigate to = "/login" />} />
                    <Route exact path="/productscategorywise/:categoryid" element={isAuthenticated ? <ProductCategoryWise setAuth={setAuth}/> : <Navigate to = "/home" />} />
                    <Route exact path="/user/:id" element={<UserDetailsPage setAuth={setAuth} />} />

                </Routes>
            </Router>
            </div>
        </CategoriesContext>
    )
    }
export default  App;