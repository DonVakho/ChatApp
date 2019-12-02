var users = []

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    
    const existingUser = users.find((user) => user.room === room && user.name === name);

    if (existingUser) {
        return {
            error: {
                message: 'Username is taken'
            },
            user: null
        }
    }

    let newUser = { id, name, room }

    users.push(newUser)

    return {
        error: null,
        user: newUser
    }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => users.find((user) => user.id === id)

const getAllUsersInRom = (room) => users.filter((user) => user.room === room)

module.exports = { addUser, removeUser, getUser, getAllUsersInRom };