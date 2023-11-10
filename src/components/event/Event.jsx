
import react, { useState, useEffect } from 'react';
import axios from 'axios';
import Environment from '../../environment';
import SideBar from '../dashboard/SideBar';
import Navbar from '../navbar/Navbar';
import TextField from '@mui/material/TextField';
import Event_item_Container from './event_item_container/Event_item_Container';
import Modal from 'react-modal';
import AddEvent from './add_event/AddEvent';
import Event_item_modal from './Event_item_modal'
import './profile.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
    background: 'transparent',
    border: '0'
  },
};
const customStyles1 = {
  content: {
    position: "absolute",
    inset: "50% auto auto 50%",
    border: "0px",
    background: "transparent",
    overflow: "auto",
    borderRadius: "4px",
    outline: "none",
    padding: "20px",
    transform: "translate(-50%, -50%)",
    width: "fit-content",
  },
};


Modal.setAppElement('#root');
function Event() {
  let subtitle;

  const [result, setResult] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  // const event
  const [counter, setCounter] = useState(1)
  const [banner_file, setbanner_file] = useState()
  const [nameEvent, setnameEvent] = useState();
  const handleChangenameEvent = (event) => {
    setnameEvent(event.target.value);
  }
  const handleChangebannerEvent = (event) => {
    if (event.target.files[0].type[0] != "i") {
      alert("type invalide le type de fichier doit etre image")
    } else {
      setbanner_file(event.target.files[0])
    }
  }
  const [DescriptionEvent, setDescriptionEvent] = useState();
  const [linkEvent, setlinkEvent] = useState();

  const handleChangelinkEvent = (event) => {
    setlinkEvent(event.target.value);
  }
  const handleChangeDescriptionEvent = (event) => {
    setDescriptionEvent(event.target.value);
  }
  const [DateStartEvent, setDateStartEvent] = useState();
  const handleChangeDateStartEvent = (event) => {
    setDateStartEvent(event.target.value);
  }
  const [DateEndtEvent, setDateEndtEvent] = useState();
  const handleChangeDateEndtEvent = (event) => {
    setDateEndtEvent(event.target.value);
  }
  const [progress, setProgress] = useState()
  const [eventTorender, seteventTorender] = useState(<></>);
  // create event
  function getAllEnvents() {
    let d = new Date()
    var items = [];
    axios.get(Environment.api_url + `events.php?action=get&d${d}`, {
      action: 'get'
    }).then((res) => {
      res.data.events.forEach((key, value) => {
        console.log('key.event', key)
        items.push(key)
      })
      setAllEvents(items)
    })
  }

  useEffect(() => {
    getAllEnvents()
  }, [counter]);
  // create event

  const eventToCreate = {

  }
  const [modalIsOpen1, setIsOpen1] = useState(false);
  const [modalcontent, setmodalcontent] = useState(<></>);
  const [Event_item_modalcontent, setEvent_item_modalcontent] = useState();

  function openModal1() {
    setmodalcontent(<AddEvent
      eventToCreate={eventToCreate}
      closeModal1={closeModal1}
      setCounter={setCounter}
      counter={counter}
    />)
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
  function openModal(data) {
    setEvent_item_modalcontent(<Event_item_modal data={data} />)
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
    name: 'Nom de l’evenement',
    active: 0
  }
  return (
    <>

      <Modal
        isOpen={modalIsOpen1}
        onAfterOpen={afterOpenModal1}
        onRequestClose={closeModal1}
        style={customStyles}
        contentLabel="Example Modal"
        appElement={document.getElementById('app')}
      >
        {modalcontent}

        <button className='close_btn' onClick={() => { closeModal1() }}>x</button>
      </Modal>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles1}
        contentLabel="Example Modal"
        appElement={document.getElementById('app')}
      >

        {Event_item_modalcontent}

        <button className='close_btn' onClick={() => { closeModal() }}>x</button>
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
              <button className="thm-btn margin_top_5" onClick={openModal1}>
                <span>Ajouter Event</span>
              </button>
            </h1>
            <h3 className='h3_main_page_events'>Recherche</h3><br />
            <div className="" id="searchfiles_container">

              <TextField
                style={{ width: "100%" }}
                placeholder='Rechercher nom de fichier ou nom du prof'
                onChange={(e) => {
                  const all = allEvents.filter(item => {
                    if ((item.name_event.toUpperCase().includes(e.target.value.toUpperCase()))) {
                      return item
                    }
                  });

                  setResult(all)
                }} />
            </div>
          </div>

          <hr width="95%" />
          <h3 className='h3_main_page_university'>Liste Des Événements</h3>



          <div className='Events_container'>



            {
              result.length != 0 && result.map(value => {
                return (
                  <button onClick={() => openModal(value)} className="btn_open">
                    <Event_item_Container data={value} />
                  </button>
                )
              })
            }




            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={50}
              slidesPerView={5}

              pagination={{ clickable: true }}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                1080: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 2,
                },
                390: {
                  slidesPerView: 1,
                },
              }}

            >



              {
                !result.length && allEvents.length != "0" && allEvents.map((key, value) => {
                  return (
                    <SwiperSlide>
                      <button key={value} onClick={() => openModal(key)} className="btn_open">
                        <Event_item_Container data={key.event} />
                      </button>
                    </SwiperSlide>
                  )

                })}
            </Swiper>
          </div>
          <h5 className='voir_plus'>Voir plus</h5>
          <hr width="95%" />
        </div>
      </div>
    </>
  )
}
export default Event;