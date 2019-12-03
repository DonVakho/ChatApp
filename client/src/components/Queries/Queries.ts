import { gql } from 'apollo-boost'

export const GET_ROOM_CONFIRMATION = gql`
query($roomName: String!){
    room(roomName: $roomName){
        roomName
    }
}
`
export const GET_USER_CONFIRMATION = gql`
query($userName: String!, $password: String!){
    userConf(userName: $userName, password: $password){
    userName,
    roomId
  }
}
`

export const GET_ROOM_BY_ID = gql`
query($id: String!){
    room(roomName: $id){
        roomName
    }
}
`

export const ADD_ROOM = gql`
mutation($roomName: String!){
    addRoom(roomName: $roomName){
        id,
        roomName
    }
}
`
export const ADD_USER = gql`
mutation($userName: String!, $password: String!, $roomId: String!){
  addUser(userName: $userName, password: $password, roomId: $roomId){
    userName
  }
}
`