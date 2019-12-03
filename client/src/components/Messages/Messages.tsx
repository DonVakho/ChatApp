import React from 'react';

import '../../declare_modules.d.ts'

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';

import './Messages.css';

import {
  ISocketEvent
} from '../../interfaces'

interface IProps {
  messages: ISocketEvent[]
  name: string
}

const Messages = ({ messages, name }: IProps) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
  </ScrollToBottom>
);

export default Messages;