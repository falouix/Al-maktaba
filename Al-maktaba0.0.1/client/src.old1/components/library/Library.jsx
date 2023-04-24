
import react , {useState,useEffect } from 'react';
import axios from 'axios';
import SideBar from '../dashboard/SideBar';
import Book_preview from './Book_preview';
import Navbar from '../navbar/Navbar';
import Event_item_Container from './event_item_container/Event_item_Container';
import { BiSearchAlt } from "react-icons/bi";
import Modal from 'react-modal';
import './profile.css'
import AddFile from './add_file/AddFile';
import * as ReactDOM from 'react-dom';
Modal.setAppElement('#root');
function Library() {
  useEffect(() => {
    let d=new Date()
    axios.get(`https://www.apialmaktaba.inspira-jendouba.org/almaktaba_api/library66.php?action=getallfiles&d=${d}`).then(res => {
      console.log(res.data.files);
      let something = res.data.files.map(value=>{
        console.log(value);
        return(
          <button onClick={()=>openModal(value)} className="btn_open">
              <Event_item_Container data={value} />
          </button>
          
          )
    });
    ReactDOM.render(something, document.getElementById('files_container'));
      })
    
  },[]);
    
const customStyles = {
    content: {
      width : '90%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const customStyles1 = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
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
    const [modalcontent, setmodalcontent] = useState();
    function openModal(value) {
      setmodalcontent( <Book_preview data={value}/>)
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
          style={customStyles1}
          contentLabel="Example Modal"
          appElement={document.getElementById('app')}
        >
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
             {modalcontent}
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
                            <span>Ajouter Document</span>
                        </button>
                    </h1>
                    
                    
                    <h3 className='h3_main_page_events'>recherche</h3>
                    <div class="h1_main_page_search_container">
                        <input type="text" placeholder='recherche' />
                    </div>
                </div>
                <hr width = "95%"/>
                <h3 className='h3_main_page_university'>Branche 1</h3>
                <div className='events_container' id='files_container'>
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