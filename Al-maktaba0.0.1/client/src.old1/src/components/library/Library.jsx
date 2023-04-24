
import react , {useState } from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import Book_preview from './Book_preview';
import Navbar from '../navbar/Navbar';
import Event_item_Container from './event_item_container/Event_item_Container';
import AddNew from '../status/addNew/AddNew';
import { BiSearchAlt } from "react-icons/bi";
import Modal from 'react-modal';
import Cover_banner from '../../assets/dashboard_assets/events_assets/Cover_banner.png'
import AddFile from './add_file/AddFile';
const Allevent =()=>{
axios.get(`http://localhost:3001/api/getallstatus`).then(res => {
        console.log(res);
      })
}


Modal.setAppElement('#root');
function Library() {

    
const customStyles = {
    content: {
      width: '50%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background : 'transparent'
    },
  };
    let subtitle;
    const [modalIsOpen1, setIsOpen1] = useState(false);
    function openModal1() {
        console.log('open')
        setIsOpen1(true);
    }
    function afterOpenModal1() {
      // references are now sync'd and can be accessed.
      //subtitle.style.color = '#f00';
    }
    function closeModal1() {
        setIsOpen1(false);
    }
    
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        console.log('open')
      setIsOpen(true);
    }
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      //subtitle.style.color = '#f00';
    }
    function closeModal() {
      setIsOpen(false);
    }
    const data = {
        name : 'Nom Du Cours',
        active : 0
    }
    return(
        <>

         <Modal
          isOpen={modalIsOpen1}
          onAfterOpen={afterOpenModal1}
          onRequestClose={closeModal1}
          style={customStyles}
          contentLabel="Example Modal"
          appElement={document.getElementById('app')}
        >
            
            <button class="thm-btn margin_top_5 float_right" onClick={closeModal1}>
                <span>X</span>
            </button>
                   
          <AddFile/>
        </Modal>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          appElement={document.getElementById('app')}
        >
             <Book_preview />
        </Modal>
        <Navbar />
        <div className='Dashboard_container'>
            <div className='side_container'>
                <SideBar />
            </div>
            <div className='dashboard_main'>
                <div className='add_status_container'>
                    <h1 className='h1_main_page_events'>
                        Bibliothéque
                        <button class="thm-btn margin_top_5" onClick={openModal1}>
                            <span>Ajouter Cours</span>
                        </button>
                    </h1>
                    
                    
                    <h3 className='h3_main_page_events'>recherche</h3>
                    <div class="h1_main_page_search_container">
                        <BiSearchAlt className='event_main_page_search_icon'/>
                        <input type="text" placeholder='recherche' />
                        <button class="thm-btn margin_top_5"><span>recherche</span></button>
                    </div>
                </div>
                <hr width = "95%"/>
                <h3 className='h3_main_page_university'>Branche 1</h3>
                <div className='events_container'>
                    <button onClick={openModal} className="btn_open">
                        <Event_item_Container data={data} onClick={openModal}/>
                    </button>
                    <button onClick={openModal} className="btn_open">
                        <Event_item_Container data={data} onClick={openModal}/>
                    </button>
                    <button onClick={openModal} className="btn_open">
                        <Event_item_Container data={data} onClick={openModal}/>
                    </button>
                    <button onClick={openModal} className="btn_open">
                        <Event_item_Container data={data} onClick={openModal}/>
                    </button>
                </div>
                    <h5 className='voir_plus'>Voir plus</h5>
                <hr width = "95%"/>
                <h3 className='h3_main_page_clubs'>Branche 2</h3>
                <div className='events_container'>
                    <button onClick={openModal} className="btn_open">
                        <Event_item_Container data={data} onClick={openModal}/>
                    </button>
                    <button onClick={openModal} className="btn_open">
                        <Event_item_Container data={data} onClick={openModal}/>
                    </button>
                    <button onClick={openModal} className="btn_open">
                        <Event_item_Container data={data} onClick={openModal}/>
                    </button>
                    <button onClick={openModal} className="btn_open">
                        <Event_item_Container data={data} onClick={openModal}/>
                    </button>
                </div>
                    <h5 className='voir_plus'>Voir plus</h5>
            </div>
        </div>
        </>
    )
}
export default Library;