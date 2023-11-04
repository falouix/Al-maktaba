import react, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfilePic from './assets/ProfilePic.png';
import './header.css'
import Environment from '../../../environment';
import Modal from 'react-modal';
const customStyles = {
  content: {
    width: '333px',
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

function HeaderProfile(data) {
  const [msg, setMsg] = useState('');
  const [alertMsg, setAlertMsg] = useState('');

  const [modalIsOpen, setIsOpen1] = useState(false);
  function openModal() {
    console.log('open')
    setIsOpen1(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }
  function closeModal() {
    setIsOpen1(false);
  }
  const sendMsg = () => {
    axios.post(`${Environment.api_url}students.php`,
      {
        action: 'sendmsg',
        id_sender: JSON.parse(localStorage.getItem('user')).id_students,
        id_reciever: data.id,
        text_message: msg
      }
    )
      .then(res => {
        if (res.data = "succes") {
          setMsg('')
          setAlertMsg('votre message a ete envoyer');
          setTimeout(function () {
            setAlertMsg('');
            closeModal()
          }, 1000)
        }
      })
  }

  useEffect(() => {
    data.getUserProfile(data.id)
  }, []);
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        appElement={document.getElementById('app')}
      >

        <button className='close_btn' onClick={() => { closeModal() }}>x</button>
        <div>
          <p style={{ fontSize: '12px', textAlign: 'center', width: '100%', color: 'green' }}>{alertMsg}</p>
          <textarea
            className='sendMsgTextarea'
            value={msg}
            placeholder='Ecrire un message ici ..'
            row='6'
            onChange={(e) => {
              setMsg(e.target.value)
            }} />
          <button onClick={sendMsg} style={{ width: '100%' }} className='thm-btn26'><span>envoyer</span></button>
        </div>
      </Modal>
      <header className="user-profile-header26">
        <div className='info_img_container'>

          <div className="avatar-container26">
            <img className="avatar26" src={ProfilePic} alt="Profile picture" />
          </div>
          <div className="profile-info26">
            <h1 className="profile-name26">{data.userProfileData.user && data.userProfileData.user.login_student}</h1>
            <div className="profile-infos-name26">
              <h5>{data.userProfileData.user && data.userProfileData.user.level_student}</h5>
              <h5>{data.userProfileData.user && data.userProfileData.user.speciality_student}</h5>
              <h5>{data.userProfileData.user && data.userProfileData.user.type_user}</h5>
            </div>

          </div>
        </div>


        <div className="profile-links26">
          <a href="https://www.facebook.com"><i className="fab fa-facebook"></i>Facebook</a>
          <a href="https://www.linkedin.com"><i className="fab fa-linkedin"></i>Linkedin</a>
        </div>
        <div className="nature-header26">
          <button className="thm-btn26" onClick={() => openModal()}><span>Contacter</span></button>
        </div>
        <div className="nature-header26">
        </div>
      </header>
    </>
  )
}
export default HeaderProfile;