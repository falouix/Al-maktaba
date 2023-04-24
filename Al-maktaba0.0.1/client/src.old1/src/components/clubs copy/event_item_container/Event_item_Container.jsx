
import react , {useState } from 'react';
import axios from 'axios';
import eventcover from './assets/eventcover.jpg'
import './Event_item_Container.css'
function EventItemContainer(data) {
  console.log(data.data)
    return (
        <>
		<div class="Book-box-event">	
        <a href="#">
            <img src={eventcover} alt="random image" class="event_img"/>
        </a>
            <h2 className='h2_event_item'>{data.data.name}</h2>
            <h3 className='h3_event_item'>Active</h3>
		</div>
        </>
    )
}
export default EventItemContainer;