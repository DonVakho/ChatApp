import {observable} from 'mobx'
import {IUser} from'../../../../common/interfaces'

class UserStore {
    
    @observable 
    private user: IUser = {
        id: '',
        name: '',
        room: ''
    }

    @observable
    private unauthorizedAttempt : boolean = false

    public setUser(user: IUser){
        this.user = user
    }

    public getUser(): IUser {
        return this.user
    }

    public getUnauthorizedAttempt(): boolean{
        return this.unauthorizedAttempt
    }

    public setUnauthorizedAttempt(value: boolean){
        this.unauthorizedAttempt = value
    }
}

export default new UserStore()