import React, { useEffect, useRef, useState } from 'react'
import {BiMessageRounded } from 'react-icons/bi';
import '../../assets/styles/Message.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { FaTelegramPlane, FaRegSmile } from "react-icons/fa";
import { FiPaperclip } from "react-icons/fi";


export function Message() {
  const [messageActive, setMessageActive] = useState(false);
  const chatContentRef = useRef(null);

  function handleActiveMessage () {
    setMessageActive(!messageActive);
    if (messageActive) {
      document.body.style.overflowY = 'scroll';
    } else {
      document.body.style.overflowY = 'hidden';
    }
  }

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messageActive]);


  return (
    <>
      {
        messageActive &&
          <div className="message_wrapper">
            <div className="message_container">
              <button onClick={handleActiveMessage} title='Close' className='close_message'><AiOutlineClose/></button>
              <div className="page-content page-container" id="page-content">
                <div className="row container d-flex justify-content-center">
                    <div className="card card-bordered">
                      <div className="card-header">
                        <h4 className="card-title"><strong>Chat</strong></h4>
                        <a className="btn-xs btn-secondary" href="#">Let's Chat App</a>
                      </div>

                      <div className="ps-container" id="chat-content" ref={chatContentRef}>
                        <div className="media media-chat">
                          <img className="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..." />
                          <div className="media-body">
                            <p>Hi</p>
                            <p>How are you ...???</p>
                            <p>What are you doing tomorrow?<br/> Can we come up a bar?</p>
                            <p className="meta"><span>23:58</span></p>
                          </div>
                        </div>

                        <div className="media media-meta-day">Today</div>

                        <div className="media media-chat media-chat-reverse">
                          <div className="media-body">
                            <p>Hiii, I'm good.</p>
                            <p>How are you doing?</p>
                            <p>Long time no see! Tomorrow office. will be free on sunday.</p>
                            <p className="meta"><span>00:06</span></p>
                          </div>
                        </div>

                        <div className="media media-chat">
                          <img className="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..." />
                          <div className="media-body">
                            <p>Okay</p>
                            <p>We will go on sunday? </p>
                            <p className="meta"><span>00:07</span></p>
                          </div>
                        </div>

                        <div className="media media-chat media-chat-reverse">
                          <div className="media-body">
                            <p>That's awesome!</p>
                            <p>I will meet you Sandon Square sharp at 10 AM</p>
                            <p>Is that okay?</p>
                            <p className="meta"><span>00:09</span></p>
                          </div>
                        </div>

                        <div className="media media-chat">
                          <img className="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..."/>
                          <div className="media-body">
                            <p>Okay i will meet you on Sandon Square </p>
                            <p className="meta"><span>00:10</span></p>
                          </div>
                        </div>

                        <div className="media media-chat media-chat-reverse">
                          <div className="media-body">
                            <p>Do you have pictures of Matley Marriage?</p>
                            <p className="meta"><span>00:10</span></p>
                          </div>
                        </div>

                        <div className="media media-chat">
                          <img className="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..."/>
                          <div className="media-body">
                            <p>Sorry I don't have. i changed my phone.</p>
                            <p className="meta"><span>00:12</span></p>
                          </div>
                        </div>

                        <div className="media media-chat media-chat-reverse">
                          <div className="media-body">
                            <p>Okay then see you on sunday!!</p>
                            <p className="meta"><span>00:12</span></p>
                          </div>
                        </div>
                      </div>
                      <div className="publisher">
                        <img className="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..."/>
                        <input className="publisher-input" type="text" placeholder="Write something"/>
                        <span className="publisher-btn file-group">
                          <FiPaperclip />
                          <input type="file" className='message_file'/>
                        </span>
                        <a className="publisher-btn" href="#" data-abc="true"><FaRegSmile /></a>
                        <a className="publisher-btn text-info" href="#" data-abc="true"><FaTelegramPlane /></a>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>
      }
      <button className='message_btn' onClick={handleActiveMessage}><BiMessageRounded/>
        <span className='btn_effect'></span>
      </button>
    </>
  )
}
