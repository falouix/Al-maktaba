import react , {useState } from 'react';
import ProfilePic from './assets/ProfilePic.png';
import './header.css'
function HeaderProfile() {
    return(
        <>
            <header class="user-profile-header26">
        <div className='info_img_container'>
          
        <div class="avatar-container26">
          <img class="avatar26" src={ProfilePic} alt="Profile picture" />
        </div>
        <div class="profile-info26">
          <h1 class="profile-name26">{JSON.parse(localStorage.getItem('user')).login_student}</h1>
          <div class="profile-infos-name26">
            <h5>{JSON.parse(localStorage.getItem('user')).level_student}</h5>
            <h5>{JSON.parse(localStorage.getItem('user')).speciality_student}</h5>
            <h5>{JSON.parse(localStorage.getItem('user')).type_user}</h5>
          </div>
           
        </div>
        </div>
        
          
        <div class="profile-links26">
            <a href="https://www.facebook.com"><i class="fab fa-facebook"></i>Facebook</a>
            <a href="https://www.linkedin.com"><i class="fab fa-linkedin"></i>Linkedin</a>
          </div>
        <div class="nature-header26">
          <button class="thm-btn26"><span>Contacter</span></button>
        </div>

    </header>
        </>
    )
}
export default HeaderProfile;