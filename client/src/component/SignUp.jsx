import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const userData = {
            name,
            email,
            password
        };
    
        axios.post("/api/register", userData)
            .then((result) => {
                console.log(result);
                navigate('/login');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <div className="container mt-5">
                <div className="col-6">
                    <h2>Signup Form</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                onChange={(e) => setName(e.target.value)}
                                name="username"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                name="email"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>

                    <Link to='/login' className="btn btn-secondary mt-3">Login</Link>
                </div>
            </div>
        </>
    );
}

export default SignUp;
