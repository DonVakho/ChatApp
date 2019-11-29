import * as express from 'express'
import * as socketio from 'socket.io'
import * as http from 'http'
import router from './router'

import {
    addUser,
    getUser,
    removeUser,
    getAllUsers
} from './users'

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {
    console.log('We have a new connection')
    socket.on('join', ({ name, room }, callbakc) => {
        console.log(name, room)
        const error = false
        if (error) {
            callbakc({ message: 'ther\'s a problem' })
        }

    })
    socket.on('disconnect', () => {
        console.log('User had left')
    })
})

app.use(router)
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
