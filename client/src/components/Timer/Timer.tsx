import React, { useState } from 'react'

import './Timer.css'

const Timer = (() => {

  var [timeCount, setStime] = useState(180)

  setInterval(()=>{
  }, 1000)

  return (
    <div>
      <div>
        <p id="timer-label"> Session</p>
        <p id="time-left">
          {timeCount}
        </p>
      </div>
    </div>
  )
})

export default Timer