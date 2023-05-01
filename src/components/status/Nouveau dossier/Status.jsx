import react , {useState } from 'react';
import axios from 'axios';
import './StatusPublication.css';
import Modal from 'react-modal';
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
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }
  function closeModal() {
    setIsOpen(false);
  }
  return(
		<div className="Book-box margin_top_10">
       <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        appElement={document.getElementById('app')}
      >
        <h1>comment</h1>
        <p>test comments</p>
        <input type="text" placeholder='ajouter votre commentaire' />
      </Modal>
        <p className="margin_0 status_text_p">
          {item.item.text_status}
        </p>
      <div className="status_btn_container">
      <h4 className='h4_status'>Date</h4>
				<button className="thm-btn" onClick={openModal}><span>Comment</span></button>
			</div>
		</div>
  )
}

export default Status;