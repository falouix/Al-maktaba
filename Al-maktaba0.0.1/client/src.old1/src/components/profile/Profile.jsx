import react , {useState } from 'react';
import { BsFacebook,BsLinkedin } from "react-icons/bs";
import 'react-tabs/style/react-tabs.css';
import Header from './header/Header'
import Feed from './Feed';
import FriendList from './FriendList'
function Profile() {
    return(
        <>
            <div className='pofile_header'>
                <Header />
            </div>
            <div>
                <div className='profileSideBar'>

                </div>
                <div className='profileMainContainer'>
                </div>
            </div>
        </>
    )
}
export default Profile;