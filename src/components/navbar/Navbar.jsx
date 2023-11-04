import './Navbar.css';
import { RiBookMarkFill, RiMessage3Fill, RiNotification2Fill, RiUser3Fill, RiMenuLine } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import main_logo from '../../assets/maktabalogo.png';
import User_logo from '../../assets/user-3-fill.svg';
import Menu_logo from '../../assets/menu-line.svg';
import axios from 'axios';
import Environment from '../../environment';
import { useNavigate } from "react-router-dom";
import SideBar from '../dashboard/SideBar';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../handlenotification/counterSlice'
import { useEffect, useState } from 'react';

export default function Navbar() {
  const notifCount = useSelector((state) => state.counter.value)
  const [notifCount1, setnotifCount1] = useState()
  const [msgnotifCount1, setMsgnotifCount1] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [notifShow, setNotifShow] = useState(false)
  const [searchShow, setSearchShow] = useState(false)
  const [notifs, setNotifs] = useState([])
  const [msgNotiftxt, setMsgNotiftxt] = useState()
  const [Notiftxt, setnotifsftxt] = useState()
  const [searchIndex, setSearchIndex] = useState()

  const [xx, setxx] = useState(0)
  useEffect(() => {
    let d = new Date()
    let id = JSON.parse(localStorage.getItem('user')).id_students;
    axios.get(`${Environment.api_url}notifications.php?d=${d}&id=${id}&action=getmsgs`)
      .then(res => {
        console.log(res.data.notifsmsgs)
        setMsgnotifCount1(res.data.notifsmsgs.length)
        setMsgNotiftxt(`vous avez ${res.data.notifsmsgs.length} nouveaux messages`)
      })
    axios.get(`${Environment.api_url}notifications.php?d=${d}&id=${id}&action=getnotifs`)
      .then(res => {
        console.log(res.data.notifs)
        let n = notifs;
        n.push(res.data.notifs)
        setNotifs(res.data.notifs)
        setnotifCount1(res.data.notifs.length)
        setnotifsftxt(`vous avez ${res.data.notifs.length} nouveaux messages`)
      })
  }, []);
  useEffect(() => { }, [xx]);
  return (
    <>
      <div className={!searchShow ? 'searchinputContainer' : 'searchinputContainer show'}>
        <input onChange={(e) => {
          e.preventDefault()
          setSearchIndex(e.target.value)
        }} type="text" placeholder='Recherche' />
        <button >
          <a href={`/search/${searchIndex}`}>
            <AiOutlineSearch className='icons'></AiOutlineSearch>
          </a>
        </button>
      </div>
      <div className={!notifShow ? 'NotificationContainer' : 'NotificationContainer show'}>
        <ul>
          {notifs && notifs.length > 0 && notifs.map((item) => {
            console.log('what the f', item)
            let txt = <a></a>;
            if (item.type_notifications == 0) {
              txt = <a href='event'>{item.login_student + 'a ajouter une nouveau Event'}</a>;
            }
            if (item.type_notifications == 2) {
              txt = <a href='club'>{item.login_student + ' a ajouter une nouveau club'}</a>;
            }
            if (item.type_notifications == 1) {
              txt = <a href='bibliotheque'>{item.login_student + ' a ajouter une nouveau document'}</a>;
            }
            return (<li onClick={() => {
              const index = notifs.indexOf(item);

              if (index > -1) { // only splice array when item is found
                setxx(xx + 1)
                setNotifs(notifs.splice(index, 1)); // 2nd parameter means remove one item only

                setnotifCount1(notifs.length)
                if (!notifs.length) {
                  setNotifs([])
                }
              }
              setNotifShow(false)
            }}>
              {txt}
            </li>)
          })}
        </ul>
      </div>
      <nav className="nav custom_adds">
        <input type="checkbox" id='checkleft' name="group1[]" />
        <label for="checkleft" className="checkbtnleft">
          <img src={User_logo} style={{ width: '40px' }} />
        </label>
        <img src={main_logo} className="main_logo" onClick={() => {
          navigate('/dashboard');
        }} />
        <input type="checkbox" id='check' name="group1[]" />
        <label for="check" className="checkbtn">
          <img src={Menu_logo} style={{ width: '40px' }} />
        </label>
        <ul>
          <li className="navbarli" onClick={() => {
            setSearchShow(!searchShow)
          }}>
            <AiOutlineSearch className='icons'></AiOutlineSearch>
            <span>Rechercher</span>
          </li>
          <li className="navbarli">
            <a href="/bibliotheque">
              <RiBookMarkFill className='icons'></RiBookMarkFill>
              <span>Biblio</span>
            </a>
          </li>
          <div className=''>{msgnotifCount1}</div>
          <li className="navbarli">
            <a href="/messanger">
              <RiMessage3Fill className='icons'></RiMessage3Fill>
              <span>Message</span>
            </a>
          </li>

          <div className='notif_container'>{notifCount1}</div>


          <li className={!notifShow ? 'navbarli' : 'navbarli active'} onClick={() => {
            setNotifShow(!notifShow)
          }}>
            <RiNotification2Fill className='icons'></RiNotification2Fill>
            <span>Notifications</span>
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