import React, { useContext } from 'react';
import { ThemeContext } from '../../App';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import DataManage from '../data-manage/data.manage.component';
import './account.details.style.scss';

const AccountDetails = ({currentUser}) => {
   const theme = useContext(ThemeContext);
   const { event_detail_background } = theme;
   const toDateTime = (param) => {
      let t = new Date(1970,0,1);
      t.setSeconds(param.createdAd.seconds);
      return t
   }

   const date = toDateTime(currentUser).toLocaleString()

   return (
      <div className='account-details' style={{backgroundColor: event_detail_background}}>
         <div className='details'>
            <div className='info'>Username: {currentUser.displayName}</div>
            <div className='info'>Primary Email: {currentUser.email}</div>
            <div className='info'>User since: {date}</div>
         </div>
         <div className='additional-content'>
            <DataManage />
         </div>
      </div>
      
   )
}

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser
 });

export default connect(mapStateToProps)(AccountDetails);