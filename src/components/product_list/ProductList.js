import React from 'react'
import { ProductsCard } from '../products_cart/ProductsCard'
import '../../assets/styles/ProductList.scss'
import { useSelector } from 'react-redux';

export default function ProductList({ cards, loadingCard }) {
  return (
    <main className='product_list_wrapper'>
        <div className='product_list_cont'>
          {
              cards.map((card) => (
                  <ProductsCard key={card.id} product={card} loadingCard={loadingCard}/>
              ))
          }
      </div>
    </main>
  )
}
