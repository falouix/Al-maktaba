
import react , {useState, useEffect } from 'react';
import axios from 'axios';
import Environment from '../../environment';
import SideBar from './SideBar';
import Navbar from '../navbar/Navbar';
import Event_item_Container from './event_item_container/Event_item_Container';
import AddNew from '../status/addNew/AddNew';
import { BiSearchAlt } from "react-icons/bi";
import Modal from 'react-modal';
import Cover_banner from '../../assets/dashboard_assets/events_assets/Cover_banner.png'
import AddEvent from './add_event/AddEvent';

const customStyles = {
  content: {
    width: '80%',
    height: '80%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');
function Event() {
    let subtitle;
    
    const [allEvents , setAllEvents] = useState([]);
    // const event
const [nameEvent , setnameEvent] = useState('');
const handleChangenameEvent = (event) => {
    setnameEvent(event.target.value);
  }
const [DescriptionEvent , setDescriptionEvent] = useState('');

const handleChangeDescriptionEvent = (event) => {
  
  console.log("test")
    setDescriptionEvent(event.target.value);
  }
const [DateStartEvent , setDateStartEvent] = useState('');
const handleChangeDateStartEvent = (event) => {
    setDateStartEvent(event.target.value);
  }
const [DateEndtEvent, setDateEndtEvent] = useState('');
const handleChangeDateEndtEvent = (event) => {
    setDateEndtEvent(event.target.value);
  }
  const [eventTorender, seteventTorender] = useState(<></>);
      // create event
function getAllEnvents (){
    var items =[];
    axios.get(Environment.api_url+'events.php?action=get',{
        action : 'get'
    }).then((res)=>{
        res.data.events.forEach((key,value)=>{
        items.push(key.event)
     })
        setAllEvents(items)
    })
}

useEffect(() => {
  getAllEnvents()
}, [allEvents]);
    // create event
const createEnvent =()=>{
    axios.post(Environment.api_url+'events.php',{
        action : 'create',
        nameEvent  : nameEvent ,
        DescriptionEvent :  DescriptionEvent,
        DateStartEvent  :   DateStartEvent ,
        DateEndtEvent :    DateEndtEvent,

    }).then((res)=>{
        console.log(res)
          setmodalcontent(<h1>{res.data}</h1>)

    })
}
const eventToCreate = {
    handleChangenameEvent :         handleChangenameEvent,
    handleChangeDescriptionEvent :  handleChangeDescriptionEvent,
    handleChangeDateStartEvent :    handleChangeDateStartEvent,
    handleChangeDateEndtEvent :     handleChangeDateEndtEvent,
    createEnvent :createEnvent
}
    const [modalIsOpen1, setIsOpen1] = useState(false);
    const [modalcontent, setmodalcontent] = useState(<></>);
    function openModal1() {
      setmodalcontent(<AddEvent  eventToCreate = {eventToCreate}/>)
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
      setIsOpen(true);
    }
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
    function closeModal() {
      setIsOpen(false);
    }
    const data = {
        name : 'Nom de l’evenement',
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
            {modalcontent}
        </Modal>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          appElement={document.getElementById('app')}
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
          <div className='modal_header_event'>
                <img src={Cover_banner} />
          </div>
          <div className='modal_body_event'>
              <h2>{data.name}</h2>
              <h5>12:00</h5>
              <h4>description</h4>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type
                specimen
              </p>
              <div className="modal_footer_event">
                      <p><span>Personnes ont inscrit</span></p>
                      <p><span>Réalisé Par : </span>Nom Du Club</p>
              </div>
              
              <div className='modal_footer_event_btn_container'>
                            <button class="thm-btn margin_top_5"><span>Intéressé</span></button>
                            <button class="thm-btn margin_top_5"><span>Participer</span></button>
              </div>
          </div>
        </Modal>
        <Navbar />
        <div className='Dashboard_container'>
            <div className='side_container'>
                <SideBar />
            </div>
            <div className='dashboard_main'>
                <div className='add_status_container'>
                    <h1 className='h1_main_page_events'>
                        Evénements
                        <button class="thm-btn margin_top_5" onClick={openModal1}>
                            <span>Ajouter Event</span>
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
                <h3 className='h3_main_page_university'>Evénements du faculté</h3>
                <div className='events_container'>
                            {allEvents.map((key,value)=>{
        return( <button key={value} onClick={openModal} className="btn_open">
         <Event_item_Container data={key} onClick={openModal}/>
     </button>)
      })}
                </div>
                    <h5 className='voir_plus'>Voir plus</h5>
                <hr width = "95%"/>
                <h3 className='h3_main_page_clubs'>Evénements du clubs</h3>
                <div className='events_container'>
                </div>
                    <h5 className='voir_plus'>Voir plus</h5>
            </div>
        </div>
        </>
    )
}
export default Event;