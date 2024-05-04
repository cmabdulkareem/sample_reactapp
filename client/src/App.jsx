import React, {useState, useEffect} from 'react'
import Card from "./component/Card";
import AdminHeader from './component/Header/AdminHeader';
import UserHeader from './component/Header/UserHeader';
import axios from "axios";



function App() {
  
  const admin = true;

  return (
    <>
      {admin ?
      (<AdminHeader/>) : (<UserHeader/>)}
      (<Card/>)
    </>
  )
}

export default App
