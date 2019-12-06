import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'
import CreateRoom from './components/Register/Room'
import RegisterUser from './components/Register/User'
import RoomId from './components/Register/RoomId'

const App = () => (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/create-room" exact component={CreateRoom} />
      <Route path="/register-user" exact component={RegisterUser} />
      <Route path="/room-id" exact component={RoomId} />
      <Route path="/chat" exact component={Chat} />
    </Router>
)

export default App