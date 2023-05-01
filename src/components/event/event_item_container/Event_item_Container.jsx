
import react , {useState } from 'react';
import axios from 'axios';
import eventcover from './assets/eventcover.jpg'
import './Event_item_Container.css'
function EventItemContainer(data) {
    return (
        <>
		<div className="Book-box-event">	
        <a href="#">
            <img src={"https://www.apialmaktaba.inspira-jendouba.org/almaktaba_api/"+data.data.file_dir} alt="random image" className="event_img"/>
        </a>
        <h3 className='Book-box-event-h3'>{data.data.name_event}</h3>
            <h3 className='h3_event_item'>{data.data.name_event}</h3>
		</div>
        {JSON.parse(localStorage.getItem('user')).type=="admin"
         &&<button className="thm-btn" ><span>Edit</span></button>}
         {JSON.parse(localStorage.getItem('user')).type=="admin"
         &&<button className="thm-btn" ><span>Supprimer</span></button>}
        </>
    )
}
export default EventItemContainer;