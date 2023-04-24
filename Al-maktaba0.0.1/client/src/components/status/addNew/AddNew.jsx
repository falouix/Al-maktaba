import React , {useState } from 'react';
import axios from 'axios';
import './addnew.css';
import ProfilePic from '../../../assets/dashboard_assets/ProfilePic.png';
import { BiShare } from "react-icons/bi";
import Modal from 'react-modal';
import Environment from '../../../environment';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';
import { Container, Row, Col, Form, Button, ProgressBar } from "react-bootstrap"

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
function AddNew(counter1){
// thing related to file
const [selectedFile, setSelectedFile] = useState(null);
const [text_status, setStatusText] = useState("");
const [fileType, setfileType] = useState();
const [progress1, setProgress1] = useState();

const handleFileInputChange = (event) => {
  console.log(event.target.files[0] )
  event.preventDefault();
  if(event.target.files[0].type[0] != 'i' && event.target.files[0].type != 'application/pdf'){
      alert("Fichier doit etre image ou pdf");
    }else{
      setSelectedFile(event.target.files[0]);
      if(event.target.files[0].type == 'application/pdf'){
        setfileType('pdf')
      }else{
        setfileType('img')
      }
  }
};
// thing related to status_text
const StatusTextChange =(event) =>{
  console.log("event.target.value",event.target.value)
  setStatusText(event.target.value);
}

  //trying to create status
        // create status
  const createStatus =  async(event)=>{
          
      event.preventDefault();
      console.log('selectedFile', typeof selectedFile);
              try { await axios.post(Environment.api_url+"dashboard.php",
          {
            action : 'creat_status',
            text_status  : text_status ,
            id_hoster :  JSON.parse(localStorage.getItem('user')).id_students,
            fileType : fileType
          }
        )
          .then(async res => {
            console.log(res.data)
                const formData = new FormData();
                formData.append("selectedFile", selectedFile);
                if(selectedFile !=undefined){
                  axios.post(Environment.api_url+"dashboard.php?action=creat_status_image&insert_id="+res.data.insert_id,
                  formData,{
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: data => {
                      //Set the progress value to show the progress bar
                      setProgress1(Math.round((100 * data.loaded) / data.total))
                    },
                  }
                 )
                   .then(res => {
                     console.log(res.data);
                     counter1.setcounter1(counter1.counter1+1)
                     if(res.data == 'success'){
                         console.log(res.data)
                         
                     }
                   })
                }else{
                  counter1.setcounter1(counter1.counter1+1)
                }
                console.log(res.data.insert_id)
              })}
          catch (err) {
              console.error(err);
          }
      }

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
  function closeModal() {
    setIsOpen(false);
  }
    return(
     <div class="blog_post">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        appElement={document.getElementById('app')}
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
        <button class="thm-btn btn_custom_close" onClick={closeModal}><span>Confirmer</span></button>
        <form>
          <input type="file" onChange={handleFileInputChange}/>
        </form>
      </Modal>
        <div class="container_copy">

          <div class="input-field_addnew">
            <textarea
              onChange={StatusTextChange} 
              className='add_new_text_area' 
              placeholder="Write Your Thaughts" 
              rows="6" />
          </div>
          {progress1 && <ProgressBar now={progress1} label={`${progress1}%`} />}
          <div className='btns_container_add_new'>
          <button onClick={openModal} class="thm-btn" ><span>Ouvrir une Nouvelle Discussion</span></button>
          <button onClick={openModal} class="thm-btn" ><span>Ajouter un ressource éducatif </span></button>
          <button class="thm-btn" onClick={(event)=>createStatus(event)} ><span> Partager <BiShare /></span> 
            </button>
          </div>
        </div>
      </div>
    );
}

export default AddNew;