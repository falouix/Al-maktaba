
import react, { useState } from 'react';
import axios from 'axios';
import eventcover from './assets/eventcover.jpg'
import './Event_item_Container.css'
import Environment from '../../../environment';
function EventItemContainer(data) {
    return (
        <>
            <div className="Book-box-event">
                <div className='Book-box-event-header'>

                    <a href="#">
                        <img src={data && data.file_dir ? Environment.api_url + data.file_dir : null} alt="random image" className="event_img" />

                    </a>
                </div>
                <h3 className='Book-box-event-h3'>{data.data.name_event}</h3>
                <h3 className='h3_event_item'>{data.name_event}</h3>
            </div>
            {JSON.parse(localStorage.getItem('user')).type == "admin"
                && <button className="thm-btn" ><span>Edit</span></button>}
            {JSON.parse(localStorage.getItem('user')).type == "admin"
                && <button className="thm-btn" ><span>Supprimer</span></button>}
        </>
    )
}
export default EventItemContainer;