import react , {useState } from 'react';
import { BsFacebook,BsLinkedin } from "react-icons/bs";
import 'react-tabs/style/react-tabs.css';
import Header from './header/Header'
import Feed from './Feed';
import FriendList from './FriendList'
import Navbar from '../navbar/Navbar';
import './main_profile.css'
function Profile() {
    return(
        <>
        <Navbar/>
            <div className='pofile_header'>
                <Header />
            </div>
            <div className='profileMainContainerr'>
                <div className='profileSideBar'>
                   
<div class="listinger22">
<a href="#">Clubs</a>
<ul class="Clublist22">
    <li><a href="#">Nom Du Club 1</a></li>
    <li><a href="#">Nom Du Club 2</a></li>
    <li><a href="#">Nom Du Club 3</a></li>
</ul>

<a href="#">Events</a>
<ul class="Clublist22">
    <li><a href="#">Nom De L'Event 1</a></li>
    <li><a href="#">Nom De L'Event 2</a></li>
    <li><a href="#">Nom De L'Event 3</a></li>

</ul>

<a href="#">Forum</a>
<ul class="Clublist22">
    <li><a href="#">Nom De Forum 1</a></li>
    <li><a href="#">Nom De Forum 2</a></li>
    <li><a href="#">Nom De Forum 3</a></li>

</ul>

</div>
                </div>
                <div className='profileMainContainer'>
                <div className='profileMainContainerFavorites'>
                    <h3><i class="fas fa-star"></i>Favoris</h3>
                    <hr/>
                </div>
                </div>
            </div>
        </>
    )
}
export default Profile;