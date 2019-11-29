import { IUser, IErrorObject, IAddUserReturn } from '../common/interfaces'

var users: IUser[] = []

export const addUser = ({ id, name, room }): IAddUserReturn => {
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

    let newUser: IUser = { id, name, room }

    users.push(newUser)

    return {
        error: null,
        user: newUser
    }
}

export const removeUser = (id: string) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

export const getUser = (id: string) => users.find((user) => user.id === id)

export const getAllUsersInRom = (room: string) => users.filter((user) => user.room === room)