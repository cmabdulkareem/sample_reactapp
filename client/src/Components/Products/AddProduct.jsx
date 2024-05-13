import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

function AddProduct() {

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');

    function handleSubmit(e){
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('desc', desc);
        formData.append('price', price);
        formData.append('image', image);
        
        axios.post("/api/add_product", formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((result)=>{
            console.log(result);
            resetForm();
        });
    }

    function resetForm() {
        setName('');
        setDesc('');
        setPrice('');
        setImage('');
    }

    return (
        <>
            <div className="container">
                <h2>Add Product</h2>
                <div className="col-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="itemName">Item Name</label>
                            <input type="text" className="form-control" name="name" placeholder="Enter item name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="itemDescription">Item Description</label>
                            <textarea className="form-control" rows="3" name="desc" placeholder="Enter item description" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input type="number" className="form-control" name="price" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className="form-group mt-4">
                            <label htmlFor="image">Image</label>
                            <input type="file" className="form-control" name="image" onChange={(e) => setImage(e.target.files[0])} />
                        </div>
                        <div className="mt-4">
                            <button type="submit" className="btn btn-success">Submit</button>
                            <button type="button" className="btn btn-danger ms-2" onClick={resetForm}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddProduct;
