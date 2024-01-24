import React, { useEffect, useState } from 'react'
import '../../assets/styles/BasketStore.scss'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiOutlinePlus, AiOutlineMinus, AiTwotoneDelete, AiOutlineArrowUp } from 'react-icons/ai';
import { deleteBasketData } from '../../store/shopList/shop.action';
import basketBackground from '../../assets/images/basket_bg.jpg';
import ButtonToTop from '../buttonToTop/ButtonToTop';

export function BasketStore () {
  const dispatch = useDispatch();
  const [showButton, setShowButton] = useState(false);
  const { basketData } = useSelector((store) => ({
    basketData: store.dataReducer.basketData,
  }));
  const [priceCalculation, setPriceCalculation] = useState(
    basketData.reduce((acc, val) => {
      acc[val.basketId] = {
        count: 1,
        basketPrice: val.basketPrice
      }
      return acc
    }, {})
  )

  function calculateTotalPrice() {
    const totalPrice = basketData.reduce((total, product) => {
      const calculatePrice = priceCalculation[product.basketId];
      const price = calculatePrice ? calculatePrice.basketPrice + calculatePrice.count : product.basketPrice;
      return total + price;
    }, 0);
    return totalPrice.toFixed(2);
  }
  
  function handleCountPlus(priceItem) {
    if (priceCalculation[priceItem.basketId].count < 10) {
      setPriceCalculation((prevItems) => {
        const newCount = prevItems[priceItem.basketId].count + 1;
        const newBasketPrice = Math.round(prevItems[priceItem.basketId].basketPrice + (prevItems[priceItem.basketId].basketPrice / prevItems[priceItem.basketId].count));
        return {
          ...prevItems,
          [priceItem.basketId]: {
            ...prevItems[priceItem.basketId],
            count: newCount,
            basketPrice: newBasketPrice,
          },
        };
      });
    }
  }

  function handleCountMinus(priceItem) {
    if (priceCalculation[priceItem.basketId].count > 1) {
      setPriceCalculation((prevItems) => {
        const newCount = prevItems[priceItem.basketId].count - 1;
        const newBasketPrice = Math.round(prevItems[priceItem.basketId].basketPrice - (prevItems[priceItem.basketId].basketPrice / prevItems[priceItem.basketId].count));
        return {
          ...prevItems,
          [priceItem.basketId]: {
            ...prevItems[priceItem.basketId],
            count: newCount,
            basketPrice: newBasketPrice,
          },
        };
      });
    }
  }

  function handleDelete(id) {
    dispatch(deleteBasketData(basketData, id));
  }

  return (
    <div className='basket_wrapper'>
      <ButtonToTop/>
      <div className="basket_container">
        <div className='product_list_box'>
          <h2>Shopping Card</h2>
          <span className='calculate_total_price'>Total Price - <b>{calculateTotalPrice()}$</b></span>
          {
            basketData.length > 0
            ?
            <div className="shopping_card_list">
              {
                basketData.map((basket) => (
                  <div key={basket.basketId} className="basket_list">
                    <div className="basket_img_box">
                      <Link style={{textDecoration:'none'}} to={`/product/${encodeURIComponent(basket.basketTitle)}/${basket.basketId}`}>
                        <img src={basket ? basket.basketImage : ""} alt={basket.basketTitle} />
                      </Link>
                      <div className="basket_data">
                        <Link to={`/product/${encodeURIComponent(basket.basketTitle)}/${basket.basketId}`}>{basket ? basket.basketTitle : ""}</Link>
                        <span>{basket ? basket.basketPrice : ""}$</span>
                      </div>
                    </div>
                    <div className="product_count_btn_box">
                      <button onClick={() => handleCountMinus(basket)}><AiOutlineMinus/></button>
                        {priceCalculation[basket.basketId].count}
                      <button onClick={() => handleCountPlus(basket)}><AiOutlinePlus/></button>
                    </div>
                    <div className="basket_price_data">
                      <button onClick={() => handleDelete(basket.basketId)} className='remove_btn'><AiTwotoneDelete/></button>
                      <strong>{priceCalculation ? priceCalculation[basket.basketId].basketPrice : basket.basketPrice}$</strong>
                    </div>
                  </div>
                ))
              }
            </div>
            :
            <div className='empty_card_text'>
              <span>Your cart is currently empty</span>
              <Link to={'/'} className='start_shopping'><small>➥</small> Start Shopping</Link>
            </div>
          }
        </div>
        {
          basketData.length > 0 && (
            <aside className='buy_products_box'>
              <h2>Buy</h2>
            </aside>
          )
        }
      </div>
    </div>
  )
}
