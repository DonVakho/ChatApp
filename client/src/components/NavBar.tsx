import React, { useState } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom'

import copy from 'clipboard-copy'

import Store from './Stores/Store'

const NavBar = () => {
    const [user] = useState(Store.getUser())
    var [showId, setShowID] = useState(false)

    return (
        <Navbar bg="dark" variant="dark" fixed="top">
            <Navbar.Brand>{user.userName}</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link><Link to="/" >Home</Link></Nav.Link>
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
    )
}

export default NavBar