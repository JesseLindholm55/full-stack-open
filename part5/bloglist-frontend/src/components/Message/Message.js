import React, { useState, useEffect } from 'react'
import './Message.css'

const Message = (props) => {
    const [style, setStyle] = useState({ border: '0px' })
    const [show, setShow] = useState(false)
    let timer

    const checkMessage = () => {
        if (props.message.content !== '') {
            setShow(true)
            clearTimeout(timer)
          
            if (props.message.error) {
                let object = { border: '3px solid #b30000', color: '#b30000' }
                setStyle(object)
            } else {
                let object = { border: '3px solid lightgreen', color: 'lightgreen' }
                setStyle(object)
            }
          
            timer = setTimeout(() => {
                setShow(false)
            }, 5000)

        }
    }


    useEffect(checkMessage, [props.message])


    return (
        <div>

            {show ?  
                <div className='Message'>
                    <div className='content' style={style}>{props.message.content}</div>
                </div>
                : null}

        </div>

    )
}

export default Message
