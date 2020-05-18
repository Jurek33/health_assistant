import React from 'react';

import { ReactComponent as Logo } from '../../assets/icon.svg';
import { ReactComponent as AccountIcon } from '../../assets/account.svg';
import { ReactComponent as HomeIcon } from '../../assets/home.svg';
import { ReactComponent as ReserveIcon } from '../../assets/reserve.svg';
import { ReactComponent as SettingsIcon } from '../../assets/settings.svg';
import { ReactComponent as LogoutIcon } from '../../assets/logout.svg';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';

import './header.style.scss';

const Header = () => {
   return (
      <div className="navbar-container">
         <div className="navbar">
            <div className="logo-container"> 
               <Logo className="logo"/>
            </div>
            <Link to='/home'><span className="navbar-item"><HomeIcon className="icon"/> Home</span></Link>
            <Link to='/reserve'><span className="navbar-item"><ReserveIcon className="icon"/> Reserve a visit</span></Link> 
            <span className="navbar-item"><AccountIcon className="icon"/> My account</span>
            <span className="navbar-item"><SettingsIcon className="icon"/> Settings</span>
            <Link onClick={() => auth.signOut()} to='/'><span className="navbar-item"><LogoutIcon className="icon"/> Log out</span></Link> 
         </div>
      </div>
   )
};

export default Header;