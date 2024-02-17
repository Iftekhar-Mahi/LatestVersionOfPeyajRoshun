  import React, { Fragment } from 'react';
  import { Link } from 'react-router-dom';
  import './PeyajRoshun.css'; // Import the CSS file

  const PeyajRoshun = () => {
    return (
      <Fragment>
        <div className="container"> {/* Add className */}
          <h1 className="font-weight-light display text-center">Welcome To PeyajRoshun</h1>
          <Link to="/signup">
            <button className="btn btn-success btn-block">Sign Up</button>
          </Link>
          <Link to="/login">
            <button className="btn btn-success btn-block">User Login</button>
          </Link>
          <Link to="/home">
            <button className="btn btn-success btn-block">Home</button>
          </Link>
        </div>
      </Fragment>
    );
  };

  export default PeyajRoshun;
