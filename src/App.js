import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ShopHeader } from './components/store_Header/ShopHeader';
import { Home } from './pages/Home';
import { ProductDetail } from './components/product_detail/ProductDetail';
import { TailSpin } from  'react-loader-spinner'
import { BasketStore } from './components/basket_store/BasketStore';
import { SearchProduct } from './components/searchProduct/searchProduct';
import { FavoriteProduct } from './pages/favoriteProduct/FavoriteProduct';
import { Message } from './pages/message/Message';

function App() {
  return (
    <div className="App">
      <ShopHeader/>
      <Message/>
      <Routes>
        <Route path='/' element={<Home/>}/>
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
    </div>
  );
}

export default App;
