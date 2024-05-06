import React, {useState, useEffect} from 'react'
import Card from "./component/Card";
import AdminHeader from './component/Header/AdminHeader';
import UserHeader from './component/Header/UserHeader';
import SignUp from './component/SignUp';
import UserSpecificPage from './component/UserSpecificHome';
import axios from "axios";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './component/Login';



function App() {
  
  const admin = true;

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<SignUp/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/' element={<UserSpecificPage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
