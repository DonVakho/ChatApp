import React from 'react';
import ReactEmoji from 'react-emoji';
import { ApolloConsumer } from 'react-apollo'

import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button
} from '@material-ui/core'

import {
    UPDATE_ACTIVE_STAUS
} from '../Queries'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { IOtherUsers } from '../../interfaces'

interface IProps {
    others: IOtherUsers[],
    thisUserName: string
    thisUserId: string
    
}

const StatusNotice = ({ others, thisUserName, thisUserId }: IProps) => (
    <ApolloConsumer>
        {client => (
            <Card style={{ marginTop: '20%' }}>
                <CardContent>
                    <Typography >
                        Nobody joined yet {ReactEmoji.emojify(':(')}
                    </Typography>
                    <hr />
                    <Typography color="textSecondary">
                        last active status:
            </Typography>
                    {others.filter((user => user.userName !== thisUserName))
                        .map(user => {
                            return <Typography key={user.userName}>
                                {user.userName}: {new Date(user.lastActive).toLocaleString()} <br />
                            </Typography>
                        })}
                </CardContent>
                <CardActions>
                    <Button size="small" href='/' onClick={async (e) => {
                        const { errors } = await client.mutate({
                            mutation: UPDATE_ACTIVE_STAUS,
                            variables: {
                                id: thisUserId,
                            }
                        })
                        if(errors){
                            alert("some error")
                        }
                    }}><ArrowBackIosIcon />Back to Home</Button>
                </CardActions>
            </Card>
        )}
    </ApolloConsumer>
)


export default StatusNotice