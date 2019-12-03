import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'

import {
    IErrorObject,
    ISocketEvent
} from '../../interfaces'

import UserStore from '../Stores/Store'

import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'

import './Chat.css'

var socket: any;

const Chat = observer(() => {
    const ENDPOINT: string = 'localhost:5000'
    var [loggedUser] = useState(UserStore.getUser())
    var [message, setMessage] = useState('')
    var [messages, setMessages] = useState([] as ISocketEvent[])

    if (!loggedUser.userName || !loggedUser.roomId) {
        UserStore.setUnauthorizedAttempt()
        return <Redirect to='/' />
    } else {
        UserStore.setUnauthorizedAttempt(false)
        useEffect(() => {
            socket = io(ENDPOINT)
            socket.emit('join', { name: loggedUser.userName, room: loggedUser.roomId }, (error: IErrorObject) => {
                if (error)
                    alert(error.message)
            })
            return () => {
                socket.emit('disconnect')
                socket.off();
            }
        }, [ENDPOINT, loggedUser.userName, loggedUser.roomId])

        useEffect(() => {
            socket.on('message', (message: ISocketEvent) => {
                setMessages([...messages, message])
            })
        }, [messages])
    }

    const sendMessage = (event: any) => {
        event.preventDefault()
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={loggedUser.roomId} />
                <Messages messages={messages} name={loggedUser.userName} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
})

export default Chat