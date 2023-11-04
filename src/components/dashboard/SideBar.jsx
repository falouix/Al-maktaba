
import react, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css'
function SideBar() {
  const [current_user, setcurrent_user] = useState()
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('user'))
    if (items) {
      setcurrent_user(JSON.parse(localStorage.getItem('user')))
      console.log('current_user', current_user)
    }
  }, [])
  return (
    <>
      <div id="login-container">

        <div className="profile-img"></div>

        <div className="profile-title">
          <a href="/profile">{JSON.parse(localStorage.getItem('user')).login_student}</a>
          <h3 className='admin_title_holder'>{JSON.parse(localStorage.getItem('user')).type}</h3>
          <h3>{JSON.parse(localStorage.getItem('user')).level_student}</h3>
          <h3>{JSON.parse(localStorage.getItem('user')).speciality_student}</h3>
        </div>
        <div className="social">
          <a href="/event">Events</a>
          <a href="/club">Clubs</a>
          <a href="/forum">Forum</a>
          <a href="/contact">Contacts</a>
          <a href="/about" className='lastOne'>A Propos</a>
        </div>
      </div>
    </>
  )
}
export default SideBar;