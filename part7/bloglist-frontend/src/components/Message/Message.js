import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './Message.css'

const Message = () => {
    const [style, setStyle] = useState({ border: '0px' })
    const [show, setShow] = useState(false)
    let timer
    const message = useSelector((state) => state.message)

    const checkMessage = () => {
        if (message) {
            setShow(true)
            if (message.content !== null) {
                clearTimeout(timer)
                if (message.error) {
                    let object = {
                        border: '3px solid #b30000',
                        color: '#b30000'
                    }
                    setStyle(object)
                } else {
                    let object = {
                        border: '3px solid lightgreen',
                        color: 'lightgreen'
                    }
                    setStyle(object)
                }

                if (timer) clearTimeout(timer)
                timer = setTimeout(() => {
                    setShow(false)
                }, 5000)
                return () => clearTimeout(timer)
            }
        }
    }

    useEffect(checkMessage, [message])

    return (
        <div>
            {show ? (
                <div className="Message">
                    <div className="content" style={style}>
                        {message.content}
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default Message
