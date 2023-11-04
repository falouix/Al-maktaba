import react, { useState, useEffect } from 'react';
import axios from 'axios';
import './Messanger.css';
function ChatContainer(props) {

    const [message, setMessage] = useState();
    var messages = [];
    const [relMessage, setrelMessage] = useState([]);
    const [roomId, setRoomId] = useState('');
    const [sentMessage, setSentMessage] = useState({});
    const [users, setUsers] = useState([]);
    const [usersToconnect, setUsersToconnect] = useState({});
    const userName1 = JSON.parse(localStorage.getItem('user')).login_student;
    const [connected, setConnected] = useState(false)
    const userId = JSON.parse(localStorage.getItem('user')).id_students;
    //socket.emit("join-connected-list", { userName: userName1, userId: userId })
    // handle sending private message
    function updateMessages() {
        messages.push({
            message: message,
            roomId: 'reply',
            userId: usersToconnect.userId,
            username: JSON.parse(localStorage.getItem('user')).login_student
        }
        );
    }
    function handleSendMessage() {
        // send private message
        let roomId = usersToconnect.roomId;
        socket.emit('private-message', { roomId, message, userId });
        setMessage('')
    };
    useEffect(() => {
        // handle incoming messages
        socket.on('private-message', (data) => {
            let something = relMessage
            something.push(data);
            setrelMessage(something)
            console.log(relMessage)
        });
    }, [relMessage]);
    return (

        <div className="Chat_Content">
            {/* Chat time */}
            <div className="Chat_Date">Jul 16, 2022, 06:15 am</div>
            {/* Chat message left */}
            {relMessage && relMessage.map(item => {
                console.log('something should render', item)
                if (item.username != 'reply') {
                    return (
                        <div className="Message_Container_left">
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
                        <div className="Message_Container_right">
                            <div className="flex_Message">
                                <div className="Chat_Message_and_Time">
                                    <div className="Chat_Messages_Right">{item.message}</div>
                                    <div className="Chat_Time">6:16 AM</div>
                                </div>
                            </div>
                        </div>)
                }
            })}
        </div>
    )
}
export default ChatContainer;