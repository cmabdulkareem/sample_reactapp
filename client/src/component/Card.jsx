import React, { useState, useEffect } from "react";
import axios from "axios";

function Card() {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("/api/data")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => { error })
    },[])

    return (
        <div className="container mt-4">
            <div className="row">
                {data.length > 0 ? (             //{data.length>0? (if true block): (if false block)}
                    data.map((item, index)=>(
                <div key={item.id} className="col-md-3 mb-3">
                    <div className="card">
                        <img src={`http://localhost:3000/images/${item.id}.jpg`} className="card-img-top" alt="" />
                        <div className="card-body">
                            <h5 className="card-title">Name : {item.name} </h5>
                            <p className="card-text">Age: {item.age} </p>
                            <p className="card-text">Education: {item.education} </p>
                            <button className="btn btn-primary">Add student</button>
                        </div>
                    </div>
                </div>
                ))
                ):(
                <div className="col-12">
                    <p>Loading...</p>
                </div>
                )}
            </div>
        </div>
    )
}

export default Card;