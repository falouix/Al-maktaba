import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import About from './components/about/About'
import Navbar from './components/navbar/Navbar';
import Dashboard  from './components/dashboard/Dashboard';
import Event  from './components/event/Event';
import Club  from './components/clubs/Clubs';
import Clubdetails  from './components/clubs/Clubdetails';

import LoginAdmin from './components/login_admin/LoginAdmin'
import Library from './components/library/Library';
import Contact from './components/contact/contact';
import Profile from './components/profile/Profile'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,useHistory, Routes, Route , Navigate } from "react-router-dom"
const root = ReactDOM.createRoot(document.getElementById('root'));
const user= localStorage.getItem('user')
console.log('useruser',user)
root.render(
  <React.StrictMode>
  
  
       <BrowserRouter>
      <Routes>
          <Route index element={<App />} />
          <Route path="LoginAdmin" element={<LoginAdmin />} />
          <Route path="dashboard" element={user == undefined ? <Navigate to="/" /> : <Dashboard />} />
          <Route path="event" element={user == undefined ? <Navigate to="/" /> : <Event />} />
          <Route path="Club" element={user == undefined ? <Navigate to="/" /> : <Club />} />
          <Route path="Club/:id" element={user == undefined ? <Navigate to="/" /> : <Clubdetails />} />
          <Route path="about" element={user == undefined ? <Navigate to="/" /> : <About />} />
          <Route path="bibliotheque" element={user == undefined ? <Navigate to="/" /> : <Library />} />
          <Route path="profile" element={user == undefined ? <Navigate to="/" /> : <Profile />} />
          <Route path="contact" element={user == undefined ? <Navigate to="/" /> : <Contact />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
