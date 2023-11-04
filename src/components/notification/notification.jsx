
import react , {useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import MixitLogo from './assets/MIXITLogo.png';
import UnderConst from './assets/under_construction.svg';
import SideBar from '../dashboard/SideBar';
import Navbar from '../navbar/Navbar';
import './notification.css';
function notification() {
    return(
        <>
        <div className="uc__wrapper">
        <div className="uc__details">
          <h1 className="title" />
          <h3 className="intro">
            MIX IT Agency<br />
            We are working hard to give you a better experience.
          </h3>
          <p className="uc__description">
            This Page is under Construction , Please Keep Waiting Until the job is Done ♥          </p>
          <img src={MixitLogo} />
        </div>
        <div className="uc__art">
          <img src={UnderConst} alt="" />
        </div>
      </div>
        </>
    )
}
export default notification;