import react, { useState, useEffect } from 'react';
import axios from 'axios';
import './StatusPublication.css';
import Modal from 'react-modal';
import ProfilePic from '../../assets/ProfilePic.png';
import Environment from '../../environment';
import { TextField } from '@mui/material';
import Comments from "./comments/Comments"

import { useNavigate } from "react-router-dom";
let subtitle;
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: 'auto',
    width: 'auto',
    background: 'white',
    padding: "5px"

  },
};

const Commentstyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    marginTop: '20px',
    transform: 'translate(-50%, -50%)',
    height: 'auto',
    width: '90%',
    background: 'white',
    padding: "5px"

  },
};



Modal.setAppElement('#root');
function Status(item) {
  //console.log(item.item)
  const [containerClassName, setContainerClassName] = useState('Book-box margin_top_10')
  const [tst, settst] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen1, setIsOpen1] = useState(false);
  const [modalEditIsOpen, setmodalEditIsOpen] = useState(false);
  const [modalEditContent, setModalEditContent] = useState(<></>);
  const [newText, setNewText] = useState('');

  //////// /////////////// ///////
  useEffect(() => {
    //setNewText_status(item.item.text_status);
    if (item.item.type_user == "Etudiant") {
      setContainerClassName("Book-box margin_top_10 student")
    } else {

      setContainerClassName("Book-box margin_top_10 teacher")
    }
  }, []);
  //////////////// ///////

  const handleTextChange = (event) => {
    settst(event.target.value)
  }
  // edit status stuff
  function closeModalEdit() {
    console.log('closeModalEdit', tst)
    setmodalEditIsOpen(false);
  }
  const editStatus = () => {
    setmodalEditIsOpen(true);
    setModalEditContent(
      <div>
        <h4 className='modalEdith4'>Edition status</h4>
        <p className="margin_0 status_text_p">
          {item.item.text_status}
        </p>
        <input type="text"
          className='modalEditextArea' onChange={(event) => {
            handleTextChange(event)
          }} />

        <button className="thm-btn" onClick={saveedit}><span>Enregistrer</span></button>
        <button className="thm-btn" onClick={closeModalEdit}><span>Cancel</span></button>
      </div>
    )
  }
  function saveedit() {
    let data = {
      action: 'update_status',
      newText_status: tst,
      id_status: item.item.id_status,
    }
    console.log("dataa", data)
    axios.post(Environment.api_url + 'dashboard.php?action=update_status', data).then((res) => {
      console.log(res.data.success)
      if (res.data.success) {
        item.setcounter1(item.counter1 + 1)
      }
    })
  }
  function delete_status() {
    axios.post(Environment.api_url + 'dashboard.php?action=delete_status', {
      action: 'update_status',
      id_status: item.item.id_status,
    }).then((res) => {
      console.log(res.data.success)
      if (res.data.success) {
        item.setcounter1(item.counter1 + 1)
        closeModalEdit()
      }
    })
  }
  // edit just ends here


  function openModal() {
    setIsOpen(true);
  }

  function openModal1() {
    setIsOpen1(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }
  function afterOpenModal1() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }
  function closeModal() {
    setIsOpen(false);
  }
  function closeModal1() {
    setIsOpen1(false);
  }
  let fileContent;
  if (item.item.status_type == 'jpg' || item.item.status_type == 'jpeg' || item.item.status_type == 'png' || item.item.status_type == 'gif' || item.item.status_type == 'webp') {
    fileContent = <button onClick={openModal1}><img
      src={"https://www.apialmaktaba.inspira-jendouba.org/" + item.item.file_dir}
      className='img_status_dashboard' />
    </button>

  } if (item.item.status_type == 'pdf') {
    fileContent = <iframe
      id="if1"
      width="100%"
      height="400"
      src={"https://www.apialmaktaba.inspira-jendouba.org/" + item.item.file_dir}>
    </iframe>

  }
  // navigate to subject details

  let navigate = useNavigate()

  const openSubjectpage = (id) => {
    console.log(id)
    navigate(id)
  }
  return (
    <div className={containerClassName}>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={Commentstyle}
        contentLabel="Example Modal"
        appElement={document.getElementById('app')}
      >
        <Comments item={item.item} />
      </Modal>
      <Modal

        isOpen={modalIsOpen1}
        onAfterOpen={afterOpenModal1}
        onRequestClose={closeModal1}
        style={customStyles}
        contentLabel="Example Modal"
        appElement={document.getElementById('app')}
      >

        <button className='close_btn' onClick={() => { closeModal1() }}>x</button>
        <img
          src={"https://www.apialmaktaba.inspira-jendouba.org/" + item.item.file_dir}
          className='img_status_dashboard custom_img' />
      </Modal>

      <Modal
        isOpen={modalEditIsOpen}
        onAfterOpen={afterOpenModal1}
        onRequestClose={closeModalEdit}
        style={customStyles}
        contentLabel="Example Modal"
        appElement={document.getElementById('app')}
      >

        <div>
          <h4 className='modalEdith4'>Edition status</h4>
          <p className="margin_0 status_text_p">
            {item.item.text_status}
          </p>
          <input type="text"
            className='modalEditextArea' onChange={(event) => {
              console.log(event.target.value)
              handleTextChange(event)
            }} />

          <button className="thm-btn" onClick={saveedit}><span>Enregistrer</span></button>
          <button className="thm-btn" onClick={closeModalEdit}><span>Cancel</span></button>
        </div>
      </Modal>

      <div className="status_btn_container">
        <div className='avatar_img_container' onClick={() => item.openProfile(item.item.id_students)}>
          <img src={ProfilePic} className='avatar_img' />
          <h4 className='h4_status' >{item.item.login_student} <br></br><span style={{ color: 'gray' }}>{' (' + item.item.type_user + ')'}</span></h4>


        </div>
      </div>
      <h3>{item.item.title_status} </h3>
      <h4 className='h4_time_status time_post'>{item.item.date}</h4>
      <div className='btn_comment_container'>
        <button className="thm-btn" onClick={() => openSubjectpage(item.item.id_status)}><span>Afficher</span></button>
        {JSON.parse(localStorage.getItem('user')).type == "admin"
          && <button className="thm-btn" onClick={() => {
            editStatus();
          }
          }><span>Edit</span></button>}
        {JSON.parse(localStorage.getItem('user')).type == "admin"
          && <button className="thm-btn" onClick={delete_status}><span>Supprimer</span></button>}
      </div>
    </div>
  )
}

export default Status;