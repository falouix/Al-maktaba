
import react , {useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import SideBar from '../dashboard/SideBar';
import Navbar from '../navbar/Navbar';
import Club_item_Container from './club_item_container/club_item_Container';
import AddNew from '../status/addNew/AddNew';
import { BiSearchAlt } from "react-icons/bi";
import Modal from 'react-modal';
import Cover_banner from '../../assets/dashboard_assets/events_assets/Cover_banner.png'
import AddClub from './add_club/AddClub';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './club.css'
const customStyles = {
  content: {
    width: '400px',
    heigth :'100hv',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding : '10px',
    background : '#ededed',
    borderRadius : '10px',
    border : '1px solid red'
  },
};

Modal.setAppElement('#root');
function Clubs() {
  let navigate = useNavigate()
  const handleClick = () => {
    console.log('Button clicked');
  };

    const  openClubpage = (id)=>{
        console.log(id)
        navigate(id)
    }
    const [test,settest] = useState(0);
    const [allClubs,setAlllClubs] = useState([]);
function AllClubs (){
  let d=new Date()
  var items =[];
    axios.get(`https://www.apialmaktaba.inspira-jendouba.org/almaktaba_api/clubs.php?action=getallclubs&d=${d}`)
    .then( res => {
         res.data.clubs.forEach((key,value)=>{
          items.push(key)
       })
       setAlllClubs(items)
    })
}
let allClubsItems=allClubs.map(item=>{
    return (
        <button onClick={event=>{openClubpage(item.id_club)}} className="btn_open">
                <Club_item_Container data={item}/>
            </button>
    )
});
// search or something
const options = allClubs.map((option) => {
    console.log( option.name_club.toUpperCase())
    const firstLetter = option.name_club.toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

    useEffect(() => {
        AllClubs();
        
      },[test]);
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
            <AddClub settest={settest} test={test} closeModal1={closeModal1}/>
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
                        <h3 className='h3_main_page_events'>Recherche</h3><br/>
                    <Autocomplete
                      className='Autocomplete_addclub'
                      id="grouped-demo"
                      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                      groupBy={(option) => option.firstLetter}
                      getOptionLabel={(option) => option.name_club}
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} label="Taper Le Nom Du Club" />}
                    />
                    </div>
                    <hr width = "95%"/>
                    <h3 className='h3_main_page_university'>Liste Des Clubs</h3>
                    <div className='events_container'>
                        {allClubsItems}
                    </div>
                        <h5 className='voir_plus'>Voir plus</h5>
                    <hr width = "95%"/>
            </div>
        </div>
        </>
    )
}
export default Clubs;