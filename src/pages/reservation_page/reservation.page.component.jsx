import React from 'react';
import './reservation.page.style.scss';

import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';
import ReservationForm from '../../components/reservation-form/reservation.form.component';

import { selectCurrentUser } from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

const ReservationPage = ({currentUser}) => {
   const getTomorrowDay = () => {
      let today = new Date();
      today.setDate(today.getDate()+1);
      const arr = [today.getMonth()+1, '/', today.getDate(),'/', today.getFullYear()]
      return(arr)
   }
   return (
      <div className="container">
         <Header className="header"/>
            <div className="main-content">
               <h3 className="greeting">Welcome, {currentUser.displayName}</h3>
               <h4>This is reservation page</h4>
                  <h4>Please note that reservations are made for tomorrow date, which is {getTomorrowDay()}</h4>
               <ReservationForm />
            </div>
         <Footer className="footer"/>
      </div>
   )
}

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser
 });

export default connect(mapStateToProps)(ReservationPage);