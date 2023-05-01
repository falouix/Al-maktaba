import React , {useState } from 'react';
import axios from 'axios';
import './addnew.css';
import ProfilePic from '../../../assets/dashboard_assets/ProfilePic.png';
import { BiShare } from "react-icons/bi";
import Modal from 'react-modal';
import Environment from '../../../environment';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

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
function AddNew(){
  // modal related 
  
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
// thing related to file
const [selectedFile, setSelectedFile] = useState(null);
const [text_status, setStatusText] = useState("");
const handleFileInputChange = (event) => {
  event.preventDefault();
  if(event.target.files[0].type[0] != 'i' && event.target.files[0].type[0] != 'p'){
      alert("Fichier doit etre image ou pdf");
    }else{
      setSelectedFile(event.target.files[0]);
      closeModal();
  }
};
// thing related to status_text
const StatusTextChange =(event) =>{
  setStatusText(event.target.value);
}

  //trying to create status
        // create status
  const createStatus =  (event)=>{
          
      event.preventDefault();
              const formData = new FormData();
              formData.append("selectedFile", selectedFile);
              axios.post(Environment.api_url+'dashboard.php?action=create_post_image',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }).then(res=>{
                console.log(res)
              });
              console.log(selectedFile)
              axios.post(Environment.api_url+'dashboard.php',{
                action : 'creat_status',
                text_status  : text_status,
                file_dir  : selectedFile.name,
                
              }
              ).then(res=>{
                console.log(res)
              });
      }

    return(
     <div className="blog_post">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        appElement={document.getElementById('app')}
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
        <button className="thm-btn btn_custom_close" onClick={closeModal}>X</button>
        <form>
          <input type="file" onChange={handleFileInputChange}/>
        </form>
      </Modal>
        <div className="container_copy">

          <div className="input-field_addnew">
            <textarea
              onChange={StatusTextChange} 
              className='add_new_text_area' 
              placeholder="Write Your Thaughts" 
              rows="6" />
          </div>
          <div className='btns_container_add_new'>
          <button onClick={openModal} className="thm-btn" ><span>Ajouter Photos</span></button>
          <button onClick={openModal} className="thm-btn" ><span>Ajouter PDF</span></button>
          <button className="thm-btn" onClick={(event)=>createStatus(event)} >
           <span><BiShare /></span> 
            </button>
          </div>
        </div>
      </div>
    );
}

export default AddNew;