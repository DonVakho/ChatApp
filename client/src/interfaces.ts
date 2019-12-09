export interface IUser {
    id: string,
    userName: string,
    roomId: string
}

export interface IRoom {
    roomName: string,
    roomId: string
}

export interface IErrorObject {
    message: string,
}

export interface IAddUserReturn {
    user: IUser,
    error: IErrorObject
}

export interface ISocketEvent {
    user: string,
    text: string
}

export interface IOtherUsers {
    userName: string,
    lastActive: string
}