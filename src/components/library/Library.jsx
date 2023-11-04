
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import SideBar from '../dashboard/SideBar';
import Book_preview from './Book_preview';
import Navbar from '../navbar/Navbar';
import Event_item_Container from './event_item_container/Event_item_Container';
import Modal from 'react-modal';
import './Library.css'

import Environment from '../../environment';
import AddFile from './add_file/AddFile';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



Modal.setAppElement('#root');
function Library() {
  // search or something
  const [allFiles, setallFiles] = useState([]);
  const [allFiles1, setallFiles1] = useState([]);
  const [allFiles2, setallFiles2] = useState([]);
  const [counter1, setcounter1] = useState(0);
  const [result, setResult] = useState([]);
  const deleteFile = (id) => {
    axios.post(
      `${Environment.api_url}library66.php`,
      {
        action: 'delete_file',
        id_file: id,
      }).then(res => {
        //console.log(res.data)
        setcounter1(counter1 + 1)
      })
  }
  useEffect(() => {
    let d = new Date()
    axios.get(`${Environment.api_url}library66.php?action=getallfiles&d=${d}`).then(res => {
      console.log(res.data.files.files[0])
      setallFiles(res.data.files.files)
      setallFiles1(res.data.files.files1)
      setallFiles2(res.data.files.files2)
    })
  }, [counter1,]);

  const customStyles = {
    content: {
      width: 'fit-content',
      heigth: '90%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginTop: '30px',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: 'transparent',
      border: '0'
    },
  };

  const customStyles1 = {
    content: {
      top: '50%',
      left: '50%',
      height: '90%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
    },
  };

  const [modalIsOpen1, setIsOpen1] = useState(false);

  function openModal1() {
    console.log('sdfsdf')
    setIsOpen1(true);
  }

  function afterOpenModal1() {
    //subtitle.style.color = '#f00';
  }

  function closeModal1() {
    setIsOpen1(false);
  }

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalcontent, setmodalcontent] = useState();
  function openModal(value, action = null) {
    setmodalcontent(
      <Book_preview
        data={value}
        action={action}
        counter1={counter1}
        closeModal={closeModal}
        setcounter1={setcounter1} />
    );
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
    name: 'Nom Du Cours',
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
        <AddFile counter1={counter1} setcounter1={setcounter1} closeModal1={closeModal1} />
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
        {modalcontent}
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
              Bibliothéque
              <button className="thm-btn margin_top_5" onClick={openModal1}>
                <span>Ajouter Document</span>
              </button>
            </h1>
            <h3 className='h3_main_page_events'>Recherche</h3><br />
            <div className="" id="searchfiles_container">
              <TextField
                style={{ width: "100%" }}
                placeholder='Taper Le Nom Du Document Ou Du Prof'
                onChange={(e) => {
                  const all = allFiles2.filter(item => {
                    if ((item.name_file.toUpperCase().includes(e.target.value.toUpperCase())) || (item.nom_teacher.toUpperCase().includes(e.target.value.toUpperCase()))) {
                      console.log(item)
                      return item
                    }
                  });
                  setResult(all)
                }}
              />
            </div>
          </div>
          <h3 className='h3_main_page_university'>1er années </h3>
          <div className='Book_container' id='files_container'>
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
                900: {
                  slidesPerView: 2,
                },
                400: {
                  slidesPerView: 2,
                },
                390: {
                  slidesPerView: 2,
                },
                375: {
                  slidesPerView: 2,
                },
                360: {
                  slidesPerView: 2,
                },
                280: {
                  slidesPerView: 2,
                }
              }}



            >
              {
                result.length != 0 && result.map(value => {
                  return (
                    <SwiperSlide>
                      <Event_item_Container
                        data={value}
                        openModal={openModal}
                        counter1={counter1}
                        setcounter1={setcounter1}
                        deleteFile={deleteFile} />
                    </SwiperSlide>
                  )
                })
              }
              {
                !result.length && allFiles != null && allFiles.map(value => {
                  return (
                    <SwiperSlide>
                      <Event_item_Container
                        data={value}
                        openModal={openModal}
                        counter1={counter1}
                        setcounter1={setcounter1}
                        deleteFile={deleteFile} />
                    </SwiperSlide>
                  )
                })

              }
            </Swiper>
          </div>


          <hr width="95%" className="libHr" />
          <h3 className='h3_main_page_university'>2éme années</h3>
          <div className='Book_container' id='files_container'>
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
                900: {
                  slidesPerView: 2,
                },
                400: {
                  slidesPerView: 2,
                },
                390: {
                  slidesPerView: 2,
                },
                375: {
                  slidesPerView: 2,
                },
                360: {
                  slidesPerView: 2,
                },
                280: {
                  slidesPerView: 2,
                }
              }}



            >
              {
                result.length != 0 && result.map(value => {
                  return (
                    <SwiperSlide>
                      <Event_item_Container
                        data={value}
                        openModal={openModal}
                        counter1={counter1}
                        setcounter1={setcounter1}
                        deleteFile={deleteFile} />
                    </SwiperSlide>
                  )
                })
              }
              {
                !result.length && allFiles1 != null && allFiles1.map(value => {
                  return (
                    <SwiperSlide>
                      <Event_item_Container
                        data={value}
                        openModal={openModal}
                        counter1={counter1}
                        setcounter1={setcounter1}
                        deleteFile={deleteFile} />
                    </SwiperSlide>
                  )
                })

              }
            </Swiper>
          </div>


          <hr width="95%" className="libHr" />
          <h3 className='h3_main_page_university'>3éme anneés</h3>
          <div className='Book_container' id='files_container'>
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
                900: {
                  slidesPerView: 2,
                },
                400: {
                  slidesPerView: 2,
                },
                390: {
                  slidesPerView: 2,
                },
                375: {
                  slidesPerView: 2,
                },
                360: {
                  slidesPerView: 2,
                },
                280: {
                  slidesPerView: 2,
                }
              }}



            >
              {
                result.length != 0 && result.map(value => {
                  return (
                    <SwiperSlide>
                      <Event_item_Container
                        data={value}
                        openModal={openModal}
                        counter1={counter1}
                        setcounter1={setcounter1}
                        deleteFile={deleteFile} />
                    </SwiperSlide>
                  )
                })
              }
              {
                !result.length && allFiles2 != null && allFiles2.map(value => {
                  return (
                    <SwiperSlide>
                      <Event_item_Container
                        data={value}
                        openModal={openModal}
                        counter1={counter1}
                        setcounter1={setcounter1}
                        deleteFile={deleteFile} />
                    </SwiperSlide>
                  )
                })

              }
            </Swiper>
          </div>

          <hr width="95%" className="libHr" />

        </div>
      </div>
    </>
  )
}
export default Library;