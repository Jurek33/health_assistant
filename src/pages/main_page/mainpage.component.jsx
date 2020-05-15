import React from 'react';
import './mainpage.style.scss';
import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';
import Dashboard from '../../components/dashboard/dashboard.component';

const MainPage = () => {
   return (
      <div className="container">
         <Header className="header"/>
            <div className="main-content">
               <h3 className="greeting">Welcome, username</h3>
               <Dashboard className="dashboard"/>
            </div>
         <Footer className="footer"/>
      </div>
   )
}

export default MainPage;