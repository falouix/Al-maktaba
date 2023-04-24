
import react , {useState,useEffect } from 'react';
import axios from 'axios';
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
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import AddEvent from '../event/add_event/AddEvent';
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
function Clubdetails() {
    
    let  userId  = useParams();
    const [club,setClub] = useState({})
    async function  getClub (id){
        let item=
          await axios.get(`https://www.apialmaktaba.inspira-jendouba.org/almaktaba_api/clubs.php?action=getclub&id=`+id)
              .then( function(res)  {
                let item;
                console.log("res.data",res.data.clubs[0])
             setClub(res.data.clubs[0])
             return(item)
             }).catch(function (error) {
                console.log(error);
             }); 
             return item
      }
      useEffect(() => {
        getClub (userId.id)
      },[]);
      
    return(
        <>
            <Navbar />
            <div className='Dashboard_container'>
                <div className='side_container'>
                    <SideBar />
                </div>
                <div className='dashboard_main'>
                <img className='club_details_banner'
                        src={"https://www.apialmaktaba.inspira-jendouba.org/almaktaba_api/"+club.banner_dir}/>
                      <div className='clubdetails_header'>
                        <img 
                        className='club_details_logo'
                        src={"https://www.apialmaktaba.inspira-jendouba.org/almaktaba_api/"+club.logo_dir}/>
                        
                        <div className='clubdetails_header_btn_container'>
                        <h2>{club.name_club}</h2>
                        <hr className=''/>
                        <p>
                        {club.description_club} 
                        </p>
                        </div>
                        <div className='clubdetails_header_btn_container'>
                            <button className="thm-btn margin_top_5">
                                    <span>Rejoindre</span>
                            </button>
                            <button className="thm-btn margin_top_5" >
                                    <span>Inviter</span>
                            </button>
                        </div>
                      </div>
                </div>
            </div>
        </>
    )
}
export default Clubdetails;