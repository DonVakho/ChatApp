import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'

import {
    IErrorObject,
    ISocketEvent
} from '../../interfaces'

import UserStore from '../stores/UserStore'

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

    if (!loggedUser.name || !loggedUser.room) {
        UserStore.setUnauthorizedAttempt(true)
        return <Redirect to='/' />
    } else {
        UserStore.setUnauthorizedAttempt(false)
        useEffect(() => {
            socket = io(ENDPOINT)
            socket.emit('join', { name: loggedUser.name, room: loggedUser.room }, (error: IErrorObject) => {
                if (error)
                    alert(error.message)
            })
            return () => {
                socket.emit('disconnect')
                socket.off();
            }
        }, [ENDPOINT, loggedUser.name, loggedUser.room])

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
                <InfoBar room={loggedUser.room}/>
                <Messages messages={messages} name={loggedUser.name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div> 
        </div>
    )
})

export default Chat