
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css'; 
import { toast } from 'react-toastify';


const LoginPage = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        Email: "",
        Password: ""
    });
    const { Email, Password } = inputs;
    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { Email, Password };
            const response = await fetch(
                "http://localhost:3006/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );
            const parseRes = await response.json();

            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
            } else {
                setAuth(false);
            }
        } catch (err) {
            console.error(err.message);
        }
    }
    
    return (
        <Fragment>
            
                <div className="container">
                    <h1 className="font-weight-light display text-center">Login</h1>
                    <form onSubmit={onSubmitForm}>
                        <div className="form-group">
                            <label htmlFor="Email">Email</label>
                            <input type="Email" name="Email" className="form-control" value={Email} onChange={e=>onChange(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Password">Password</label>
                            <input type="Password" name="Password" className="form-control" value={Password} onChange={e=>onChange(e)} />
                        </div>
                        <button className="btn btn-success btn-block">Submit</button>
                    </form>
                    <Link to="/signup">Have Not Signed Up Yet?</Link>
                </div>

        </Fragment>
    );
};

export default LoginPage;
