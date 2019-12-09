import React, { useState } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import Tooltip from '@material-ui/core/Tooltip';
import { ApolloConsumer } from 'react-apollo'


import copy from 'clipboard-copy'

import {
    UPDATE_ACTIVE_STAUS
} from './Queries'

import Store from './Stores/Store'

const NavBar = () => {
    const [user] = useState(Store.getUser())
    var [showId, setShowID] = useState(false)

    return (
        <ApolloConsumer>
            {client => (
                <Navbar bg="dark" variant="dark" fixed="top">
                    <Navbar.Brand>{user.userName}</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href='/' onClick={async (e) => {
                            const { errors } = await client.mutate({
                                mutation: UPDATE_ACTIVE_STAUS,
                                variables: {
                                    id: user.id,
                                }
                            })
                            if (errors) {
                                alert("some error")
                            }
                        }}>Home</Nav.Link>
                        <Nav.Link
                            onClick={() => setShowID(!showId)}>
                            {showId ? "Hide roomId" : "Show roomId"}
                        </Nav.Link>
                        {showId ?
                            <Tooltip title="click to copy">
                                <Nav.Link onClick={() => { copy(user.roomId) }}>
                                    {user.roomId}
                                </Nav.Link>
                            </Tooltip>
                            : <></>
                        }
                    </Nav>
                </Navbar >
            )}
        </ApolloConsumer>
    )
}

export default NavBar