import React from 'react';

import { ReactComponent as Logo } from '../../assets/icon.svg';
import './header.style.scss';

const Header = () => {
   return (
      <div className="navbar-container">
         <div className="navbar">
            <div className="logo-container"> 
               <Logo className="logo"/>
            </div>
            <span className="navbar-item">Home</span>
            <span className="navbar-item">Reserve a visit</span>
            <span className="navbar-item">My account</span>
            <span className="navbar-item">Settings</span>
            <span className="navbar-item">Log out</span>
         </div>
      </div>
   )
};

export default Header;