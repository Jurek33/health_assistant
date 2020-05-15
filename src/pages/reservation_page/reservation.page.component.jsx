import React from 'react';
import './reservation.page.style.scss';
import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';

const ReservationPage = () => {
   return (
      <div className="container">
         <Header className="header"/>
            <div className="main-content">
               <h3 className="greeting">Welcome, username</h3>
               <h4>This is reservation page</h4>
            </div>
         <Footer className="footer"/>
      </div>
   )
}

export default ReservationPage;