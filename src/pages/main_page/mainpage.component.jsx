import React from 'react';
import './mainpage.style.scss';
import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';

const MainPage = () => {
   return (
      <div className="container">
         <Header className="header"/>
            <div className="main-content"></div>
         <Footer className="footer"/>
      </div>
   )
}

export default MainPage;