import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

function SignUp() {

    const [password, setPassword] = useState()
    const [email, setEmail] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/api/', { withCredentials: true })
            .then((result) => {
                if(result.data.Valid){
                    navigate('/')
                }else{
                    navigate('/login')
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }, [])

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post("/api/login", {email, password})
            .then((result)=>{
                if(result.data.Login){
                    navigate('/')
                }
            })
            .catch((error)=>{
                console.log(error)
            })
    }


    return (
        <>
            <div className="container mt-5">
                <div className="col-6">
                    <h2>Login Form</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" 
                                className="form-control"
                                onChange={(e) => setEmail(e.target.value)}  
                                id="email" 
                                name="email" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" 
                                className="form-control" 
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}  
                                name="password" required />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                    <Link to='/register' className="btn btn-secondary mt-3">Register</Link>
                </div>
            </div>
        </>
    )
}

export default SignUp;