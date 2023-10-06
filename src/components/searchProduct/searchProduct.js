import React from 'react'
import { useSelector } from 'react-redux';
import ProductList from '../product_list/ProductList';
import '../../assets/styles/SearchProduct.scss';
import  emojiGif  from '../../assets/images/emoji.gif';
import ButtonToTop from '../buttonToTop/ButtonToTop';

export function SearchProduct() {
  const { searchData } = useSelector((store) => ({
    searchData: store.dataReducer.searchData,
  }));
  return (
    <div className='search_wrapper'>
      <ButtonToTop/>
      <div className="search_container">
        {
          searchData.length ?
            <ProductList cards={searchData} loadingCard={''}/>
          :
          <div className="no_results">
            <img src={emojiGif} alt="" />
            <h2>No search results</h2>
          </div>
        }
      </div>
    </div>
  )
}
