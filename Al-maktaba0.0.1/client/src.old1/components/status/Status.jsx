import react , {useState } from 'react';
import axios from 'axios';
import './StatusPublication.css';
import Modal from 'react-modal';
import ProfilePic from '../../assets/ProfilePic.png'
let subtitle;
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
width : "80%"
  },
};
Modal.setAppElement('#root');
function Status(item) {
  //console.log(item.item)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen1, setIsOpen1] = useState(false);
  const [EditopdalisOpen, setEditopdalisOpen] = useState(false);
  const [text_status, settext_status] = useState(item.item.text_status);
  const [new_text, setnewtext] = useState(item.item.text_status);
  // edit function 
  
  function editStatus(){
    axios.post(
      'https://www.apialmaktaba.inspira-jendouba.org/almaktaba_api/dashboard.php?action=update',
           {
            text_status : new_text,
            id_status : item.item.id_status
           }
      ).then(res=>{
          console.log(res.data)
           console.log(new_text)
           settext_status(new_text)
           closeEdit()
      })
  }
   // edit function end
     // edit function 
  
  function DeleteStatus(){
    axios.post(
      'https://www.apialmaktaba.inspira-jendouba.org/almaktaba_api/dashboard.php?action=delete',
           {
            id_status : item.item.id_status
           }
      ).then(res=>{
        item.setcounter1(item.counter1+1)
      })
  }
   // edit function end
  function openModal() {
    setIsOpen(true);
  }
  function openModal1() {
    setIsOpen1(true);
  }
  function openModalEdit() {
    setEditopdalisOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }
  function afterOpenedit() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }
  function afterOpenModal1() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }
  function closeEdit() {
    setEditopdalisOpen(false);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function closeModal1() {
    setIsOpen1(false);
  }
  let fileContent;
  if(item.item.status_type == 'jpg' || item.item.status_type == 'jpeg'|| item.item.status_type == 'png'|| item.item.status_type == 'gif'|| item.item.status_type == 'webp'){
    fileContent = <button onClick={openModal1}><img 
    src={"https://www.apialmaktaba.inspira-jendouba.org/almaktaba_api/"+item.item.file_dir} 
    className='img_status_dashboard' />
      </button>

  }  if(item.item.status_type == 'pdf'){
    fileContent =<iframe 
    id="if1" 
    width="100%" 
    height="400"  
    src={"https://www.apialmaktaba.inspira-jendouba.org/almaktaba_api/"+item.item.file_dir}>
    </iframe>

  }
 
  return(
		<div class="Book-box margin_top_10">
       <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        appElement={document.getElementById('app')}
      >
        <h1 className='p_comment_h1'>comments</h1>
        <p className='p_comment_text'><img src={ProfilePic} className='avatar_img'/><span className='p_comment_span'>User Name : </span>test comments</p>
        <p className='p_comment_text'><img src={ProfilePic} className='avatar_img'/><span className='p_comment_span'>User Name : </span>test comments test comments</p>
        <input type="text" className='comment_input' placeholder='ajouter votre commentaire' />
        <button class="thm-btn margin_top_5 p_comment_btn"><span>commenter</span></button>
      </Modal>
      <Modal
        isOpen={modalIsOpen1}
        onAfterOpen={afterOpenModal1}
        onRequestClose={closeModal1}
        style={customStyles}
        contentLabel="Example Modal"
        appElement={document.getElementById('app')}
      >
        <a onClick={closeModal1} className='a_close_status_modal'>x</a>
        <img 
    src={"https://www.apialmaktaba.inspira-jendouba.org/almaktaba_api/"+item.item.file_dir} 
    className='img_status_dashboard custom_img' />
      </Modal>
      <Modal
        isOpen={EditopdalisOpen}
        onAfterOpen={afterOpenedit}
        onRequestClose={closeEdit}
        style={customStyles}
        contentLabel="Example Modal"
        appElement={document.getElementById('app')}
      >
        <textarea 
        className='edit_textarea'
        type='text' 
        rows='6' 
        value={new_text}  
        onChange={(e)=>{
              setnewtext(e.target.value)
        }}/>
        
        {JSON.parse(localStorage.getItem('user')).type=="admin"
         &&<button class="thm-btn" onClick={editStatus}><span>Save</span></button>}
      </Modal>
      <div className="status_btn_container">
        <div className='avatar_img_container'>
          <img src={ProfilePic} className='avatar_img'/>
        
          <h4 className='h4_status'>{item.item.login_student}</h4>
        </div>
			</div>
      
      
      <p className="margin_0 status_text_p">
          {text_status}
        </p>
        {fileContent}
        
      <h4 className='h4_status time_post'>{item.item.date}</h4> 
        <div className='btn_comment_container'>
				 <button class="thm-btn" onClick={openModal}><span>Comment</span></button>
         {JSON.parse(localStorage.getItem('user')).type=="admin"
         &&<button class="thm-btn" onClick={openModalEdit}><span>Edit</span></button>}
         {JSON.parse(localStorage.getItem('user')).type=="admin"
         &&<button class="thm-btn" onClick={DeleteStatus}><span>Supprimer</span></button>}
        </div>
		</div>
  )
}

export default Status;