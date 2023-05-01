
import react , {useState } from 'react';
import axios from 'axios';
import './club.css'
function SideBar() {

    return (
        <>
        <div id="login-container">
        
        <div className="profile-img"></div>

      <div className="profile-title">
          <a href="#">Nom D’utilisateur</a>
      </div>
        <h3>Années Universitaire</h3><br />
        <h2>Description</h2>
        <div className="description">
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour </div>
        <div className="social">
          <a href="event">Events</a>
          <a href="club"  className='active'>Clubs</a>
          <a href="forum">Forum</a>
          <a href="contact">Contacts</a>
          <a href="reglages">Réglages</a><br />
          <a href="about">A Propos</a>
        </div>
      </div>
      </>
    )
}
export default SideBar;