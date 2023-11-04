import react, { useState, useEffect } from 'react';
import axios from 'axios';
import Environment from '../../environment';
import SideBar from '../dashboard/SideBar';
import Navbar from '../navbar/Navbar';
import Event_item_Container from './event_item_container/Event_item_Container';
import AddNew from '../status/addNew/AddNew';
import { BiSearchAlt } from "react-icons/bi";
import Modal from 'react-modal';
import Cover_banner from '../../assets/dashboard_assets/events_assets/Cover_banner.png'
import AddEvent from './add_event/AddEvent';
import './profile.css'
function Event_item_modal(data) {
  console.log('data data', data.data)
  return (
    <>
      <div className='modal_header_event'>
        <img
          src={"https://www.apialmaktaba.inspira-jendouba.org/" + data.data.file_dir} />
      </div>
      <div className='modal_body_event'>
        <h2>{data.data.name_event}</h2>
        <h5><span>De </span>{data.data.date_start} <span>Jusqu'à</span> {data.data.date_end}</h5>
        <h4>description</h4>
        <p>
          {data.data.description_event}
        </p>
        <div className="modal_footer_event">
          <p><span>Réalisé Par : </span>Nom Du Club</p>
        </div>

        <div className='modal_footer_event_btn_container'>

          <a
            href={data.data.event_link}
            className="thm-btn margin_top_5">
            <span>Participer</span>
          </a>
        </div>
      </div> </>)
}
export default Event_item_modal;