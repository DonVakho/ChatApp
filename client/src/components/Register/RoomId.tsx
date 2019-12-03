import React, { useState } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import {
    BlueButtonSecondPage,
    BackButton
} from '../StyledComponents/Styled'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Store from '../Stores/Store';

const RoomId = observer(() => {
    var [roomId] = useState(Store.getRoom().roomId)
    return (
        <div className="outerContainer">
            <div className="joinInnerContainer">
                <Card>
                    <CardContent>
                        <Typography color="textSecondary">
                            Copy and use this roomId to register User
                    </Typography>
                        <hr />
                        <Typography variant="h5" component="h2">
                            {roomId}
                        </Typography>
                    </CardContent>

                </Card>
                <div style={{ flex: 1, flexDirection: 'row' }}>
                    <Link to="/register-user" >
                        <BlueButtonSecondPage> Register User</BlueButtonSecondPage>
                    </Link>
                    <Link to="/create-room" >
                        <BackButton>
                            <ArrowBackIcon />
                        </BackButton>
                    </Link>
                </div>
            </div>
        </div>
    )
})

export default RoomId