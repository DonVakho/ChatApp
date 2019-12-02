import React, { Component } from 'react'

import {
    FormControl,
    FormHelperText
} from '@material-ui/core';

import {
    IUser
} from '../../interfaces'

import UserStore from '../stores/UserStore'
import './Join.css'

import { History, LocationState } from "history";

interface IProps {
    someOfYourOwnProps: any;
    history: History<LocationState>;
    someMorePropsIfNeedIt: any;
}

class Join extends Component<IProps, { inputName: string, inputRoom: string, error: boolean }> {
    constructor(props: any) {
        super(props)
        this.state = {
            inputName: '',
            inputRoom: '',
            error: false
        }
        this.logIn = this.logIn.bind(this)
        UserStore.setUser({name: '', room: '', id: ''})
    }

    logIn(event: any) {
        if (!this.state.inputName || !this.state.inputRoom) {
            event.preventDefault()
            this.setState({ error: true })
        } else {
            this.setState({ error: false })
            UserStore.setUser({
                name: this.state.inputName,
                room: this.state.inputRoom
            } as IUser)
            this.props.history.push('/chat')
        }
    }

    render() {
        const loginForm = (
            <FormControl className="joinInnerContainer">
                <h1 className="heading">Sign In</h1>
                <input
                    placeholder="Name"
                    className="joinInput"
                    type="text" onChange={
                        (event) => this.setState({ inputName: (event.target.value) })
                    } />
                <input
                    placeholder="Room"
                    className="joinInput mt-20"
                    type="text" onChange={
                        (event) => this.setState({ inputRoom: (event.target.value) })
                    } />
                <button className="button mt-20" type="button" onClick={this.logIn}>Sign In</button>
                <FormHelperText
                    error={this.state.error}
                    style={{ display: (this.state.error) ? '' : 'none' }}> Please Enter name and room
                </FormHelperText>
                <FormHelperText
                    error={UserStore.getUnauthorizedAttempt()}
                    style={{ display: (UserStore.getUnauthorizedAttempt()) ? '' : 'none' }}> nice try, enter name and room
                </FormHelperText>
            </FormControl>
        )

        return (
            <div className="joinOuterContainer">
                {loginForm}
            </div>
        )
    }
}

export default Join