import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
//Importing bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
//Importing bootstrap JavaScript bundle
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
