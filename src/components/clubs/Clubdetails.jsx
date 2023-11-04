
import react, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../dashboard/SideBar';
import Navbar from '../navbar/Navbar';
import Modal from 'react-modal';

import Environment from '../../environment';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import './club.css'
const customStyles = {
  content: {
    width: '400px',
    heigth: '100hv',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '10px',
    background: '#ededed',
    borderRadius: '10px',
    border: '1px solid red'
  },
};

Modal.setAppElement('#root');
function Clubdetails() {
  let d = new Date()
  let userId = useParams();
  const [club, setClub] = useState({})
  const [counter, setCounter] = useState(0)
  function acceptClub() {
    axios.post(`${Environment.api_url}clubs.php?${d}`,
      {
        action: 'acceptclub',
        id_club: userId.id,
      })
      .then(function (res) {
        console.log(res)
        setCounter(counter + 1)
      }).catch(function (error) {
        console.log(error);
      });
  }
  async function getClub(id) {
    let item =
      await axios.get(`${Environment.api_url}clubs.php?${d}&action=getclub&id=` + id)
        .then(function (res) {
          let item;
          console.log("res.data", res.data.clubs[0])
          setClub(res.data.clubs[0])
          return (item)
        }).catch(function (error) {
          console.log(error);
        });
    return item
  }
  useEffect(() => {
    getClub(userId.id)
  }, [counter]);

  return (
    <>
      <Navbar />
      <div className='Dashboard_container'>
        <div className='side_container'>
          <SideBar />
        </div>

        <div className='dashboard_main'>
          <div className='clubdetails-banner_container'>
            <img className='club_details_banner'
              src={Environment.api_url + club.banner_dir} />
          </div>
          <div className='clubdetails_header'>
            <img
              className='club_details_logo'
              src={Environment.api_url + club.logo_dir} />

            <div className='clubdetails_header_btn_container'>


              <h2>{club.name_club}</h2>
              {club.active_club == "0" &&
                <p className='alert_admin_club' >
                  cette club n'est pas encore confirmé par l'administration
                </p>}
              {JSON.parse(localStorage.getItem('user')).type == "admin" && club.active_club == "0" &&
                <button
                  onClick={() => acceptClub()}
                  className="thm-btn margin_top_5" >
                  <span>Accepter</span>
                </button>}
              {JSON.parse(localStorage.getItem('user')).type == "admin" && club.active_club == "0" && <button className="thm-btn margin_top_5" >
                <span>Refuser</span>
              </button>}
              <hr className='' />
              <p className='description_club'>
                {club.description_club}
              </p>
            </div>
            <div className='clubdetails_header_btn_container'>
              {club.active_club != "0" && <button className="thm-btn margin_top_5">
                <span>Rejoindre</span>
              </button>}
              {club.active_club != "0" && <button className="thm-btn margin_top_5" >
                <span>Inviter</span>
              </button>}

            </div>
          </div>

        </div>
      </div>
    </>
  )
}
export default Clubdetails;