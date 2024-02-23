import React from 'react';

import { Link } from 'react-router-dom';

const NavbarHome = () => {
        
    return (
        <nav>
            <Link to="/userProfile"> <button>Show Profile</button></Link>
            <br></br>
            <Link to="/searchProducts"><button>Search products</button></Link>
            <br></br>
            <Link to="/cart"><button>Go to cart </button></Link>
        </nav>
    );
};

export default NavbarHome;
