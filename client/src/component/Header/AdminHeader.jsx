import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function AdminHeader(props) {

    const navigate = useNavigate()

    function handleLogout(){
        axios.get('/api/logout')
            .then((result)=>{
                if(result.data === "logoutsuccess"){
                    navigate('/register')
                }
            })
        }

    return (
        <>
            <header className="p-3 mb-3 border-bottom">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
                            <img src="https://shorturl.at/gAFJU" className="bi me-2" width="32" height="32" role="img" aria-label="Bootstrap" />
                            <h5 className="txt txt-primary">Admin</h5>
                        </a>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><Link to="/" className="nav-link px-2 link-body-emphasis">Products</Link></li>
                            <li><Link to="/orders" className="nav-link px-2 link-body-emphasis">Orders</Link></li>
                            <li><Link to="/settings" className="nav-link px-2 link-body-emphasis">Settings</Link></li>
                        </ul>

                        <div className="dropdown text-end me-4">
                            <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                            </a>
                            
                            <ul className="dropdown-menu text-small" style={{}}>
                                

                            {props.isLoggedIn ? 
                                (<li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>
                            ):(
                                <div><li><a className="dropdown-item" href="#">Create Account</a></li>
                                <li><a className="dropdown-item" href="#">Login</a></li></div>)}
                                
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Help</a></li>
                            </ul>
                        </div>

                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                            <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
                        </form>

                        
                    </div>
                </div>
            </header>

        </>
    )
}

export default AdminHeader;


