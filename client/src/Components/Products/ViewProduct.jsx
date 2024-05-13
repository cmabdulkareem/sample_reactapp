import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


function ViewProduct() {

    const [data, setData] = useState([])


    axios.get('/api/view_product')
        .then((response) => {
            setData(response.data)
        })
        .catch((error) => {
            console.log(error)
        })


    const navigate = useNavigate()

    const handleDelete = (itemId) => {
        axios.delete(`/api/delete-product/${itemId}`)
            .then((response) => {
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleEdit = (itemId) => {
        navigate(`/edit_product/${itemId}`);
    }
    



    return (
        <>
            <div className="container">
                <h2>View Products</h2>
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
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.desc}</td>
                                    <td>{item.price}</td>
                                    <td><img src={`http://localhost:3000/images/product-images/${item._id}.jpg`} style={{ maxWidth: "50px" }} /></td>
                                    <td>
                                        <button onClick={() => handleEdit(item._id)} className="btn btn-outline-warning">Edit</button>
                                        <button onClick={() => handleDelete(item._id)} className="btn btn-outline-danger">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td></td>
                                <td>Loading data..</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
                <Link to="/add_product" className="btn btn-success" >Add Product</Link>
            </div>
        </>
    )
}

export default ViewProduct;