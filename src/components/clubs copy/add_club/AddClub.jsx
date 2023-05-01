import React , {useState } from 'react';
import axios from 'axios';
import ProfilePic from '../../../assets/dashboard_assets/ProfilePic.png';
import { BiShare } from "react-icons/bi";
import Modal from 'react-modal';

function AddEvent(){
  
    return(
        <>
        <div className='addnew_container'>
            <label>Nom du club</label>
            <input type="text"/>
            <label>Description</label>
            <textarea type="text" rows="6"/>
            <label>Logo</label>
            <input type="file"/>
            <label>Banniér</label>
            <input type="file"/>
            <button className="thm-btn margin_top_5"><span>Créer</span></button>
        </div>
        </>
    );
}

export default AddEvent;