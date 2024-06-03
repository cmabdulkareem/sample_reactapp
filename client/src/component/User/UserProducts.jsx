import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

function UserProducts() {

    const [data, setData] = useState([]);
    const [cartQty, setCartQty] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/api/admin/viewproducts")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => { console.error(error); });
    }, []);

    const handleAddToCart = (itemId) => {
        axios.get(`/api/getcart/${itemId}`)
        .then((response) => {
            setCartQty(response.data.cartItems);
        })
        .catch((error) => { console.error(error); });    
    };

    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-between" >
                    {data.length > 0 ? (
                        data.map((item, index) => (

                            <div className="col-md-2 mb-3" key={item._id}>
                                <div className="card">
                                    <img src={`http://localhost:3000/images/product-images/${item._id}.jpg?timestamp=${new Date().getTime()}`} className="card-img-top" alt="Card Image" style={{ minHeight: "200px" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.itemName}</h5>
                                        <p className="card-text" style={{ minHeight: "50px" }}>{item.itemDesc}</p>
                                        <p className="card-text">Price: ₹{item.itemPrice} </p>
                                        <button onClick={() => handleAddToCart(item._id)} className="btn btn-outline-danger">+ Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-md-2 mb-3">
                            <div className="card">
                                    <img src="http://surl.li/tzmuv" />
                                    <div className="card-body">
                                        <h5 className="card-title"></h5>
                                        <p className="card-text" style={{ minHeight: "50px" }}></p>
                                        <p className="card-text">Price: ₹ </p>
                                        <button onClick={() => handleAddToCart(item._id)} className="btn btn-outline-danger">+ Cart</button>
                                    </div>
                                </div>
                        </div>
                    )}
                </div>
            </div>

            <script src="/socket.io/socket.io.js"></script>
            <script>
                var socket = io()
            </script>
        </div>
    )
}

export default UserProducts;