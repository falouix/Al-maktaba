import React, { useEffect, useState, useRef } from 'react'
import ChatBar from './ChatBar'
import ChatFooter from './ChatFooter'
import socketIO from "socket.io-client";
import "./messagin.css"
const ChatPage = () => {

    const socket = socketIO.connect("localhost:5000")

    const userName1 = JSON.parse(localStorage.getItem('user')).login_student;
    const [connected, setConnected] = useState(false)
    const userId = JSON.parse(localStorage.getItem('user')).id_students;
    if (!connected) {
        socket.emit("join-connected-list", { userName: userName1, userId: userId })
        setConnected(true)
    }
    //const socket = socketIO.connect("https://vps93850.serveur-vps.net:5000/")
    const [messages, setMessages] = useState([])
    const [typingStatus, setTypingStatus] = useState("")
    const [currentChat, setCurrentChat] = useState(<></>)
    const lastMessageRef = useRef(null);

    const [users, setUsers] = useState([])
    useEffect(() => {
        socket.on("messageResponse", data => setMessages([...messages, data]))
    }, [socket, messages])

    useEffect(() => {
        socket.on('user-list', data => {
            setUsers(data)
            console.log('user-list', data)
        })
        socket.on("typingResponse", data => setTypingStatus(data))
    }, [connected])

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="chat">
            <ChatBar
                users={users}
                socket={socket}
                setCurrentChat={setCurrentChat}
                messages={messages}
                lastMessageRef={lastMessageRef}
                typingStatus={typingStatus} />
            <div className='chat__main'>
                {currentChat}
                <ChatFooter socket={socket} />
            </div>
        </div>
    )
}

export default ChatPage