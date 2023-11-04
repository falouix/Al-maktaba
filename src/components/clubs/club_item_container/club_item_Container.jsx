
import react, { useState } from 'react';
import axios from 'axios';

import Environment from '../../../environment';
import './club_item_Container.css'
function Club_item_Container(data) {
    console.log(data)
    return (
        <>
            <div className="Book-box-club">
                <div>
                </div>
                <a href="#">
                    <img
                        src={Environment.api_url + data.data.logo_dir}
                        alt="random image"
                        className="club_img logo_clob_img" />
                    <h2 className='h2_event_item'>{data.data.name_club}</h2>
                    <div className="count_container">
                        {data.data.description_club}
                    </div>
                    {data.data.active_club != "0" && <button className="thm-btn thm-btn-club margin_top_5" ><span>Découvrir</span></button>}
                    {data.data.active_club == "0" && <button className="thm-btn thm-btn-club margin_top_5" ><span>En attente d'accptation</span></button>}
                </a>
            </div>
            {JSON.parse(localStorage.getItem('user')).type == "admin"
                && <button className="thm-btn" ><span>Edit</span></button>}
            {JSON.parse(localStorage.getItem('user')).type == "admin"
                && <button className="thm-btn" ><span>Supprimer</span></button>}
        </>
    )
}
export default Club_item_Container;