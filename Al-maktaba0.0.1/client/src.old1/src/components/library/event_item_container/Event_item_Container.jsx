
import react , {useState } from 'react';
import axios from 'axios';
import filecover from './assets/filecover.jpg'
import './Event_item_Container.css'
function EventItemContainer(data) {
  console.log(data.data)
    return (
        <>
		<div class="Book-box-event">	
        <a href="#">
            <img src={filecover} alt="random image" class="event_img"/>
        </a>
            <h2 className='h2_event_item'>{data.data.name}</h2>
            <h3 className='h3_event_item'>Nom enseignant</h3>
		</div>
        </>
    )
}
export default EventItemContainer;