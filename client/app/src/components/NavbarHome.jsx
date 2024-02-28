import React from 'react';
import { Link } from 'react-router-dom';

const NavbarHome = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor: 'aliceblue' }}>
                <div className="container-fluid">
                    <div className="d-flex">
                        <Link className="nav-link" to="/userProfile">
                            <button className="btn btn-primary me-2">Show Profile</button>
                        </Link>
                        <Link className="nav-link" to="/searchProducts">
                            <button className="btn btn-primary me-2">Search Products</button>
                        </Link>
                        <Link className="nav-link" to="/cart">
                            <button className="btn btn-primary">Go to Cart</button>
                        </Link>
                        <Link className="nav-link" to="/orders">
                            <button className="btn btn-primary">All Orders</button>
                        </Link>
                        {/* add another link to 'seeHotDeals */}
                        <Link className="nav-link" to="/seeHotDeals">
                            <button className="btn btn-primary"> See Hot Deals </button>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavbarHome;
