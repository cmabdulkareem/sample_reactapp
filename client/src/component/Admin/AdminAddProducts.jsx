import React, {useEffect, useState} from "react";
import axios from "axios";

function AdminAddProducts() {

    const [itemName, setItemName] = useState("")
    const [itemDesc, setItemDesc] = useState("")
    const [itemPrice, setItemPrice] = useState("")
    const [itemImage, setItemImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('itemName', itemName);
        formData.append('itemDesc', itemDesc);
        formData.append('itemPrice', itemPrice);
        formData.append('itemImage', itemImage);
    
        axios.post("/api/admin/products", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((result) => {
            console.log(result);
            setItemName("")
            setItemDesc("")
            setItemPrice("")
            setItemImage(null);
            document.getElementById("formFile").value = "";
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="col-6 mt-4">

            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Item Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="itemName"
                        value={itemName}
                        placeholder="Enter item name" 
                        onChange={(e) => setItemName(e.target.value)} />
                </div>
                <div className="form-group mt-4">
                    <label>Item Description</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="itemDesc"
                        value={itemDesc}
                        placeholder="Enter item description" 
                        onChange={(e) => setItemDesc(e.target.value)} />
                </div>
                <div className="form-group mt-4">
                    <label>Price</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="itemPrice"
                        value={itemPrice}
                        placeholder="Enter price"
                        onChange={(e) => setItemPrice(e.target.value)} />
                </div>
                <div className="mb-3  mt-4">
                    <label className="form-label">Default file input example</label>
                    <input 
                        className="form-control" 
                        type="file" 
                        name="itemImage"
                        onChange={(e) => setItemImage(e.target.files[0])}
                        id="formFile" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>

    )
}

export default AdminAddProducts;