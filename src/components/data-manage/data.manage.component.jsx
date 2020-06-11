import React, { useState } from 'react';
import Button from '../custom-button/custom.button.component'
import EmailChange from '../email-change/email.change.component';

import './data.manage.style.scss';

const DataManage = () => {
   const [prevState, setState] = useState({
      doesWantEmailChange: false,
      doesConfirmEmailChange: false,
      email: '',
      password: ''
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

   const { doesWantEmailChange, doesConfirmEmailChange, email, password } = prevState;

   return (
      <div className='buttons'>
         <Button onClick={emailChangeBegin}>Change Email</Button>
         <div className='email-change'>
            {
               doesWantEmailChange ? 
               <div className='email-chanhe-confirm'>
                  <h4>Are you sure you want to change the email connected to this account?</h4>
                  <Button onClick={emailChangeConfirm}>Yes</Button>
                  <Button onClick={emailChangeEnd}>No</Button>
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