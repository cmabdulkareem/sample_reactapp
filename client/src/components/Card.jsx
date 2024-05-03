import React, { useEffect, useState } from "react";
import axios from 'axios';

function Card() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/')
      .then((response) => {
        setData(response.data); // Assuming the API returns an array of data
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="col-sm-12 col-md-6 col-lg-3 mb-4">
              <div className="card">
                <img src={`http://localhost:3000/images/${item.id}.jpg`} className="card-img-top" alt="Card Image"/>
                  <div className="card-body">
                    <h5 className="card-title">Name : {item.name}</h5>
                    <p className="card-text">Age : {item.age}</p>
                    <p className="card-text">Education : {item.education}</p>
                    <button className="btn btn-primary">Select</button>
                  </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>Loading data...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
