// import React from 'react';

// import { Link } from 'react-router-dom';

// const NavbarHome = () => {
        
//     return (
//         <nav>
//             <Link to="/userProfile"> <button>Show Profile</button></Link>
//             <br></br>
//             <Link to="/searchProducts"><button>Search products</button></Link>
//             <br></br>
//             <Link to="/cart"><button>Go to cart </button></Link>
//         </nav>
//     );
// };

// export default NavbarHome;



import React from 'react';
import { Link } from 'react-router-dom';

const NavbarHome = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
                </div>
            </div>
        </nav>
    );
};

export default NavbarHome;

