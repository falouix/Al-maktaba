import React, { useState, useEffect } from 'react'

import ChatBody from './ChatBody';
const ChatBar = ({ users, socket, setCurrentChat, messages, lastMessageRef, typingStatus }) => {
    const [counter, setCounter] = useState(1)
    const chooseChat = (user) => {
        setCurrentChat(<ChatBody
            messages={messages}
            lastMessageRef={lastMessageRef}
            typingStatus={typingStatus}
            data={user}
        />)
    }
    useEffect(() => {
        /*socket.on('user-list', data => {
            setUsers(data)
            console.log('user-list', data)
        })*/

    }, [socket, counter])

    return (
        <div className='chat__sidebar'>
            <h2>Open Chat</h2>
            <div>
                <h4 className='chat__header'>ACTIVE USERS</h4>
                <div className='chat__users'>
                    {users.map(user =>
                        <p
                            onClick={chooseChat(user)}
                            key={user.socketID}>
                            {user.username}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ChatBar