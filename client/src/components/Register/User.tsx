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
} from '../StyledComponents/Styled'

import {
    GET_ROOM_BY_ID,
    ADD_USER
} from '../Queries/Queries'

import { History, LocationState } from "history";
import Store from '../Stores/Store';

interface IProps {
    someOfYourOwnProps: any;
    history: History<LocationState>;
    someMorePropsIfNeedIt: any;
}

class CreateUser extends Component<IProps, { userName: string, password: string, roomId: string, error: boolean, errorMessage: string }> {
    constructor(props: any) {
        super(props)
        this.state = {
            userName: '',
            password: '',
            roomId: '',
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
                            type="text" onChange={
                                (event) => this.setState({ password: (event.target.value) })
                            } />
                        <input
                            placeholder="Room ID"
                            className="joinInput mt-20"
                            type="text" onChange={
                                (event) => this.setState({ roomId: (event.target.value) })
                            } />
                        <div style={{ flex: 1, flexDirection: 'row' }}>
                            <BlueButtonSecondPage onClick={async (e) => {
                                e.preventDefault()
                                if (!this.state.userName || !this.state.password || !this.state.roomId) {
                                    this.setState({ errorMessage: 'Please fill all the fields', error: true })
                                } else {
                                    const roomNameAvailable = await client.query({
                                        query: GET_ROOM_BY_ID,
                                        variables: {
                                            id: this.state.roomId,
                                        }
                                    })
                                    if (!roomNameAvailable.data.room) {
                                        this.setState({ errorMessage: 'Room wasn\'t found, please check room ID', error: true })
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
            <div className="joinOuterContainer">
                {userForm}
            </div>
        )
    }
}

export default CreateUser