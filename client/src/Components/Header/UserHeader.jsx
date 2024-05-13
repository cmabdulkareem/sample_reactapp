

function UserHeader() {

    return (
        <div className="container">
            <header className="d-flex justify-content-center py-3">
                <ul className="nav nav-pills">
                    <li className="nav-item"><a href="#" className="nav-link active" aria-current="page">User</a></li>
                    <li className="nav-item"><a href="#" className="nav-link">Products</a></li>
                    <li className="nav-item"><a href="#" className="nav-link">Cart</a></li>
                    <li className="nav-item"><a href="#" className="nav-link">My Order</a></li>
                </ul>
            </header>
        </div>
    )
}

export default UserHeader;