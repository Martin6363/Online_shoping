import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../assets/styles/ProductDetail.scss';
import { StarRating } from '../star_rating/StarRating';
import { AiFillMinusCircle } from "react-icons/ai"
import { HiMiniPlusCircle } from "react-icons/hi2";
import { FaCartShopping } from 'react-icons/fa6';
import { TailSpin } from  'react-loader-spinner';
import { CardSlickSlider } from '../cardSlickSlider/CardSlickSlider';
import { useDispatch, useSelector } from 'react-redux';
import { addBasketData } from '../../store/shopList/shop.action';
import ProductAlert from '../ProductAlert/ProductAlert';
import ButtonToTop from '../buttonToTop/ButtonToTop';
import MyImageMagnify from './MyImageMagnify';

export function ProductDetail() {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [countProduct, setCountProduct] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [isButtonText, setIsButtonText] = useState(false);
  const dispatch = useDispatch();
  const { basketData } = useSelector((store) => ({
    basketData: store.dataReducer.basketData,
  }));

  useEffect(() => {
    getData();
  }, [id])

  if (isLoading) {
    return (
      <div className="loading_cont">
        <TailSpin
          height="90"
          width="90"
          color="#196595"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        <h2 style={{fontSize: '15px', color: '#333'}}>Loading...</h2>
      </div>
    )
  }

  function addBuyData () {
    const productToAdd = {
      basketId: detail.id,
      basketTitle: detail.title,
      basketImage: detail.image,
      basketPrice: detail.price
    };
    const productAlreadyExists = basketData.some((basket) => basket.basketId === productToAdd.basketId);

    if (!productAlreadyExists) {
      const updatedBasketData = [...basketData, productToAdd];
      dispatch(addBasketData(updatedBasketData));
      setShowAlert(true);
      setIsButtonText(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } else {
      setErrorAlert(true);
      setTimeout(() => {
        setErrorAlert(false);
      }, 3000);
    }
  }

  function getData() {
      axios(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setDetail(res.data);
        setIsLoading(false);
      })
  }

  function countPlus () {
    if (countProduct >= 10) {
      setCountProduct(10)
    } else {
      setCountProduct(countProduct + 1)
    }
  }

  function countMinus () {
    if (countProduct <= 1) {
      setCountProduct(1)
    } else {
      setCountProduct(countProduct - 1)
    }
  }

  return (
    <>
    <div className='product_detail_wrapper'>
      <ButtonToTop/>
      <div className='detail_container'>
        <p className='detail_title'><b>{detail ? detail.category : ""}</b> - {detail ? detail.title : ""}</p>
        <div className="product_detail_data">
          <div className="detail_img_box">
            <div className="image-magnify-container">
              <MyImageMagnify detail={detail}/>
            </div>
          </div>
          <div className="detail_data_cont">
            <div className="right_title_data">
              <h4 className='product_detail_title'>{detail ? detail.title : ""}</h4>
              <span className='detail_rating'><StarRating starCard={ detail ? detail.rating.rate : "" }/></span>
            </div>
            <div className="detail_price_box">
              <strong>${detail ? detail.price : ""}</strong>
              <div className="count_button_cont">
                <button onClick={countMinus}><AiFillMinusCircle/></button>
                <span>{countProduct}</span>
                <button onClick={countPlus}><HiMiniPlusCircle/></button>
              </div>
            </div>
            <div className="detail_description">
              <b>About this item</b><br/><br/>
              <p>{detail ? detail.description : ""}</p>
            </div>
            <div className="buy_box">
              <button onClick={addBuyData}><FaCartShopping/>Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CardSlickSlider categoryId={detail ? detail.category : ""} />
    <ProductAlert showAlert={showAlert} setShowAlert={() => setShowAlert()} errorAlert={errorAlert} setErrorAlert={() => setErrorAlert()}/>
    </>
  )
}
