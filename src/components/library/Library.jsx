
import react , {useState,useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
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
  // search or something
const [allFiles , setallFiles] = useState(0);
const [options ,setOptions] = useState();
  const [counter1 , setcounter1] = useState(0);
  useEffect(() => {
    let d=new Date()
    axios.get(`https://www.apialmaktaba.inspira-jendouba.org/almaktaba_api/library66.php?action=getallfiles&d=${d}`).then(res => {
      setallFiles(res.data.files)
      const options = res.data.files.map((option) => {
        let firstLetter = "  ";
        if(option.name_file[0]){
           firstLetter = option.name_file[0].toUpperCase();

        }
        return {
          firstLetter:firstLetter,
          ...option,
        };
      });

    let something = res.data.files.map(value=>{
        return(
          <button onClick={()=>openModal(value)} className="btn_open">
              <Event_item_Container data={value} />
          </button>
          )
    });
    let something2 =    <Autocomplete style={{width : "100%"}}
    id="grouped-demo"
    options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
    groupBy={(option) => option.firstLetter}
    getOptionLabel={(option) => option.name_file}
    sx={{ width: 300 }}
    renderInput={(params) => <TextField 
      onChange={(event)=>{
        ReactDOM.render(something2, document.getElementById('searchfiles_container'));
        const something = allFiles.map(item=>{
        if(item.name_file.includes(event.target.value)){
          console.log(item.name_file) 
          return(
<button onClick={()=>openModal(item)} className="btn_open">
                <Event_item_Container data={item} />
              </button>
            )
        } })}}
       {...params} label="Selon la Catégorie où le nom du Document" />}
  />;
    ReactDOM.render(something2, document.getElementById('searchfiles_container'));
    ReactDOM.render(something, document.getElementById('files_container'));
      })
    
  },[counter1]);
    
const customStyles = {
    content: {
      width : 'fit-content',
      heigth : '90%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginTop: '30px',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background : 'transparent',
      border : '0'
    },
  };
  const customStyles1 = {
    content: {
      top: '50%',
      left: '50%',
      height : '90%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      
      width : '90%',
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
          style={customStyles}
          contentLabel="Example Modal"
          appElement={document.getElementById('app')}
        >
          <AddFile counter1={counter1 }  setcounter1 ={setcounter1} closeModal1={closeModal1 } />
        
          <button className='close_btn' onClick={()=>{closeModal1()}}>x</button>
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
             <button className='close_btn' onClick={()=>{closeModal()}}>x</button>
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
                    
                    
                    <h3 className='h3_main_page_events'>Recherche</h3><br/>
                    <div className="" id="searchfiles_container">
                      
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