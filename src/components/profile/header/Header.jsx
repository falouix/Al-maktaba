import react , {useState } from 'react';
import ProfilePic from './assets/ProfilePic.png';
import './header.css'
import { BiLogOut } from 'react-icons/bi';
import { BrowserRouter,useNavigate, Routes, Route , Navigate } from "react-router-dom"
function HeaderProfile() {
  const navigate = useNavigate();
  const logOut = ()=>{
    localStorage.clear();
    

    navigate('/');
  }
    return(
        <>
            <header className="user-profile-header26">
        <div className='info_img_container'>
          
        <div className="avatar-container26">
          <img className="avatar26" src={ProfilePic} alt="Profile picture" />
        </div>
        <div className="profile-info26">
          <h1 className="profile-name26">{JSON.parse(localStorage.getItem('user')).login_student}</h1>
          <div className="profile-infos-name26">
            <h5>{JSON.parse(localStorage.getItem('user')).level_student}</h5>
            <h5>{JSON.parse(localStorage.getItem('user')).speciality_student}</h5>
            <h5>{JSON.parse(localStorage.getItem('user')).type_user}</h5>
          </div>
           
        </div>
        </div>
        
          
        <div className="profile-links26">
            <a href="https://www.facebook.com"><i className="fab fa-facebook"></i>Facebook</a>
            <a href="https://www.linkedin.com"><i className="fab fa-linkedin"></i>Linkedin</a>
          </div>
        <div className="nature-header26">
          <button className="thm-btn26"><span>Contacter</span></button>
        </div>
        <div className="nature-header26">
          <button className="thm-btn26" onClick={(event)=>{
              logOut()
          }}><span>Déconnexion </span></button>
        </div>
    </header>
        </>
    )
}
export default HeaderProfile;