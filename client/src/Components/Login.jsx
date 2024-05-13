import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Login() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const navigate = useNavigate()

    useEffect(()=>{
        axios.get('http://localhost:3000/', {withCredentials : true})
        .then((result)=>{
            if(result.data.Valid){
                navigate('/user')
            }else{
                navigate('/login')
            }
        })
    },[])


    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/login', { email, password })
            .then((result) => {
                console.log(result)
                if (result.data.Login){
                    navigate('/user')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit} className='col-6'>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
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
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-2">Login</button>
            </form>
            <Link to={'/register'} className="btn btn-secondary mt-2">Register</Link>
        </div>
    )
}

export default Login;