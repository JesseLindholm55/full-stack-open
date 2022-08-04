import React, {useState, useEffect} from 'react';
import './Message.css';

const Message = (props) => {
  const [style, setStyle] = useState({border: "0px" })
  //let style = "color: green"
  

  const checkMessage = () => {
    console.log(props.message.content)
    if (props.message.content !== null) {
      let object = {border: "3px solid lightgreen", color: 'lightgreen'}
      setStyle(object)
    }
    

    if (props.message.error) {
      let object = {border: "3px solid #b30000", color: '#b30000'}
      setStyle(object)
    }
    
    
  }

  useEffect(checkMessage, [props.message])
  
  
  return (
  <div className="Message">
    <div className='content' style={style}>{props.message.content}</div>
  </div>
  )
};

export default Message;
