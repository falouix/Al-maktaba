
import react , {useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import LogoYoutheonVF from './assets/LogoYoutheonVF.png';
import Navbar from '../navbar/Navbar';
import LOGOS from './assets/LOGOSSS.jpg'
import './contact.css';
function contact() {
    return(
        <>
        <Navbar />
        <div className='Dashboard_container'>
            <div className='dashboard_main'>
   <div className= "heading29"></div>
   <div className= "heading29 margin_bottom_50">
    <h1>CONTACT</h1>
        <div className="contact-box29">
            <h2>Envoyer Nous Un Message</h2>
            <input type="text" className="field29" placeholder="Nom" />
            <input type="text" className="field29" placeholder="Adresse E-mail" />
            <input type="text" className="field29" placeholder="Numéro Telephone" />
            <textarea placeholder="Message" className="field29"></textarea>
            <button className="thm-btn29 custom_adds_btn"><span>Envoyer</span></button> 
        </div>
    </div>
    </div>
    </div>
        </>
    )
}
export default contact;