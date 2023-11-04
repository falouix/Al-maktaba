import react, { useState, useEffect } from 'react';
import axios from 'axios';
import './StatusPublication.css';
import Modal from 'react-modal';
import ProfilePic from '../../assets/ProfilePic.png';
import Environment from '../../environment';
import { TextField } from '@mui/material';
let subtitle;
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',

  },
};
Modal.setAppElement('#root');
function Status(item) {
  //console.log(item.item)
  const [tst, settst] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen1, setIsOpen1] = useState(false);
  const [modalEditIsOpen, setmodalEditIsOpen] = useState(false);
  const [modalEditContent, setModalEditContent] = useState(<></>);
  const [newText, setNewText] = useState('');

  //////// /////////////// ///////
  useEffect(() => {
    //setNewText_status(item.item.text_status);

  }, []);
  //////////////// ///////

  const handleTextChange = (event) => {
    settst(event.target.value)
  }
  // edit status stuff
  function closeModalEdit() {
    setmodalEditIsOpen(false);
  }
  const editStatus = () => {
    settst(item.item.text_status)
    setmodalEditIsOpen(true);
    setModalEditContent(
      <div>
        <h4 className='modalEdith4'>Edition status</h4>
        <p className="margin_0 status_text_p">
          {item.item.text_status}
        </p>
        <input type="text"
          className='modalEditextArea' onChange={(event) => {
            console.log(event.target.value);
            settst(event.target.value)
            console.log('11', tst)
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

  return (
    <div className="Book-box margin_top_10">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        appElement={document.getElementById('app')}
      >
        <h1 className='p_comment_h1'>comments</h1>
        <p className='p_comment_text'><img src={ProfilePic} className='avatar_img' /><span className='p_comment_span'>User Name : </span>test comments</p>
        <p className='p_comment_text'><img src={ProfilePic} className='avatar_img' /><span className='p_comment_span'>User Name : </span>test comments test comments</p>
        <input type="text" className='comment_input' placeholder='ajouter votre commentaire' />
        <button className="thm-btn margin_top_5 p_comment_btn"><span>commenter</span></button>
      </Modal>
      <Modal
        isOpen={modalIsOpen1}
        onAfterOpen={afterOpenModal1}
        onRequestClose={closeModal1}
        style={customStyles}
        contentLabel="Example Modal"
        appElement={document.getElementById('app')}
      >
        <button className="Closebutton" onClick={closeModal1}>x</button>
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
        {modalEditContent}
      </Modal>

      <div className="status_btn_container">
        <div className='avatar_img_container'>
          <img src={ProfilePic} className='avatar_img' />
          <h4 className='h4_status'>{item.item.login_student}</h4>
        </div>
      </div>


      <p className="margin_0 status_text_p">
        {item.item.text_status}
      </p>
      {fileContent}
      <h4 className='h4_status time_post'>{item.item.date}</h4>
      <div className='btn_comment_container'>
        <button className="thm-btn" onClick={openModal}><span>Comment</span></button>
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