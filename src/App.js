import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ShopHeader } from './components/store_Header/ShopHeader';
import { Home } from './pages/Home';
import { ProductDetail } from './components/product_detail/ProductDetail';
import { TailSpin } from  'react-loader-spinner'
import { BasketStore } from './components/basket_store/BasketStore';
import { SearchProduct } from './components/searchProduct/searchProduct';
import { FavoriteProduct } from './pages/favoriteProduct/FavoriteProduct';
import { Message } from './components/message/Message';
import { useEffect, useState } from 'react';
import Footer from './components/store_footer/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      <TailSpin
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
    />
    }
  })

  return (
    <div className="App">
      <ShopHeader/>
      <Message/>
      <Routes>
        <Route path='/' element={<Home setLoading={() => setIsLoading()}/>}/>
        <Route path='/product/:productName/:id' element={<ProductDetail/>}/>
        <Route path='/basket' element={<BasketStore/>}/>
        <Route path='/search/product/:productName' element={<SearchProduct/>}/>
        <Route path='/favorite' element={<FavoriteProduct/>}/>
        <Route path='*' element={
          <div className='error_page_box'>
            <h1>404</h1>
            <span>Page not found</span>
          </div>}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
