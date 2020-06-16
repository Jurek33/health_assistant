import React, { useContext } from 'react';
import { ThemeContext } from '../../App';
import { connect } from 'react-redux';

import { ReactComponent as Logo } from '../../assets/icon.svg';
import { ReactComponent as AccountIcon } from '../../assets/account.svg';
import { ReactComponent as HomeIcon } from '../../assets/home.svg';
import { ReactComponent as ReserveIcon } from '../../assets/reserve.svg';
import { ReactComponent as SettingsIcon } from '../../assets/settings.svg';
import { ReactComponent as LogoutIcon } from '../../assets/logout.svg';

import { signOutStart } from '../../redux/user/user.actions';

import { Link } from 'react-router-dom';


import './header.style.scss';

const Header = ({ signOutStart }) => {
   const theme = useContext(ThemeContext);
   const { text_color } = theme;
   return (
      <div className="navbar-container">
         <div className="navbar">
            <div className="logo-container"> 
               <Logo className="logo"/>
            </div>
            <Link style={{color: text_color}} to='/home'>
               <span className="navbar-item"><HomeIcon className="icon"/> Home</span>
            </Link>
            <Link style={{color: text_color}} to='/reserve'>
               <span className="navbar-item"><ReserveIcon className="icon"/> Reserve a visit</span>
            </Link> 
            <Link style={{color: text_color}} to='/account'>
               <span className="navbar-item"><AccountIcon className="icon"/> My account</span>
            </Link>
            <Link style={{color: text_color}} to='/settings'>
               <span className="navbar-item"><SettingsIcon className="icon"/> Settings</span>
            </Link>
            <Link style={{color: text_color}} onClick={signOutStart} to='/'>
               <span className="navbar-item"><LogoutIcon className="icon"/> Log out</span>
            </Link> 
         </div>
      </div>
   )
};

const mapDispatchToProps = dispatch => ({
	signOutStart: () => dispatch(signOutStart())
})

export default connect(null, mapDispatchToProps)(Header);