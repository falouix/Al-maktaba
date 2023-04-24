import React , {useState } from 'react';
import axios from 'axios';
import ProfilePic from '../../../assets/dashboard_assets/ProfilePic.png';
import { BiShare } from "react-icons/bi";
import Modal from 'react-modal';

function AddEvent(eventToCreate){
    return(
        <>
        <div className='addnew_container'>
        <h1>Créer Un Évènement</h1>
        <label>Nom D'Événement</label>
        <input type="text" onChange={(e)=>{
                                eventToCreate.eventToCreate.handleChangenameEvent(e);
                              }}/>
        <label>Description</label>
        <textarea type="text" rows="6"
                            onChange={(e)=>{
                              eventToCreate.eventToCreate.handleChangeDescriptionEvent(e);
                              }}/>
        <label>Choisir La Date de Votre Évènement</label>
        <input type="date" onChange={(e)=>{
                                eventToCreate.eventToCreate.handleChangeDateStartEvent(e);
                              }}/>
        <input type="date" onChange={(e)=>{
                                eventToCreate.eventToCreate.handleChangeDateEndtEvent(e);
                              }}/>
        <button class="thm-btn margin_top_5" onClick={(e)=> eventToCreate.eventToCreate.createEnvent(e)}><span>Créer</span></button>

        </div>
        </>
    );
}

export default AddEvent;