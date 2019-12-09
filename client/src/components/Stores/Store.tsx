import { observable } from 'mobx'
import { IUser, IRoom } from '../../interfaces'

class Store {
    @observable
    HOST = 'http://localhost' // http://10.99.17.16
    @observable
    private user: IUser = {
        id: '',
        userName: '',
        roomId: ''
    }

    @observable
    private room: IRoom = {
        roomName: '',
        roomId: ''
    }

    @observable
    private unauthorizedAttempt: boolean = false

    public setUser(user: IUser = { id: '', userName: '', roomId: '' }) {
        this.user = user
    }

    public getUser(): IUser {
        return this.user
    }

    public setRoom(room: string = '', id: string = '') {
        this.room.roomName = room
        this.room.roomId = id
    }

    public getRoom(): IRoom {
        return this.room
    }

    public getUnauthorizedAttempt(): boolean {
        return this.unauthorizedAttempt
    }

    public setUnauthorizedAttempt(value: boolean = true) {
        this.unauthorizedAttempt = value
    }
}

export default new Store()