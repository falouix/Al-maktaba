import react , {useState } from 'react';
import axios from 'axios';
import './StatusPublication.css';
import Modal from 'react-modal';
import ProfilePic from '../../assets/ProfilePic.png';
import Environment from '../../environment';
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
  const [modalEditIsOpen, setmodalEditIsOpen] = useState(false);
  const [modalEditContent,setModalEditContent] = useState(<></>);
  const [newText_status,setNewText_status]= useState();
  
const handleTextChange = (event) => {
  setNewText_status(event.target.value);
  console.log(event.target.value)
}
  // edit status stuff
  function closeModalEdit(){
    setmodalEditIsOpen(false);
  }
   function  editStatus(){
    
    setmodalEditIsOpen(true);
    setModalEditContent(
      <div>
        <h4 className='modalEdith4'>Edition status</h4>
        <textarea rows="6" className='modalEditextArea'  onChange={handleTextChange}/>
        <button class="thm-btn" onClick={saveedit}><span>Enregistrer</span></button>
        <button class="thm-btn" onClick={closeModalEdit}><span>Cancel</span></button>
      </div>
      )
  }
  function saveedit(){
    console.log("newText_status",newText_status)
    axios.post(Environment.api_url+'dashboard.php?action=update_status',{
      action : 'update_status',
      newText_status  : newText_status,
      id_status : item.item.id_status,
    }).then((res)=>{
      console.log(res.data.success)
      if(res.data.success){
        item.setcounter1(item.counter1 + 1)
        closeModalEdit()
      }
      })
  }
  // edit just ends here


  function openModal() {
    closeModalEdit(true);
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
        <button onClick={closeModal1}>x</button>
        <img 
         src={"https://www.apialmaktaba.inspira-jendouba.org/almaktaba_api/"+item.item.file_dir} 
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
          <img src={ProfilePic} className='avatar_img'/>
          <h4 className='h4_status'>{item.item.login_student}</h4>
        </div>
			</div>
      
      
      <p className="margin_0 status_text_p">
          {item.item.text_status}
        </p>
        {fileContent}
      <h4 className='h4_status time_post'>{item.item.date}</h4> 
        <div className='btn_comment_container'>
				 <button class="thm-btn" onClick={openModal}><span>Comment</span></button>
         {JSON.parse(localStorage.getItem('user')).type=="admin"
         &&<button class="thm-btn" onClick={()=>{
                                        setNewText_status(item.item.text_status);
                                        editStatus();
                                      }
         }><span>Edit</span></button>}
         {JSON.parse(localStorage.getItem('user')).type=="admin"
         &&<button class="thm-btn" onClick={openModal}><span>Supprimer</span></button>}
        </div>
		</div>
  )
}

export default Status;