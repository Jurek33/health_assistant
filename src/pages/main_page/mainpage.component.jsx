import React from 'react';
import './mainpage.style.scss';
import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';
import Dashboard from '../../components/dashboard/dashboard.component';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

const MainPage = ({currentUser}) => {
   
   return (
      <div className="container">
         <Header className="header"/>
            <div className="main-content">
               <h3 className="greeting">Welcome, {currentUser.displayName}</h3>
               <Dashboard className="dashboard"/>
            </div>
         <Footer className="footer"/>
      </div>
   )
}

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser
 });

export default connect(mapStateToProps)(MainPage);