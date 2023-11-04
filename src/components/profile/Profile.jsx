import react, { useState, useEffect } from 'react';
import Book_preview from '../library/Book_preview';
import Modal from 'react-modal';
import Event_item_Container from '../library/event_item_container/Event_item_Container';
import axios from 'axios';
import Header from './header/Header'
import Header1 from './header/Header1'
import Environment from '../../environment';
import Navbar from '../navbar/Navbar';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import 'react-tabs/style/react-tabs.css';
import './main_profile.css'
function Profile() {

  let userId = useParams();

  let d = new Date()
  const [userProfileData, setUserProfileData] = useState({})
  async function getUserProfile(id) {
    await axios.get(`https://www.apialmaktaba.inspira-jendouba.org/students.php?${d}&action=getuser&id=` + id)
      .then(function (res) {

        console.log(res.data.user[0]);
        setUserProfileData(res.data.user[0])
      }).catch(function (error) {
        console.log(error);
      });
  }
  const customStyles1 = {
    content: {
      position: "absolute",
      inset: "50% auto auto 50%",
      border: "0px",
      overflow: "auto",
      borderRadius: "4px",
      outline: "none",
      padding: "20px",
      transform: "translate(-50%, -50%)",
      width: "100%",
      height: "90%",
    },
  };
  const [modalIsOpen, setIsOpen] = useState(false);
  const [Event_item_modalcontent, setEvent_item_modalcontent] = useState();

  const [modalcontent, setmodalcontent] = useState(<></>);
  function openModal(value) {
    value.flag = 'profile'
    console.log('open', value)
    setmodalcontent(<Book_preview data={value} />)
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }
  function closeModal() {
    setIsOpen(false);
  }
  //user clubs
  const [ownClubs, setOwnClubs] = useState([]);
  const [clubslist, setClubslists] = useState(<></>);
  //user files
  const [ownFiles, setOwnFiles] = useState([]);
  const [fileslist, setFileslists] = useState(<></>);
  async function getOwnClubs() {
    let d = new Date()
    let id_student;
    if (userId.id) {
      id_student = userId.id
    } else {
      id_student = JSON.parse(localStorage.getItem('user')).id_students
    }
    let something = await axios.get(
      Environment.api_url + `clubs.php?action=getownclubs&id_student=${id_student}&d${d}`
    ).then((res) => {
      return (res.data.clubs)
    })
    return (something)
  }
  async function getOwnCFiles() {
    let d = new Date()

    let id_student;
    if (userId.id) {
      id_student = userId.id
    } else {
      id_student = JSON.parse(localStorage.getItem('user')).id_students
    }
    let something = await axios.get(
      Environment.api_url + `library66.php?action=getownfiles&id_student=${id_student}&d${d}`
    ).then((res) => {
      return (res.data.files)
    })
    return (something)
  }

  useEffect(() => {
    getUserProfile(userId.id)
    getOwnClubs().then(res => {
      setOwnClubs(res)
      setClubslists(res && res.map(item => {
        let href = "/club/" + item.id_club
        return (<li><a href={href} >{item.name_club}</a></li>)
      }))
    })
    getOwnCFiles().then(res => {
      setOwnFiles(res)
      console.log(res)
      setFileslists(res && res.map(item => {
        let href = "/club/" + item.id_club
        return (<button onClick={() => openModal(item)} className="btn_open">
          <Event_item_Container data={item} />
        </button>)
      }))
    })
    console.log(ownClubs)

    console.log('userProfileData.length', userProfileData)
  }, []);
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles1}
        contentLabel="Example Modal"
        appElement={document.getElementById('app')}
      >

        {modalcontent}

        <button className='close_btn' onClick={() => { closeModal() }}>x</button>
      </Modal>
      <Navbar />
      <div className='pofile_header'>
        {!userId.id && <Header />}
        {userId.id && <Header1
          id={userId.id}
          getUserProfile={getUserProfile}
          userProfileData={userProfileData} />}
      </div>
      <div className='profileMainContainerr'>
        <input type="checkbox" id='checkfastmenu' name="group1[]" />
        <label for="checkfastmenu" className="checkfastmenubtn">
          <i className="fas fa-angle-double-right"> Menu Rapide</i>
        </label>


        <div className='profileSideBar' id='idprofileSideBar'>
          <input type="checkbox" id='checkfastmenu' name="group1[]" />
          <label for="checkfastmenu" className="checkfastmenubtn">
            <i className="fas fa-angle-double-left">  fermer Le Menu</i>
          </label>

          <div className="listinger22">
            <a href="#">Clubs</a>
            <ul className="Clublist22">
              {clubslist}
            </ul>

            <a href="#">Events</a>
            <ul className="Clublist22">
              <li><a href="#">Nom De L'Event 1</a></li>
              <li><a href="#">Nom De L'Event 2</a></li>
              <li><a href="#">Nom De L'Event 3</a></li>

            </ul>

            <a href="#">Forum</a>
            <ul className="Clublist22">
              <li><a href="#">Nom De Forum 1</a></li>
              <li><a href="#">Nom De Forum 2</a></li>
              <li><a href="#">Nom De Forum 3</a></li>
            </ul>

          </div>
        </div>
        <div className='profileMainContainer'>
          <div className='profileMainContainerFavorites'>
            <h3><i className="fas fa-star"></i>Favoris</h3>
            <hr />
            <div className='filesListContainer'>
              {fileslist}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Profile;