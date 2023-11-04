
import react, { useState } from 'react';
import axios from 'axios';
import ProfilePicSujet from './assets/ProfilePic.png';
import ReponseSujet from './assets/replyicon.png';
import VueSujet from './assets/eyeicon.png';


import './Event_item_Container.css'
function EventItemContainer(data) {

    return (
        <div className="forum-card">
        <div className="avatar-container32">
          <img className="avatar32" src={ProfilePicSujet} alt="Profile picture" />
        </div>
        <div className="forum-content">
          <h1><a href>Nom Du Sujet</a></h1>
          <div className="info31"> 
            <img src={ReponseSujet} /><h2><span>10</span> Réponses</h2>
            <img src={VueSujet} /><h2><span>50</span> Vues</h2>
          </div>
          <h2>Ajouté par: <span>Utilisateur al maktaba</span></h2><br />
        </div>
        <div className="metadataforum">
          <h2>Ajouté il y'a</h2>
          <h3>23 minutes</h3>
          <h1>Etudiant</h1>
        </div>
      </div>
    )
}
export default EventItemContainer;