import {Link} from 'react-router-dom'

function AdminHeader() {

    return (
        <div className="container">
            <header className="d-flex justify-content-center py-3">
                <ul className="nav nav-pills">
                    <li className="nav-item"><Link to="/" className="nav-link active" aria-current="page">Admin</Link></li>
                    <li className="nav-item"><Link to="/view_product" className="nav-link">Products</Link></li>
                    <li className="nav-item"><Link to="/register" className="nav-link">Register</Link></li>
                    <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
                </ul>
            </header>
        </div>
    )
}

export default AdminHeader;