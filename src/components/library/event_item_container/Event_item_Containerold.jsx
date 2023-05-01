
import react , {useState } from 'react';
import axios from 'axios';
import bookcoverpdf from './assets/bookcoverpdf.jpg'
import './Event_item_Container.css'
function EventItemContainer(data) {
    console.log(data)
    return (
        <>
		<div className="Book-box-event">	
        <a href="#">
          <img src={bookcoverpdf} className="Book-box-img"/>
        </a>
            <h2 className='h2_event_item'>{data.data.name_file}</h2>
            <h3 className='h3_event_item'>{data.data.nom_teacher}</h3>
		</div>
        {JSON.parse(localStorage.getItem('user')).type=="admin"
         &&<button className="thm-btn" ><span>Edit</span></button>}
         {JSON.parse(localStorage.getItem('user')).type=="admin"
         &&<button className="thm-btn" ><span>Supprimer</span></button>}
        </>
    )
}
export default EventItemContainer;