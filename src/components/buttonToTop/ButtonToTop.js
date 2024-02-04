import React, { useState } from 'react'
import {AiOutlineArrowUp } from 'react-icons/ai';
import '../../assets/styles/ButtonToTop.scss';


export default function ButtonToTop() {
    const [showButton, setShowButton] = useState(false);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      });
    
    function scrollToTop () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }
  return (
    <>
      <button onClick={scrollToTop} className={`${showButton ? "scroll_top_active" : "scroll_to_top"}`} title='To top'>
        <AiOutlineArrowUp/>
      </button> 
    </>
  )
}
