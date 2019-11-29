import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'

import { IErrorObject } from '../interfaces'

import UserStore from '../stores/UserStore'

let socket: any;

const Chat = observer(() => {
    const [loggedUser] = useState(UserStore.getUser())
    const ENDPOINT: string = 'localhost:5000'
    if (!loggedUser.name || !loggedUser.room) {
        UserStore.setUnauthorizedAttempt(true)
        return <Redirect to='/' />
    } else {
        UserStore.setUnauthorizedAttempt(false)
        useEffect(() => {
            socket = io(ENDPOINT)
            socket.emit('join', { name: loggedUser.name, room: loggedUser.room }, (error: IErrorObject) => {
                alert(error.message)
            })
            return () => {
                socket.emit('disconnect')
                socket.off();
            }
        }, [ENDPOINT])
    }
    return (
        <div>
            {loggedUser.name}
        </div>
    )
})

export default Chat