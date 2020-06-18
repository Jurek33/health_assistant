import React, { useContext } from 'react';
import { ThemeContext } from '../../App';
import './error-boundary.style.scss';
import { Link } from 'react-router-dom';
import Button from '../custom-button/custom.button.component';

export const SignInError = () => {
   return(
      <div className='failure-message'>
         Authentication failed. Incorrect email or password
      </div> 
   )
}

export const PasswordError = () => {
   return (
      <div className='password-failure-message'>
         <ul>
            <li>Password must be at least 6 characters</li>
            <li>Password must be equal to confirm password</li>
         </ul>
      </div>
   )
}

export const RegisterError = () => {
   return(
      <div className='failure-message'>
         Registration failed. This email address is assigned to existing account
      </div> 
   )
}

export const ReservationError = () => {
   return(
      <div className='failure-message'>
         Reservation failed, please refresh the page and try again
      </div> 
   )
}

export const SelectLocationError = () => {
   return (
      <div className='failure-message'>
         Please select the location from the list above
      </div> 
   )
}

export const SelectDeptError = () => {
   return (
      <div className='failure-message'>
         Please select the department from the list above
      </div> 
   )
}

export const SelectTimeError = () => {
   return (
      <div className='failure-message'>
         Please select time slot from the list above
      </div> 
   )
}

export const AppointmentCancelation = () => {
   const theme = useContext(ThemeContext);
   const { text_color } = theme;
   return (
      <div className='appointment-canceled-message'>
         This appointment was canceled
         <div>
            <Link style={{color: text_color}} className='link' to='/reserve'><Button>Make another one</Button> </Link>
         </div>
      </div>
   )
}

export const ReauthenticationError = () => {
   return (
      <div className='failure-message'>
         Current primary email or password is incorrect
      </div> 
   )
}

export const EmailChangeFailure = () => {
   return (
      <div className='failure-message'>
         It looks like the email address you try to assign to this account is already in use. Please use different email
      </div> 
   )
}