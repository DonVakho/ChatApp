import React from 'react'

import onlineIcon from '../../icons/onlineIcon.png'
import closeIcon from '../../icons/closeIcon.png'
import { IRoom } from '../../interfaces';

import './InfoBar.css'

interface IProps {
    room: IRoom
    socket: any
}

const InfoBar = ( prpos : IProps) => (

    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="online" />
            <h3>room: {prpos.room.roomName}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href='/'>
                <img src={closeIcon} alt="close" />
            </a>
        </div>
    </div>
)

export default InfoBar