import react, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import socketIO from "socket.io-client";
import ProfilePic1 from './assets/ProfilePic.png';
import ProfilePic3 from './assets/User3.png';
import ProfilePic4 from './assets/friendlist.png';
import Navbar from '../navbar/Navbar';
import Environment from '../../environment';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../handlenotification/counterSlice'
import './Messanger.css';

const socket = socketIO('http://localhost:5000');
function Messanger() {
  const notifCount = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  const [active, setActive] = useState(false)
  const [message, setMessage] = useState();
  var messages = [];
  const [messagesRendering, setMessageRendering] = useState(<></>)
  const [relMessage, setrelMessage] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [msgNotif, setMsgNotif] = useState(0);
  const [users, setUsers] = useState([]);
  const [usersToconnect, setUsersToconnect] = useState({});
  const userName1 = JSON.parse(localStorage.getItem('user')).login_student;
  const [connected, setConnected] = useState(false)
  const userId = JSON.parse(localStorage.getItem('user')).id_students;
  const [contacts, setContacts] = useState([]);
  const sendMsg = () => {
    axios.post(`${Environment.api_url}students.php`,
      {
        action: 'sendmsg',
        id_sender: JSON.parse(localStorage.getItem('user')).id_students,
        id_reciever: usersToconnect.id_students,
        text_message: message
      }
    )
      .then(res => {
        if (res.data = "succes") {
          setMessage('');
        }
      })
  }
  // get contacts list 
  const getContacts = () => {
    let d = new Date();
    let userId = JSON.parse(localStorage.getItem('user')).id_students
    axios.get(`${Environment.api_url}notifications.php?date=${d}&id=${userId}&action=getcontacts`
    ).then(res => {
      console.log(res.data.contacts);
      setContacts(res.data.contacts)
    })
  }
  // get old mesgs of a user
  const getOldMsgs = () => {
    let d = new Date();
    let userId = JSON.parse(localStorage.getItem('user')).id_students
    axios.get(`${Environment.api_url}notifications.php?date=${d}&id=${userId}&idusersToconnect=${usersToconnect.id_students}&action=getmsgs`
    ).then(res => {
      console.log(res.data.msgs);
      let data = res.data.msgs.sort((a, b) => a.time_add > b.time_add ? 1 : -1)

      setMessageRendering(data.map((item, key) => {
        if (item.id_sender != JSON.parse(localStorage.getItem('user')).id_students) {
          return (
            <div key={key} className="Message_Container_left">
              <div className>
                <img className="profile-pub-pic55" src={ProfilePic3} alt="" />
              </div>
              <div className="flex_Message">
                <div className="Chat_Messages_Left">{item.text_message}</div>
                <div className="Chat_Time">{item.time_add}</div>
              </div>
            </div>)
        } else {
          return (
            <div key={key} className="Message_Container_right">
              <div className="flex_Message">
                <div className="Chat_Message_and_Time">
                  <div className="Chat_Messages_Right">{item.text_message}</div>
                  <div className="Chat_Time">{item.time_add}</div>
                </div>
              </div>
            </div>)
        }
      }))
    })
  }
  //socket.emit("join-connected-list", { userName: userName1, userId: userId })
  // handle sending private message
  function handleSendMessage() {
    // send private message
    console.log("usersToconnect", Object.keys(usersToconnect).length)
    if (Object.keys(usersToconnect).length > 0) {
      let roomId = usersToconnect.roomId;

    } else {
      alert('choose a friend to send msg')
    }
  };
  useEffect(() => {
    getContacts()
  }, [roomId])
  useEffect(() => {
    // handle incoming messages
    socket.on('private-message', (data) => {
      let something = relMessage
      something.push(data);
      setrelMessage(something);
      dispatch(increment())
      setMessageRendering(relMessage.map((item, key) => {
        if (item.username != 'reply') {
          return (
            <div key={key} className="Message_Container_left">
              <div className>
                <img className="profile-pub-pic55" src={ProfilePic3} alt="" />
              </div>
              <div className="flex_Message">
                <div className="Chat_Messages_Left">{item.message}</div>
                <div className="Chat_Time">6:20 AM</div>
              </div>
            </div>)
        } else {
          return (
            <div key={key} className="Message_Container_right">
              <div className="flex_Message">
                <div className="Chat_Message_and_Time">
                  <div className="Chat_Messages_Right">{item.message}</div>
                  <div className="Chat_Time">6:16 AM</div>
                </div>
              </div>
            </div>)
        }
      }))
    });
    socket.emit("join-connected-list", { userName: userName1, userId: userId })
    // handle user list updates
    socket.on('user-list', (data) => {
      console.log('data', data)
      setUsers(data);
    });

    return () => {
      // leave the chat room
      socket.emit('leave-room', { roomId });
    };
  }, [roomId]);
  return (
    <>
      <Navbar />
      <div className='Dashboard_con'>
        <div className="Big_Container">
          {/*Left Side Start*/}
          <input type="checkbox" id='checkfriends' name="group1[]" />
          <label
            onClick={() => {
              setActive(!active)
            }}
            for="checkfriends"
            className="checkbtnfriends">
            <img src={ProfilePic4} style={{ width: '40px' }} />
            <span className='msgNotifspan'>{msgNotif}</span>
          </label>
          <div
            className={active ? "frinds_list_Container show" : "frinds_list_Container"}
            id='friends_list'>
            <input type="checkbox" id='checkfriends' name="group1[]" />
            <label
              onClick={() => {
                setActive(!active)
              }}
              for="checkfriends"
              className="checkbtnfriends">
              <img src={ProfilePic4} style={{ width: '40px' }} />
            </label>
            <h4 className="Active_Header">Amis</h4>
            <form className="Friends_Search_Container">
              <input className="Friends_Search_Box" type="search" placeholder="Chercher Un Amis" />
            </form>
            {/*Profiles Exemple Start*/}
            <div className="profilesList">
              {contacts && contacts.map(user => {
                if (user.userId != JSON.parse(localStorage.getItem('user')).id_students) {
                  return (
                    <div
                      className="profile-pub55"
                      key={user.userId}
                      onClick={() => {
                        setUsersToconnect(user);
                        getOldMsgs();
                        setActive(!active)
                      }}
                    >
                      <img src={ProfilePic1} alt="Profile Picture" className="profile-pub-pic55" />
                      <span>{user.login_student}</span>
                    </div>
                  )
                }

              })}
            </div>
            {/*Profiles Exemple END*/}
          </div>
          {/*Left Side END*/}
          <div className="Right_Chat_Container">
            <div className="Active_Chat_Username_and_Messages">
              <img src={ProfilePic3} alt="Profile Picture" className="profile-pub-pic55" />
              <div className="name_and_status">
                {usersToconnect && <span>{usersToconnect.login_student} </span>}
              </div>
            </div>
            <div className="Messages_Container">
              <div className="Chat_Content">
                {/* Chat time */}
                <div className="Chat_Date">Jul 16, 2022, 06:15 am</div>
                {/* Chat message left */}
                {messagesRendering}
              </div>
            </div>
            <div className="Send_Message">
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value)
                }}
                className="Messaging_box"
                placeholder="Type a message" />
              <button
                onClick={sendMsg}
                className="thm-btn55">
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Messanger;