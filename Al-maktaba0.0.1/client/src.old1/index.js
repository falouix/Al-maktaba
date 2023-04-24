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
import { BrowserRouter, Routes, Route } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
       <BrowserRouter>
      <Routes>
          <Route index element={<App />} />
          <Route path="LoginAdmin" element={<LoginAdmin />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="event" element={<Event />} />
          <Route path="Club" element={<Club />} />
          <Route path="Club/:id" element={<Clubdetails />} />
          <Route path="about" element={<About />} />
          <Route path="bibliotheque" element={<Library />} />
          <Route path="profile" element={<Profile />} />
          <Route path="contact" element={<Contact />} />
          
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
