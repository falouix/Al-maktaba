import './Navbar.css';
import { RiBookMarkFill,RiMessage3Fill,RiNotification2Fill,RiUser3Fill,RiMenuLine } from "react-icons/ri";
import main_logo from '../../assets/maktabalogo.png';
import { useNavigate } from "react-router-dom";
import SideBar from '../dashboard/SideBar';



<head>
<script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
</head>





export default function Navbar() {
  const navigate = useNavigate();
  return ( 
    <>
    <nav className="nav custom_adds">





      <input type="checkbox" id='checkleft'/>
        <label  className="checkbtnleft">
          <i className="fas fa-solid fa-user"></i>
        </label>



      
          <img src={main_logo} className="main_logo" onClick={()=>{
              navigate('/dashboard');
          }}/>
      

      
      
      <input type="checkbox" id='check'/>
        <label  className="checkbtn">
          <i className="fas fa-bars"></i>
        </label>





      <ul>
      <div className="search_container">
          <input type="text" placeholder='Recherche'/>

          <div className="search_icon_container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M11 2c4.968 0 9 4.032 9 9s-4.032 9-9 9-9-4.032-9-9 4.032-9 9-9zm0 16c3.867 0 7-3.133 7-7 0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7zm8.485.071l2.829 2.828-1.415 1.415-2.828-2.829 1.414-1.414z" fill="rgba(135,135,135,1)"/></svg>
          </div>
        </div>
        <li className="navbarli">
        <a href="/bibliotheque">
          <RiBookMarkFill className='icons'></RiBookMarkFill>
          <span>Biblio</span>
        </a>
        </li>
        <li className="navbarli">
        <a href="/messanger">
        <RiMessage3Fill className='icons'></RiMessage3Fill>
          <span>Message</span>
        </a>
        </li>
        
        <div className='notif_container'>3</div>

        
        <li className="navbarli">
          <a href="/notification">
          <RiNotification2Fill className='icons'></RiNotification2Fill>
                      <span>Notif</span>
          </a>
        </li>
        <li className="navbarli">
          <a href="/profile">
          <RiUser3Fill className='icons'></RiUser3Fill>
          <span>Profile</span>
          </a>
        </li>
        <li className="navbarli">
          <a href="/options">
          <RiMenuLine className='icons'></RiMenuLine>
            <span>Options</span>
          </a>
        </li>
      
      </ul>

      <div className='side_container_mobile' id="mobileC">
            <SideBar />
        </div>
    </nav>
        </>
  )
}