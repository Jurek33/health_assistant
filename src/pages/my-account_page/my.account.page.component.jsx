import React from 'react';
import './my.account.page.style.scss';
import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';
import AccountDetails from '../../components/account-details/account.details.component';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

const MyAccountPage = ({currentUser}) => {
   
   return (
      <div className="container">
         <Header className="header"/>
            <div className="main-content">
               <h3 className="greeting">Welcome, {currentUser.displayName}</h3>
               <h2>Account details</h2>
               <AccountDetails />
            </div>
         <Footer className="footer"/>
      </div>
   )
}

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser
 });

export default connect(mapStateToProps)(MyAccountPage);