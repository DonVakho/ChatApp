const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
const socketio = require('socket.io')
const express = require('express')
const http = require('http')
const cors = require('cors')
const schema = require( './schema/schema')
const router = require('./router')

const {
    addUser,
    getUser,
    removeUser,
    getAllUsersInRom
} = require('./users')

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

//connect to database
const uri = "mongodb+srv://user_vakho:123@chatapp-nisch.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('connnected to mongodb');
})

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, callbakc) => {
        const { user, error } = addUser({ id: socket.id, name, room })
        if (error) {
            return callbakc(error)
        } else {
            socket.join(user.room)

            socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` })
            socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined !` })
            
            io.to(user.room).emit('roomData', { room: user.room, users: getAllUsersInRom(user.room) })
            
            callbakc()
        }

    })

    socket.on('sendMessage', (message, callbakc) => {
        var user = getUser(socket.id)
        io.to(user.room).emit('message', { user: user.name, text: message })
        callbakc()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user) {
            console.log(`deleted user ${user.name}` );
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has left` })
            io.to(user.room).emit('roomData', { room: user.room, users: getAllUsersInRom(user.room) })
        }
    })
})

app.use(router)
app.use(cors())
app.use('/entrance', graphqlHTTP({
    schema,
    graphiql: true
}));

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
