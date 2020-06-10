import React, { useState } from 'react';
import Button from '../custom-button/custom.button.component'
import { reauthenticateUser } from '../../firebase/firebase.utils';
import './data.manage.style.scss';

const DataManage = () => {
   const [prevState, setState] = useState({doesWantEmailChange: false})
   const emailChangeBegin = () => setState({doesWantEmailChange: true})
   const emailChangeEnd = () => setState({doesWantEmailChange: false})
   const changeEmail = () => {
      console.log(reauthenticateUser({email: 'johnyy@gmail.com', password: 'johny123'}))
   }

   const { doesWantEmailChange } = prevState;

   return (
      <div className='buttons'>
         <Button onClick={emailChangeBegin}>Change Email</Button>
         <div className='email-change'>
            {
               doesWantEmailChange ? 
               <div className='email-chanhe-confirm'>
                  <h4>Are you sure you want to change the email connected to this account?</h4>
                  <Button onClick={changeEmail}>Yes</Button>
                  <Button onClick={emailChangeEnd}>No</Button>
               </div>
               : null
            }
         </div>
      </div>
   )
}

export default DataManage;