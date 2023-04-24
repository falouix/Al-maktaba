
import react , {useState } from 'react';
import axios from 'axios';
import eventcover from './assets/eventcover.jpg'
import './Event_item_Container.css'
function EventItemContainer(data) {
    return (
        <>
		<div class="Book-box-event">	
        <a href="#">
            <img src={eventcover} alt="random image" class="event_img"/>
        </a>
        <h3>{data.data.name_event}</h3>
            <h3 className='h3_event_item'>{data.data.name_event}</h3>
		</div>
        </>
    )
}
export default EventItemContainer;