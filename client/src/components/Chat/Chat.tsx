import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'

import {
    IErrorObject,
    ISocketEvent,
    IOtherUsers
} from '../../interfaces'

import Store from '../Stores/Store'

import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import NavBar from '../NavBar'
import StatusNotice from './StatusNotice'

import './Chat.css'

var socket: any;

const Chat = observer(() => {
    const ENDPOINT: string = Store.HOST + ':5000'
    var [loggedUser] = useState(Store.getUser())
    var [room] = useState(Store.getRoom())
    var [users, setUsers] = useState([]);
    var [message, setMessage] = useState('')
    var [messages, setMessages] = useState([] as ISocketEvent[])
    var [color, setColor] = useState("primary" as any)
    var [others, setothers] = useState([] as IOtherUsers[])

    if (!loggedUser.userName || !room.roomName) {
        Store.setUnauthorizedAttempt()
        return <Redirect to='/' />
    } else {
        Store.setUnauthorizedAttempt(false)

        useEffect(() => {
            fetch(`${Store.HOST}:5000/entrance?query={usersInRoom(roomId:"${room.roomId}"){userName,lastActive}}`)
                .then(res => res.json())
                .then(res => setothers(res.data.usersInRoom))
        }, [room.roomId, users])

        useEffect(() => {
            socket = io(ENDPOINT)

            socket.emit('join', { name: loggedUser.userName, room: room.roomId }, (error: IErrorObject) => {
                if (error)
                    alert(error.message)
            })
        }, [ENDPOINT, loggedUser.userName, room.roomId])

        useEffect(() => {
            socket.on('message', (message: ISocketEvent) => {
                setMessages([...messages, message])
            })

            socket.on('roomData', ({ users }) => {
                setUsers(users);
            })

            return () => {
                socket.emit('disconnect')
                socket.off();
            }

        }, [messages])
    }

    window.setTimeout(() => {
        if (color === 'primary') {
            setColor('secondary')
        } else {
            setColor('primary')
        }
    }, 6000);

    const sendMessage = (event: any) => {
        event.preventDefault()
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    const chatWindow = (
        <div className="container">
            <InfoBar room={room} socket={socket} />
            <Messages messages={messages} name={loggedUser.userName} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
    )

    const waitingWindow = (
        <div>
            <div className="spinerContainer">
                <CircularProgress color={color} size="300px" />
            </div>
            <StatusNotice others={others} thisUserName={loggedUser.userName} thisUserId={loggedUser.id} />
        </div>
    )

    return (
        <div className="outerContainer">
            <NavBar />
            {users.length > 1 ? chatWindow : waitingWindow}
        </div>
    )
})

export default Chat