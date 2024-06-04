import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignUp from './component/SignUp';
import Header from './component/Header';
import Body from './component/Body';
import Footer from './component/Footer';
import Login from './component/Login';

function App() {
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/', { withCredentials: true })
      .then((result) => {
        if (result.data.Valid) {
          setName(result.data.username);
          setIsAdmin(result.data.isAdmin);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoggedIn(false);
      });
  }, [navigate]);

  return (
    <Routes>
      <Route path='/register' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      {isLoggedIn ? (
          <Route path='/*' element={
            <div>
              <Header name={name} isAdmin={isAdmin} isLoggedIn={isLoggedIn}/>
              <Body name={name} isAdmin={isAdmin} isLoggedIn={isLoggedIn} />
              <Footer name={name} isAdmin={isAdmin} isLoggedIn={isLoggedIn} />
            </div>
          }>
          </Route>
      ) : (
        <Route path='/' element={<Login />} />
      )}
    </Routes>
  );
}

export default App;
