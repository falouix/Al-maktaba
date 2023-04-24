import react , {useState } from 'react';
import ProfilePic from './assets/ProfilePic.png';
import './header.css'
function HeaderProfile() {
    return(
        <>
            <header class="user-profile-header">
        <div class="avatar-container">
          <img class="avatar" src={ProfilePic} alt="Profile picture" />
        </div>
        <div class="profile-info">
          <h1 class="profile-name">Nom D'utilisateur</h1>
          <p class="profile-section">Specialité</p>
          <h2>Descriptions</h2>
          <p class="profile-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed enim eros. Aliquam erat volutpat. Morbi sodales risus sapien, non hendrerit magna iaculis id.</p>
          <div class="profile-links">
            <h2>Liens</h2>
            <a href="https://www.facebook.com">Facebook<i class="fab fa-facebook"></i></a>
            <a href="https://www.linkedin.com">Linkedin<i class="fab fa-linkedin"></i></a>
          </div>
        </div>
        <div class="nature-header">
          <h1>Nature</h1>
          <p class="profile-description">Etudiant</p>

          <button class="thm-btn"><span>Ajouter</span></button>
          <button class="thm-btn"><span>Contacter</span></button>
        </div>

    </header>
        </>
    )
}
export default HeaderProfile;