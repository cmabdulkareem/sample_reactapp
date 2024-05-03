import React, {useEffect, useState} from "react"
import axios from 'axios'
import Card from "./components/Card"

function App() {
  const [data, setData] = useState([]);

  useEffect(()=>{
    axios.get('/api/')
      .then((response)=>{
        setData(response.data)
      })
      .catch((error)=>{console.log(error)})
  },[])

  return (
    <div>
      <Card/> 
    </div>
  );
  
}

export default App
