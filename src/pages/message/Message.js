import React from 'react'
import {BiMessageRounded } from 'react-icons/bi';
import '../../assets/styles/Message.scss';

export function Message() {
  return (
    <>
      <button className='message_btn'><BiMessageRounded/></button>
    </>
  )
}
