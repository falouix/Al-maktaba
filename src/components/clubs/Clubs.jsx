
import react, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import SideBar from '../dashboard/SideBar';
import Navbar from '../navbar/Navbar';
import Club_item_Container from './club_item_container/club_item_Container';
import Modal from 'react-modal';
import AddClub from './add_club/AddClub';
import TextField from '@mui/material/TextField';
import './club.css'
import Environment from '../../environment';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


const customStyles = {
  content: {
    width: '333px',
    heigth: '100hv',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '10px',
    background: '#ededed',
    borderRadius: '10px',
    border: '1px solid red'
  },
};

Modal.setAppElement('#root');
function Clubs() {
  let navigate = useNavigate()

  const openClubpage = (id) => {
    console.log(id)
    navigate(id)
  }
  const [test, settest] = useState(0);
  const [allClubs, setAlllClubs] = useState([]);
  const [result, setResult] = useState([]);
  function AllClubs() {
    let d = new Date()
    var items = [];
    axios.get(`${Environment.api_url}clubs.php?action=getallclubs&d=${d}`)
      .then(res => {
        res.data.clubs.forEach((key, value) => {
          items.push(key)
        })
        setAlllClubs(items)
      })
  };
  // search or something
  const options = allClubs.map((option) => {
    console.log(option.name_club.toUpperCase())
    const firstLetter = option.name_club.toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  useEffect(() => {
    AllClubs();

  }, [test]);
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

        <button className='close_btn' onClick={() => { closeModal1() }}>x</button>
        <AddClub settest={settest} test={test} closeModal1={closeModal1} />
      </Modal>
      <Navbar />
      <div className='Dashboard_container'>
        <div className='side_container'>
          <SideBar />
        </div>

        <div className='dashboard_main'>
          <div className='add_status_container'>
            <h1 className='h1_main_page_events'>
              Clubs
              <button className="thm-btn margin_top_5" onClick={openModal1}>
                <span>Ajouter club</span>
              </button>
            </h1>
            <h3 className='h3_main_page_events'>Recherche</h3><br />
            <div className="" id="searchfiles_container">

              <TextField
                style={{ width: "100%" }}
                placeholder='Rechercher nom de fichier ou nom du prof'
                onChange={(e) => {
                  const all = allClubs.filter(item => {
                    if ((item.name_club.toUpperCase().includes(e.target.value.toUpperCase()))) {
                      return item
                    }
                  });

                  setResult(all)
                  console.log(all)
                }} />
            </div>
          </div>

          <hr width="95%" />
          <h3 className='h3_main_page_university'>Liste Des Clubs</h3>
          <div className='Clubs_container'>

            {
              result.length != 0 && result.map(value => {
                return (
                  <button onClick={() => openModal(value)} className="btn_open">
                    <Club_item_Container data={value} />
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
                768: {
                  slidesPerView: 3,
                },
                400: {
                  slidesPerView: 2,
                },
              }}
            >

              {
                !result.length && allClubs.length != "0" && allClubs.map(item => {
                  return (
                    <SwiperSlide>
                      <button onClick={event => { openClubpage(item.id_club) }} className="btn_open">
                        <Club_item_Container data={item} />
                      </button></SwiperSlide>)
                })
              }
            </Swiper>
          </div>
          <h5 className='voir_plus'>Voir plus</h5>
          <hr width="95%" />
        </div>
      </div>
    </>
  )
}
export default Clubs;