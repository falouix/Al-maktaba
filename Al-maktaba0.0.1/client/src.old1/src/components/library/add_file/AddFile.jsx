import React , {useState } from 'react';
import axios from 'axios';
import ProfilePic from '../../../assets/dashboard_assets/ProfilePic.png';
import { BiShare } from "react-icons/bi";
import Modal from 'react-modal';

function AddFile(){
  
    return(
        <>
        <div className='addnew_container'>
        <h1>Créer Un Nouveau cours</h1>
        <label>Choisir Fichier *</label>
        <input type="file" />
        <label>Choisir le Niveau Universitaire *</label>
            <select>
                <option>level 1</option>
                <option>level 2</option>
                <option>level 3</option>
            </select>
            <label>Choisir Matière Spécifiée</label>
            <select>
                <option>Informatique</option>
                <option>Math</option>
                <option>Getsion</option>
            </select>
        <label>Nom Du Cours *</label>
        <input type="text" />
        <label>Description*</label>
        <textarea type="text"  rows="6"/>
        <button className="thm-btn margin_top_5"><span>Demander</span></button>

        </div>
        </>
    );
}

export default AddFile;