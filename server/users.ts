import { IUser, IErrorObject } from '../client/src/components/interfaces'

var users: IUser[] = []

export const addUser = ({ id, name, room }): IUser | IErrorObject => {
    const existingUser = users.find((user) => user.room === room && user.name === name);

    if (existingUser) {
        return { message: 'Username is taken' }
    }

    let newUser: IUser = { id, name, room }

    users.push(newUser)

    return newUser
}

export const removeUser = (id: string) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

export const getUser = (id: string) => users.find((user) => user.id === id)

export const getAllUsers = (room: string) => users.filter((user)=> user.room === room)