import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



function UserPage(){

    const [name, setName] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get('http://localhost:3000/', {withCredentials : true})
            .then((result)=>{
                if(result.data.Valid){
                    setName(result.data.username)
                }else{
                    navigate('/login')
                }
            })
            .catch((error)=>{console.log(error)})
    },[])

    return(
        <div>
            <h1>Welcome {name}</h1>
        </div>
    )
}

export default UserPage;