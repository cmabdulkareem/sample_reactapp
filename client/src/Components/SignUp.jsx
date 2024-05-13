import axios from 'axios'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'


function SignUp() {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:3000/register', {name, email, password})
            .then((result)=>{
                console.log(result)
                navigate('/login')
            })
            .catch((error)=>{
                console.log(error)
            })
    }


    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit} className='col-6'>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        placeholder="Enter username"
                        onChange={(e)=> setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-2">Sign Up</button>
            </form>
                <Link to={'/login'} className="btn btn-secondary mt-2">Login</Link>
        </div>
    )
}

export default SignUp;