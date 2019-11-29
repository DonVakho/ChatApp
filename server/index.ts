import * as express from 'express'
import * as socketio from 'socket.io'
import * as http from 'http'
import router from './router'

import {
    addUser,
    getUser,
    removeUser,
    getAllUsersInRom
} from './users'

import {ISocketEvent, IUser} from '../common/interfaces'

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, callbakc) => {
        console.log(name, room)
        var {user, error} = addUser({id: socket.id, name, room})
        if (error) {
           return callbakc(error)
        }else{
            socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room ${user.room}`} as ISocketEvent)
            socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name}, has joined !`} as ISocketEvent)
            socket.join(user.room)
            io.to(user.room).emit('roomData', {room: user.room, users: getAllUsersInRom(user.room)})
            callbakc()
        }

    })

    socket.on('sendMessage', (message, callbakc)=>{
        var user: IUser = getUser(socket.id)
        io.to(user.room).emit('message', {user: user.name, text: message}as ISocketEvent)
        callbakc()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if(user){
            io.to(user.room).emit('message', {user: 'admin', text: `${user.name}, has left`})
            io.to(user.room).emit('roomData', {room: user.room, users: getAllUsersInRom(user.room)})
        }
    })
})

app.use(router)
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
