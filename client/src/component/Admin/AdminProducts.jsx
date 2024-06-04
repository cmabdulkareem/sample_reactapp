import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

function AdminProducts() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/api/admin/viewproducts")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => { console.error(error); });
    }, []);

    const handleDelete = (itemId) => {
        axios.delete(`/api/deleteproduct/${itemId}`)
            .then((response) => {
                // Filter out the deleted item from the data array
                const newData = data.filter(item => item._id !== itemId);
                setData(newData);
            })
            .catch((error) => { console.error(error); });
    };

    return (
        <div className="container">
            <h2>Products</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Item Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Image</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={item._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.itemName}</td>
                                <td>{item.itemDesc}</td>
                                <td>{item.itemPrice}</td>
                                <td><img src={`http://localhost:3000/images/product-images/${item._id}.jpg?timestamp=${new Date().getTime()}`} style={{ maxWidth: "50px" }} alt={item.itemName} /></td>
                                <td>
                                    <Link to={`/editproducts/${item._id}`} className="btn btn-outline-primary me-2">Edit</Link>
                                    <button onClick={() => handleDelete(item._id)} className="btn btn-outline-danger">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Link to="/addproducts" className="btn btn-success">Add Product</Link>
        </div>
    );
}

export default AdminProducts;
