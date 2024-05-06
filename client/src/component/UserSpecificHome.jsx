import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function UserSpecificPage(){

    const [name, setName] = useState("")
     const navigate = useNavigate()


    useEffect(() => {
        axios.get('sample-reactapp.vercel.app', { withCredentials: true })
            .then((result) => {
                if(result.data.Valid){
                    setName(result.data.username)
                }else{
                    navigate('/login')
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }, [])

    return(
        <div>
            <h1>Welcome {name}</h1>
        </div>
    )
}

export default UserSpecificPage;