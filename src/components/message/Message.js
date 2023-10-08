import React, { useState } from 'react'
import {BiMessageRounded } from 'react-icons/bi';
import '../../assets/styles/Message.scss';
import { AiOutlineClose } from 'react-icons/ai';


export function Message() {
  const [messageActive, setMessageActive] = useState(false);

  function handleActiveMessage () {
    setMessageActive(!messageActive);
  }
  return (
    <>
      {
        messageActive &&
          <div className="message_wrapper">
            <div className={`message_container ${messageActive && "active"}`}>
              <button onClick={handleActiveMessage} title='Close' className='close_message'><AiOutlineClose/></button>
              <h2>Admin Chat</h2>
            </div>
          </div> 
      }
      <button className='message_btn' onClick={handleActiveMessage}><BiMessageRounded/></button>
    </>
  )
}
