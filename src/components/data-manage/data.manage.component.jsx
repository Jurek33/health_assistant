import React, { useState } from 'react';
import Button from '../custom-button/custom.button.component'
import EmailChange from '../email-change/email.change.component';

import './data.manage.style.scss';

const DataManage = () => {
   const [prevState, setState] = useState({
      doesWantEmailChange: false,
      doesConfirmEmailChange: false,
      email: '',
      password: '',
      newEmail: ''
   })
   const emailChangeBegin = () => {
     return !doesConfirmEmailChange ? 
      setState({
        ...prevState, 
        doesWantEmailChange: true
      }) : null 
   } 
   const emailChangeEnd = () => {
      return setState({
         ...prevState, 
         doesWantEmailChange: false, 
         doesConfirmEmailChange: false
      })
   } 
   const emailChangeConfirm = () => {
      setState({...prevState, doesConfirmEmailChange: true, doesWantEmailChange: false})
   }
   const setCredentials = event => {
      const { name, value } = event.target;
      setState({...prevState, [name]: value})
   }

   const { doesWantEmailChange, doesConfirmEmailChange, email, password, newEmail } = prevState;

   return (
      <div className='buttons'>
         <div>
            {!doesConfirmEmailChange ? <Button className='button button-change' onClick={emailChangeBegin}>Change Email</Button>: null}
         </div>
         <div className='email-change'>
            {
               doesWantEmailChange ? 
               <div className='email-chanhe-confirm'>
                  <h5 className='header-confirmation-message'>Are you sure you want to change the email connected to this account?</h5>
                  <Button className='button button-confirm' onClick={emailChangeConfirm}>Yes</Button>
                  <Button className='button button-confirm' onClick={emailChangeEnd}>No</Button>
               </div>
               : null
            }
         </div>
         <div>
            {
               <div>
                  {
                     doesConfirmEmailChange ?
                     <EmailChange 
                     email={email} 
                     password={password} 
                     newEmail={newEmail}
                     state={prevState}
                     setCredentials={setCredentials}
                     />
                     : null
                  }
               </div> 
            } 
         </div>
      </div>
   )
}

export default DataManage;