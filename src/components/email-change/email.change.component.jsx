import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../custom-button/custom.button.component';
import Spinner from '../spinner/spinner.component';
import { reauthenticateUser } from '../../firebase/firebase.utils';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import './email.change.style.scss';

const EmailChange = ({email, password, setCredentials, currentUser}) => {
   const [prevState, setState] = useState({
      isLocalPending: false,
      isReAuthFailed: false
   })
   const handleSubmit = async event => {
      event.preventDefault();
      setState({isLocalPending: true, isReAuthFailed: false})
      const reauth = await reauthenticateUser(userData);
      if(reauth === currentUser.id) {
         console.log('success');
         setState({isLocalPending: false, isReAuthFailed: false})
      } else { 
         console.log('failure');
         setState({...prevState, isLocalPending: false});
         setState({...prevState, isReAuthFailed: true});
      }
   }
   const { isLocalPending, isReAuthFailed } = prevState;
   const userData = { email, password }
   return (
      <div>
         <h4>Please confirm your email and password first</h4>
         <form onSubmit={handleSubmit}>
            <FormInput 
               name="email"
               type="email"
               value={email}
               onChange={setCredentials}
               label='email'
               required
               />
               <FormInput 
               name="password"
               type="password"
               value={password}
               onChange={setCredentials}
               label='password'
               required
            /> 
            <div className='pending-boundary'>
               {
                  isLocalPending ? <div>Few moments please <Spinner /></div>
                  : null
               }
            </div>
            <div className='wrong-credential-boundary'>
               {
                  isReAuthFailed ? <div>Wrong credentials</div>: null
               }
            </div>
            <Button type='submit'>Confirm</Button>  
         </form>
         
      </div>
   )
}

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser
 });


export default connect(mapStateToProps)(EmailChange);