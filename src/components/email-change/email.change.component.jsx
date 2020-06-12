import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../custom-button/custom.button.component';
import Spinner from '../spinner/spinner.component';
import { ReauthenticationError, EmailChangeFailure } from '../error-boundary/error-boundary.component';
import { Link } from 'react-router-dom';
import { reauthenticateUser, changePrimaryEmail } from '../../firebase/firebase.utils';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import './email.change.style.scss';

const EmailChange = ({email, password, newEmail, setCredentials, currentUser}) => {
   const [prevState, setState] = useState({
      isLocalPending: false,
      isReAuthFailed: false,
      isEmailChangeSuccess: false,
      isEmailChangeFailure: false
   })
   const handleSubmit = async event => {
      event.preventDefault();
      setState({isLocalPending: true, isReAuthFailed: false});
      if(currentUser.email === newEmail) {
         setState({...prevState, isEmailChangeFailure: true});
         return
      }
      const reauth = await reauthenticateUser(userData);
      if(reauth === currentUser.id) {
         changePrimaryEmail(newEmail)
         .then((data) => {
            if(data === newEmail) {
               setState({
                  isLocalPending: false,
                  isReAuthFailed: false, 
                  isEmailChangeSuccess: true
               })
            } else {
               setState({...prevState, isEmailChangeFailure: true});
            }
         })
      } else { 
         setState({...prevState, isLocalPending: false});
         setState({...prevState, isReAuthFailed: true});
      }
   }
   const { isLocalPending, isReAuthFailed, isEmailChangeSuccess, isEmailChangeFailure } = prevState;
   const userData = { email, password }
   return (
      <div>
         <div>
            {
               isEmailChangeSuccess ? <div>Email was changed successfuly. Refresh the page to see updates.</div>
               : 
               <div>
                  <h4>Please fill out the form below</h4>
                  <form onSubmit={handleSubmit}>
                     <FormInput 
                        name="email"
                        type="email"
                        value={email}
                        onChange={setCredentials}
                        label='current email'
                        required
                        />
                        <FormInput 
                        name="newEmail"
                        type="email"
                        value={newEmail}
                        onChange={setCredentials}
                        label='new email'
                        required
                        /> 
                        <FormInput 
                        name="password"
                        type="password"
                        value={password}
                        onChange={setCredentials}
                        label='enter password'
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
                           isReAuthFailed ? <ReauthenticationError /> : null
                        }
                     </div>
                     <div className='emailchange-failure-boundary'>
                        {
                           isEmailChangeFailure ? <EmailChangeFailure /> : null
                        }
                     </div>
                     <Button type='submit'>Confirm</Button> 
                  </form>
                  <Button><Link className='link' to='/home'>Cancel</Link></Button>
               </div>
            }
         </div>
      </div>
   )
}

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser
 });


export default connect(mapStateToProps)(EmailChange);