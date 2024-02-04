import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/ProductsCard.scss';
import { FaCartShopping } from 'react-icons/fa6';
import { StarRating } from '../star_rating/StarRating';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { addBasketData } from '../../store/shopList/shop.action';
import { BsCheckAll } from 'react-icons/bs';
import ProductAlert from '../ProductAlert/ProductAlert';
import { GrFormView } from 'react-icons/gr';


export function ProductsCard ({ product, loadingCard }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const encodedTitle = encodeURIComponent(product.title);
  const [showAlert, setShowAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const dispatch = useDispatch();
  const { basketData } = useSelector((store) => ({
    basketData: store.dataReducer.basketData,
  }));
  const productToAdd = {
    basketId: product.id,
    basketTitle: product.title,
    basketImage: product.image,
    basketPrice: product.price
  };
  const productAlreadyExists = basketData.some((basket) => basket.basketId === productToAdd.basketId);

  function handleTitleLimit(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }

  function handleFavoriteActive () {
    setIsFavorite(!isFavorite);
  }

  function handleAddCard () {
    if (!productAlreadyExists) {
      const updatedBasketData = [...basketData, productToAdd];
      dispatch(addBasketData(updatedBasketData));
      setShowAlert(true);
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

  return (
    <article className='card_wrapper'> 
      {
        loadingCard
        ?
          <SkeletonTheme baseColor="#bdbdbd" highlightColor="#999">
            <Skeleton count={1} style={{height: '83%'}}/>
              <p style={{marginTop: '5px'}}>
                <Skeleton count={3}/>
              </p>
          </SkeletonTheme>
        :
          <>
            <button onClick={handleFavoriteActive} className='card_favorite_btn'>
              {
                isFavorite 
                ?
                  <MdFavorite color='red'/>
                :
                  <MdFavoriteBorder/>
              }
            </button>
            <Link to={`/product/${encodedTitle}/${product.id}`} style={{textDecoration: 'none', color: '#333'}} className='card_link'>
              <div className="card_img_box">
                <div className="card_image">
                  <img src={product.image} alt="" />
                  <span className='view-card-btn'>View</span>
                </div>
              </div>
            </Link>
            <div className='card_data'>
                <h5 className='name_product'>{product ? handleTitleLimit(product.title, 45) : ""}</h5>
                <strong>{product ? product.price : ""}$</strong>
                <div className='card_star_rating'>
                  <span><StarRating starCard={product ? product.rating.rate : ""}/></span>
                  <button onClick={handleAddCard} className='card_buy_btn'>
                    {
                      productAlreadyExists ? (
                        <>
                          <BsCheckAll /> Added
                        </>
                      ) : (
                        <>
                          <FaCartShopping /> Add Basket
                        </>
                      )
                    }
                  </button>
                </div>
            </div>
            <ProductAlert showAlert={showAlert} setShowAlert={() => setShowAlert()} errorAlert={errorAlert} setErrorAlert={() => setErrorAlert()}/>
          </>
      }
    </article>
  )
}
