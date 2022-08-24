import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  let timer
  const [showNotification, setShowNotification] = useState(false)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const setNotification = () => {
    setShowNotification(false)
  }

  const setTimer = () => {
    setShowNotification(true)
    if (timer) clearTimeout(timer)
    timer = setTimeout(setNotification, 5000)
    return () => clearTimeout(timer)
  }
  
  useEffect(setTimer, [notification])
  
  return (
    <div style={style}>
      {showNotification}
      {showNotification ? <div>{notification}</div> : null}
      
    </div>
  )
}

export default Notification