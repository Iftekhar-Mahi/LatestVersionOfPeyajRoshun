import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../styles/PeyajRoshun.css';
const PeyajRoshun = () => {
  return (
    <Fragment>

      
      <div className="peyaroshun-container">
        
        <h1 className="welcome-text">Welcome To PeyajRoshun</h1>

        <div className="buttons-container">
          <Link to="/signup">
            <button className="signup-button">Sign Up</button>
          </Link>
          <Link to="/login">
            <button className="login-button">User Login</button>
          </Link>
          <Link to="/home">
            <button className="home-button">Home</button>
          </Link>
        </div>
        <p className="description">
          PeyajRoshun is your one-stop shop for all your e-commerce needs.
          We offer a wide variety of products from more than 10 categories, with hundreds of items  to choose from.
          Explore our extensive collection and find the perfect items for you.
        </p>
        <div className="features-container">
          <div className="feature-block">
            <i className="fas fa-money-bill-alt feature-icon"></i>
            <h3>Pay Us However You Like</h3>
            <p>We offer a variety of secure payment options to suit your needs.</p>
          </div>
          <div className="feature-block">
            <i className="fas fa-truck feature-icon"></i>
            <h3>Track Your Orders</h3>
            <p>Easily track the status of your orders and deliveries right from your account.</p>
          </div>
          <div className="feature-block">
            <i className="fas fa-tag feature-icon"></i>
            <h3>Get Best Deals & Offers</h3>
            <p>Enjoy exclusive deals and discounts you won't find anywhere else.</p>
          </div>
          <div className="feature-block">
            <i className="fas fa-search feature-icon"></i>
            <h3>Search Your Desired Product</h3>
            <p>Find exactly what you're looking for with our powerful search engine.</p>
          </div>
          <div className="feature-block">
            <i className="fas fa-star feature-icon"></i>
            <h3>Get Reviews About Products</h3>
            <p>Read reviews from other customers to help you make informed purchase decisions.</p>
          </div>
        </div>
        
      </div>
    </Fragment>
  );
};

export default PeyajRoshun;
