
import react, { useState } from 'react';
import axios from 'axios';
import bookcoverpdf from './assets/bookcoverpdf.jpg'
import './Event_item_Container.css'
function EventItemContainer(data) {

    return (
        <div>
            <div className="Book-box-event" onClick={() => data.openModal(data.data)}>
                <a href="#">
                    <img src={bookcoverpdf} className="Book-box-img" />
                </a>
                <h2 className='h2_event_item'>{data.data.name_file}</h2>
                <h3 className='h3_event_item'>{data.data.nom_teacher}</h3>
            </div>
            {JSON.parse(localStorage.getItem('user')).type == "admin"
                && <div className='admin_buttons_container'>
                    <button className="thm-btn" onClick={() => data.openModal(data.data, 'edit')}>
                        <span>Edit</span>
                    </button>
                    <button className="thm-btn" onClick={() => data.deleteFile(data.data.id_file)}>
                        <span>Supprimer</span>
                    </button>
                </div>
            }
        </div>
    )
}
export default EventItemContainer;