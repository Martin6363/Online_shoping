import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { FaCartShopping } from 'react-icons/fa6';
import { BiSearch } from 'react-icons/bi';
import { IoCreateSharp } from 'react-icons/io5';
import Logo from '../../assets/images/logo.png';
import '../../assets/styles/ShopHeader.scss';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addSearchData } from '../../store/shopList/shop.action';
import LoginModal from '../loginModal/LoginModal';


export function ShopHeader() {
  const {
    register,
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate()
  const { basketData } = useSelector((store) => ({
    basketData: store.dataReducer.basketData,
  }));
  const { shopData } = useSelector((store) => ({
    shopData: store.dataReducer.shopData,
  }));

  const onSubmit = (data) => {
    handleSearch(data)
    navigate(`/search/product/:${data.search}`);
  }

  const handleSearch = (data) => {
    const filteredShopData = shopData.filter((item) =>
      item.title.toLowerCase().includes(data.search.toLowerCase())
    );
    dispatch(addSearchData(filteredShopData));
  }

  const favoriteLink = () => {
    setIsFavorite(true)
    navigate(`/favorite`)
  }

  const scrollTo = () => {
    setIsFavorite(false)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <header className='header'>
      <nav className='navigation'>
        <div className="logo_img">
          <Link onClick={scrollTo} to={'/'} style={{textDecoration: 'none'}}><img src={Logo} alt="" className='logoImg'/></Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="search_input_box">
          <input 
            type="text" 
            className='search'  
            placeholder='Search'
            {...register('search', { required: true,
              minLength: {
                value: 1
              }
            })}
          />
          <button className='search-btn' title='Search'><BiSearch/></button>
        </form>
        <ul>
          <li title='Create product' onClick={() => setIsFavorite(false)}><Link to={'/create/product'} className='link_header'><IoCreateSharp/></Link></li>
          <li title='Favorite products' onClick={favoriteLink}>
            <span style={{cursor: 'pointer'}} className='link_header'>
              {
                isFavorite ? <MdFavorite color='red'/> : <MdFavoriteBorder/> 
              }
            </span>
          </li>
          <li onClick={scrollTo} title='Products basket'>
            <Link to={`${"/basket"}`} className='link_header'>
              <FaCartShopping/>
              <span className='shopCardCount'>
                {basketData.length ? basketData.length : 0}
              </span>
            </Link>
          </li>
          <li><span className='link_header'><LoginModal/></span></li>
        </ul>
      </nav>
    </header>
  )
}
