import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/CardSlickSlider.scss';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { responsive } from './responsiveSlider';

export function CardSlickSlider({ categoryId }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData();
  }, [categoryId]);

  function getData() {
    axios(`https://fakestoreapi.com/products/category/${categoryId}`)
      .then((res) => {
        setProducts(res.data);
      })
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <div className='slider_container'>
      <h3>Additional products</h3>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        ssr={true}
        infinite={true}
        keyBoardControl={true}
        customTransition="transform 500ms ease-in-out" 
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {
            products.map((product) => (
            <div className='category_slider_box' key={product.id}>
                <Link to={`/product/${encodeURIComponent(product.title)}/${product.id}`} onClick={scrollToTop} style={{textDecoration:"none", color:"black"}}>
                <div className="slider_slick_img_box">
                    <img src={product.image} alt={product.title} />
                    <p>{product.title}</p>
                    <b>${product.price}</b>
                </div>
                </Link>
            </div>
            ))
        }
      </Carousel>
    </div>
  );
}
