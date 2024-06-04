import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

function UserProducts() {

    const [data, setData] = useState([]);
    const [cartQty, setCartQty] = useState();
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [sortOption, setSortOption] = useState("");
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

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearch(query);
        if (query.length > 0) {
            const results = data.filter(item =>
                item.itemName.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 5);
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const sortData = (dataToSort) => {
        return dataToSort.sort((a, b) => {
            if (sortOption === "priceLowToHigh") {
                return a.itemPrice - b.itemPrice;
            } else if (sortOption === "priceHighToLow") {
                return b.itemPrice - a.itemPrice;
            } else {
                return 0;
            }
        });
    };

    const sortedData = sortData([...data]);

    const filteredData = sortData(data.filter(item =>
        item.itemName.toLowerCase().includes(search.toLowerCase())
    ));

    const displayedData = search ? filteredData : sortedData;

    return (
        <div>

            <div className="row mb-4">
                <div className="col-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search for products..."
                        value={search}
                        onChange={handleSearchChange}
                    />
                    {searchResults.length > 0 && (
                        <ul className="list-group mt-2">
                            {searchResults.map(item => (
                                <li className="list-group-item" key={item._id}>
                                    {item.itemName}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>


                <div className="col-3 mb-4">
                    <select className="form-select" value={sortOption} onChange={handleSortChange}>
                        <option value="">Sort by</option>
                        <option value="priceLowToHigh">Price: Low to High</option>
                        <option value="priceHighToLow">Price: High to Low</option>
                    </select>
                </div>

                <h3>{search ? "Search Results:" : "All Products:"}</h3>
                <div className="row justify-content-between">
                    {displayedData.length > 0 ? (
                        displayedData.map((item, index) => (
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
                        <div className="col-md-12 mb-3">
                            <p>No products available.</p>
                        </div>
                    )}
                </div>
            </div>

            <script src="/socket.io/socket.io.js"></script>
            <script>
                var socket = io()
            </script>
        </div>
    );
}

export default UserProducts;
