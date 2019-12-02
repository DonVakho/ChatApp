export interface IUser {
    id: string
    name: string
    room: string
}

export interface IErrorObject {
    message: string
}

export interface IAddUserReturn {
    user: IUser,
    error: IErrorObject
}

export interface ISocketEvent {
    user: string,
    text: string
}