import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function UserHeader(props) {
    const [data, setData] = useState([]);
    const [cartQty, setCartQty] = useState();

    function fetchCartData(){
        axios.get("/api/user/viewcart")
            .then((response) => {
                const products = response.data.products;
                setData(products);
    
                // Calculate the total quantity of products in the cart
                const totalQuantity = products.reduce((total, product) => total + product.quantity, 0);
                setCartQty(totalQuantity);
            })
            .catch((error) => { 
                console.error("Error fetching cart data:", error); 
            });
    }
    

    useEffect(() => {
        fetchCartData();
        // Set up polling to fetch cart data every .5 seconds
        const intervalId = setInterval(fetchCartData, 300); // 500 milliseconds = .5 seconds
        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const navigate = useNavigate();

    function handleLogout() {
        axios.get('/api/logout')
            .then((result) => {
                if (result.data === "logoutsuccess") {
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
                        </a>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><Link to="" className="nav-link px-2 link-body-emphasis">Products</Link></li>
                            <li><Link to="orders" className="nav-link px-2 link-body-emphasis">My Orders</Link></li>
                            <li><Link to="cart" className="btn btn-warning">Cart<span className="badge  ms-1 text-bg-primary">{cartQty}</span></Link></li>
                        </ul>

                        <div className="dropdown text-end me-4">
                            <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="" alt="mdo" width="32" height="32" className="rounded-circle me-2" />
                                {props.name}
                            </a>
                            <ul className="dropdown-menu text-small" style={{}}>
                                {props.isLoggedIn ?
                                    (<li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>
                                    ) : (
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

export default UserHeader;