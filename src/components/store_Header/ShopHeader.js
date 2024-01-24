import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { FaCartShopping } from 'react-icons/fa6';
import { BiSearch } from 'react-icons/bi';
import { IoCreateSharp, IoClose } from 'react-icons/io5';
import Logo from '../../assets/images/logo.png';
import '../../assets/styles/ShopHeader.scss';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addSearchData } from '../../store/shopList/shop.action';
import LoginModal from '../loginModal/LoginModal';
import { GiBackwardTime } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { HiMenuAlt1 } from 'react-icons/hi';

export function ShopHeader() {
  const {
    register,
    handleSubmit,
    setValue
  } = useForm();

  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const [menuActive, setMenuActive] = useState(false);
  const { basketData } = useSelector((store) => ({
    basketData: store.dataReducer.basketData,
  }));
  const { shopData } = useSelector((store) => ({
    shopData: store.dataReducer.shopData,
  }));
  const onSubmit = (data) => {
    if (data.search.trim()) {
      handleSearch(data);
    }
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

  const handleEmptyValue = () => {
    setValue("search", '');
  }

  const handleMenuActive = () => {
    setMenuActive(!menuActive)
  }

  return (
    <div className="header_wrapper">
      <header className='header'>
        <button className='menu_left_btn' onClick={handleMenuActive}><HiMenuAlt1 fontSize={35}/></button>
        <nav className='navigation'>
          <div className="logo_img">
            <Link onClick={scrollTo} to={'/'} style={{textDecoration: 'none'}}><img src={Logo} alt="" className='logoImg'/></Link>
          </div>
          <div className="form_container">
            <form onSubmit={handleSubmit(onSubmit)} className="search_input_box">
              <input 
                type="text" 
                autocomplete="off"
                className='search'  
                placeholder='Search'
                {...register('search', { required: true,
                  minLength: {
                    value: 1
                  }
                })}
              />
              <button type='submit' className='search-btn' title='Search'><BiSearch/></button>
              <div className='autocomplete_box'>
                <ul>
                  <li><span><GiBackwardTime className='time_searched_icon'/><b>Searched</b></span><Link className='remove_searched'>Remove</Link></li>
                  <li><span><GiBackwardTime className='time_searched_icon'/><b>Searched</b></span><Link className='remove_searched'>Remove</Link></li>
                  <li><span><GiBackwardTime className='time_searched_icon'/><b>Searched</b></span><Link className='remove_searched'>Remove</Link></li>
                  <li><span><GiBackwardTime className='time_searched_icon'/><b>Searched</b></span><Link className='remove_searched'>Remove</Link></li>
                  <li><span><GiBackwardTime className='time_searched_icon'/><b>Searched</b></span><Link className='remove_searched'>Remove</Link></li>
                </ul>
              </div>
            </form>
            <button onClick={handleEmptyValue} className='remove_input_value_btn'><AiOutlineClose/></button>
          </div>
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
      <div className={`menu_container ${menuActive && 'menu_container_active'}`}>
        <div className="header_menu_left">
          <button onClick={handleMenuActive} className='close_menu_btn'><IoClose/></button>
        </div>
      </div>
    </div>
  )
}
