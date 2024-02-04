import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import '../../assets/styles/Footer.scss';

export default function Footer() {
  return (
    <footer>
      <div className="footer_container">
          <div className="social_app_box">
            <Link to={''} className="social_icons"><FaFacebook /></Link>
            <Link to={''} className="social_icons"><FaInstagram /></Link>
            <Link to={''} className="social_icons"><FaYoutube /></Link>
            <Link to={''} className="social_icons"><FaTwitter /></Link>
          </div>
          <div className="footer_content">
            <ul className='footer_ul'>
              <li><Link to={''}>HOME</Link></li>
              <li><Link to={''}>MENU</Link></li>
              <li><Link to={''}>STORY</Link></li>
              <li><Link to={''}>DETOX</Link></li>
              <li><Link to={''}>LOCATIONS</Link></li>
            </ul>
            <div className="footer_contact_box">
                <span>CONTACT</span>
                <span>BLOG</span>
                <span>CATERING</span>
                <span>DELIVERY</span>
            </div>
          </div>
          <div className="footer_bottom">
            <span>The word 'copyright' or the © 2023-2024</span>
            <span>A statement of rights All Rights Reserved</span>
          </div>
      </div>
    </footer>
  )
}
