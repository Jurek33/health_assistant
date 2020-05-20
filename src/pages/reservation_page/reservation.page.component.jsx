import React from 'react';
import './reservation.page.style.scss';
import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

const ReservationPage = ({currentUser}) => {
   return (
      <div className="container">
         <Header className="header"/>
            <div className="main-content">
               <h3 className="greeting">Welcome, {currentUser.displayName}</h3>
               <h4>This is reservation page</h4>
            </div>
         <Footer className="footer"/>
      </div>
   )
}

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser
 });

export default connect(mapStateToProps)(ReservationPage);