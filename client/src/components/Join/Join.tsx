import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'
import { History, LocationState } from "history";

import {
    FormControl,
    FormHelperText,
} from '@material-ui/core';

import {
    GreenButton,
    BlueButton,
    PurpleButton
} from '../Styled'

import {
    GET_USER_CONFIRMATION,
    UPDATE_ACTIVE_STAUS
} from '../Queries'

import Store from '../Stores/Store'
import Footer from '../Footer'
import './Join.css';

interface IProps {
    history: History<LocationState>;
}

class Join extends Component<IProps, { userName: string, password: string, error: boolean, errorMessage: string }> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            userName: '',
            password: '',
            error: false,
            errorMessage: ''
        }
        Store.setUser()
    }

    render() {
        const loginForm = (
            <ApolloConsumer>
                {client => (
                    <FormControl className="joinInnerContainer">
                        <h1 className="heading">Sign In</h1>
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

                        <GreenButton variant="outlined" onClick={async (e) => {
                            e.preventDefault()
                            if (!this.state.userName || !this.state.password) {
                                this.setState({ errorMessage: 'Please fill Username and Password', error: true })
                            } else {
                                const { data } = await client.query({
                                    query: GET_USER_CONFIRMATION,
                                    variables: {
                                        userName: this.state.userName,
                                        password: this.state.password
                                    }
                                })
                                if (!data.userConf) {
                                    this.setState({ errorMessage: 'Username or Password is incorect', error: true })
                                } else {
                                    Store.setUser({
                                        id: data.userConf.id,
                                        userName: data.userConf.userName,
                                        roomId: data.userConf.roomId
                                    })
                                    Store.setRoom(data.userConf.room.roomName, data.userConf.roomId)
                                    const {errors} = await client.mutate({
                                        mutation: UPDATE_ACTIVE_STAUS,
                                        variables: {
                                            id: data.userConf.id
                                        }
                                    })
                                    if (errors) {
                                        alert("some error")
                                    }
                                    this.props.history.push('/chat')
                                }
                            }
                        }}>Sign In</GreenButton>
                        <div style={{ flex: 1, flexDirection: 'row' }}>
                            <BlueButton
                                variant="outlined"
                                className="mt-20-r"
                                onClick={() => { this.props.history.push('/register-user') }} >
                                Register User
                            </BlueButton>
                            <PurpleButton
                                variant="outlined"
                                className="mrg-l wdt-half"
                                onClick={() => { this.props.history.push('/create-room') }} >
                                Create Room
                            </PurpleButton>
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
                    {loginForm}
                </div>
                <Footer />
            </>
        )
    }
}

export default Join