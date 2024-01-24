import React, { useEffect, useMemo, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import '../assets/styles/Home.scss'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addData } from '../store/shopList/shop.action';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import ProductList from '../components/product_list/ProductList';
import ButtonToTop from '../components/buttonToTop/ButtonToTop';
import ProductCategories from '../components/productCategory/ProductCategory';

export function Home({ setLoading }) {
  const [isSSkeletonTheme, setIsSkeletonTheme] = useState(true);
  const [carouselElement, setCarouselElement] = useState([]);
  const dispatch = useDispatch();
  const { shopData } = useSelector((store) => ({
    shopData: store.dataReducer.shopData,
  }));
  const [category, setCategory] = useState([]);
  const memoizedShopData = useMemo(() => shopData, [shopData]);

  useEffect(() => {
    if (memoizedShopData.length > 0) {
      setIsSkeletonTheme(false);
    } else {
      axios.get("https://fakestoreapi.com/products")
        .then((res) => {
          dispatch(addData(res.data));
          setIsSkeletonTheme(false);
          setLoading(false);
        });
    }
  }, [memoizedShopData, dispatch]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products?limit=5")
    .then((res) => {
      setCarouselElement(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products/categories")
    .then((res) => {
      setCategory(res.data);
      console.log(res.data);
    })
  }, [])

  return (
    <div className='wrapper'>
      <ButtonToTop/>
      <Carousel 
        autoPlay={true}
        navButtonsAlwaysVisible={true}
        animation={'slide'}
        duration={700}
        interval={5000}
        height={500}
        indicators={true}
        indicatorContainerProps={{
          style: {
            position: 'absolute',
            bottom: '20px',
            width: '100%',
            zIndex: '100',
            textAlign: 'center',
          },
        }}
        infiniteLoop={true}
        className='carousel'
      >
        {
          carouselElement.map((shop) => (
            <Link to={`/product/${encodeURIComponent(shop.title)}/${shop.id}`} style={{textDecoration:"none", color:"black"}} className='shop_slider_link' key={shop.id}>
              <div className='slider_box'>
                <img src={shop ? shop.image : ""} className='slider_img' alt="" />
              </div>
              <div className="slider_data_box">
                  <div className='slider_title'>{shop ? shop.title : ""}</div>
                  <span className="slider_price">
                    <b>Price</b> - {shop ? shop.price : ""}$
                  </span><br/>
                  <span className='slider_rating'>
                   <p className='slider_rating_text'><AiFillStar className='rating_star'/> {shop ? shop.rating.rate : ""}</p>{" "}<br/>
                   <p className='slider_count_text'><b>Count</b> - ({shop ? shop.rating.count : ""})</p>{" "}
                  </span><br/>
                  <span className='slider_rating'>
                    <b>Category</b> - {shop ? shop.category : ""}
                  </span>
              </div>
            </Link>
          ))
        }

      </Carousel>

      <ProductCategories data={shopData} categories={category} loadingCard={isSSkeletonTheme}/>

      <ProductList cards={shopData} loadingCard={isSSkeletonTheme}/>
    </div>
  )
}