import React, { useEffect, useState } from 'react';
import '../../assets/styles/ProductCategories.scss';
import electronicImage from '../../assets/images/electronic_category_img.jpg';
import { useDispatch } from 'react-redux';
import { addData } from '../../store/shopList/shop.action';
import { TailSpin } from  'react-loader-spinner'
import ProductList from '../product_list/ProductList';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import responsive from './responsiveCarousel';

function ProductCategories({ data, categories, loadingCard }) {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState([...data]);
  const dispatch = useDispatch();


  const handleFilterProduct = (cat) => {
    const updatedList = data.filter((x) => x.category === cat);
    setFilter(updatedList);
    setLoading(false);
  }

  return (
    <>
      <div className="product-categories">
          <h2>Categories</h2>
          <div className="category-list">
            <Carousel
              swipeable={true}
              draggable={false}
              showDots={true}
              responsive={responsive}
              ssr={true}
              infinite={true}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              <div className="category-item" onClick={() => setFilter(data)}>
                <img src={electronicImage} alt="" draggable={true} onDragStart={(e) => e.preventDefault()}/>
                <p className="category-name">All</p>
              </div>
              {categories.map((category, index) => (
                <div className="category-item" key={index} onClick={() => handleFilterProduct(category)}>
                  <img src={electronicImage} alt="" draggable={true} onDragStart={(e) => e.preventDefault()}/>
                  <p className="category-name">{category}</p>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        {filter.length > 0 && <ProductList cards={filter} loadingCard={loadingCard} />}
      </>
  );
}

export default ProductCategories;
