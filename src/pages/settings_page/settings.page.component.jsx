import React from 'react';
import './settings.page.style.scss';
import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';
import Settings from '../../components/settings/settings.component';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

const SettingsPage = ({currentUser, switchColor, switchDark, switchStandard}) => {
   return (
      <div className='container'>
         <Header className="header"/>
            <div className="main-content">
               <h3 className="greeting">Welcome, {currentUser.displayName}</h3>
               <Settings switchColor={switchColor} switchDark={switchDark} switchStandard={switchStandard}/>
            </div>
         <Footer className="footer"/>
      </div>
   )
}

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser
 });

export default connect(mapStateToProps)(SettingsPage);