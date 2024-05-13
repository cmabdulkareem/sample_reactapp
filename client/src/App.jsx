import { useState } from 'react'
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminHeader from './Components/Header/AdminHeader'
import UserHeader from './Components/Header/UserHeader'
import UserPage from './Components/UserPage'
import ViewProduct from './Components/Products/ViewProduct'
import AddProduct from './Components/Products/AddProduct'
import EditProduct from './Components/Products/EditProduct'
import DeleteProduct from './Components/Products/DeleteProduct'




function App() {

  const admin = true;

  return (
    <BrowserRouter>
      {admin ? (<AdminHeader />) : (<UserHeader />)}
      <Routes>
        <Route path='/' element={<div className="container"><h2>Welcome home</h2></div>}></Route>
        <Route path='/register' element={<SignUp />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/user' element={<UserPage />}></Route>
        <Route path='/view_product' element={<ViewProduct />}></Route>
        <Route path='/add_product' element={<AddProduct />}></Route>
        <Route path='/edit_product/:itemId' element={<EditProduct />} />
        <Route path='/delete_product' element={<DeleteProduct />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App