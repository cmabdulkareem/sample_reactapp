import { Routes } from "react-router-dom";
import UserCart from "./User/UserCart";
import UserProducts from "./User/UserProducts";
import UserOrder from "./User/UserOrder";
import AdminProducts from "./Admin/AdminProducts";
import AdminOrders from "./Admin/AdminOrders";
import { Route } from "react-router-dom";
import AdminSettings from "./Admin/AdminSettings";
import AdminAddProducts from "./Admin/AdminAddProducts";
import AdminEditProducts from "./Admin/AdminEditProducts";

function Body(props) {
    
    return (
        <div className="container">
            {props.isAdmin ? (<Routes>
                <Route path='/' element={<AdminProducts />} />
                <Route path='/orders' element={<AdminOrders />} />
                <Route path='/settings' element={<AdminSettings />} />
                <Route path='/addproducts' element={<AdminAddProducts />} />
                <Route path='/editproducts/:id' element={<AdminEditProducts />} />
            </Routes>):(<Routes>
                <Route path='/' element={<UserProducts />} />
                <Route path='/cart' element={<UserCart />} />
                <Route path='/orders' element={<UserOrder />} />
            </Routes>)}
        </div>
    )
}

export default Body;