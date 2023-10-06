import { FaStar } from 'react-icons/fa';
import '../../assets/styles/ProductsCard.scss';
import React, { useState } from 'react';


export function StarRating({ starCard }) {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    
  return (
    <>
     {
        [...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return(
            <label key={currentRating}>
                <input 
                type="radio" 
                name="rating"
                className='card_input_radio'
                value={currentRating}  
                onClick={() => setRating(currentRating)} 
                />
                <FaStar 
                className='star'
                color={currentRating <= (hover || rating || starCard) ? "#ffc107" : "#e4e5e9"}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
                />
            </label>
            )
        })
        }
    </>
  )
}
