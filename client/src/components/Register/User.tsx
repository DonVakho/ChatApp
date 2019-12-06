import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'

import {
    FormControl,
    FormHelperText
} from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {
    BlueButtonSecondPage,
    BackButton
} from '../Styled'

import {
    GET_ROOM_BY_ID,
    CHECK_USERNAME_AVAILABLE,
    ADD_USER
} from '../Queries'

import { History, LocationState } from "history";
import Store from '../Stores/Store';
import Footer from '../Footer';

interface IProps {
    history: History<LocationState>;
}

class CreateUser extends Component<IProps, { userName: string, password: string, roomId: string, error: boolean, errorMessage: string }> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            userName: '',
            password: '',
            roomId: Store.getRoom().roomId,
            error: false,
            errorMessage: ''
        }
        Store.setUser()
    }

    render() {
        const userForm = (
            <ApolloConsumer>
                {client => (
                    <FormControl className="joinInnerContainer">
                        <h1 className="heading">Register User</h1>
                        <input
                            placeholder="Username"
                            className="joinInput"
                            type="text" onChange={
                                (event) => this.setState({ userName: (event.target.value) })
                            } />
                        <input
                            placeholder="Password"
                            className="joinInput mt-20"
                            type="password" onChange={
                                (event) => this.setState({ password: (event.target.value) })
                            } />
                        <input
                            placeholder="Room ID"
                            className="joinInput mt-20"
                            type="text"
                            value={Store.getRoom().roomId ? Store.getRoom().roomId : undefined}
                            onChange={
                                (event) => this.setState({ roomId: (event.target.value) })
                            } />
                        <div style={{ flex: 1, flexDirection: 'row' }}>
                            <BlueButtonSecondPage onClick={async (e) => {
                                e.preventDefault()
                                if (!this.state.userName || !this.state.password || !this.state.roomId) {
                                    this.setState({ errorMessage: 'Please fill all the fields', error: true })
                                } else {
                                    const checkRoom = await client.query({
                                        query: GET_ROOM_BY_ID,
                                        variables: {
                                            id: this.state.roomId,
                                        }
                                    })
                                    const usersInRoom = await client.query({
                                        query: CHECK_USERNAME_AVAILABLE,
                                        variables: {
                                            roomId: this.state.roomId,
                                        }
                                    })

                                    const sameName = usersInRoom.data.usersInRoom.filter(item => item.userName === this.state.userName)
                                    console.log(sameName)
                                    if (!checkRoom.data.roomById) {
                                        this.setState({ errorMessage: 'Room wasn\'t found, please check room ID', error: true })
                                    } else if (sameName.length>0) {
                                        this.setState({ errorMessage: 'The username is taken', error: true })
                                    } else {
                                        const { data } = await client.mutate({
                                            mutation: ADD_USER,
                                            variables: {
                                                userName: this.state.userName,
                                                password: this.state.password,
                                                roomId: this.state.roomId
                                            }
                                        })
                                        Store.setUser({
                                            userName: data.addUser.userName,
                                            roomId: data.addUser.roomId
                                        })
                                        Store.setRoom(checkRoom.data.roomById.roomName, data.addUser.roomId)
                                        this.props.history.push('/chat')
                                    }
                                }
                            }}>Register</BlueButtonSecondPage>
                            <BackButton onClick={() => { this.props.history.push('/') }}>
                                <ArrowBackIcon />
                            </BackButton>
                        </div>
                        <FormHelperText
                            error={this.state.error}
                            style={{ display: (this.state.error) ? '' : 'none' }}>
                            {this.state.errorMessage}
                        </FormHelperText>
                    </FormControl>
                )}
            </ApolloConsumer>
        )

        return (
            <>
                <div className="joinOuterContainer">
                    {userForm}
                </div>
                <Footer />
            </>
        )
    }
}

export default CreateUser