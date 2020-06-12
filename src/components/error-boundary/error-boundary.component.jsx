import React from 'react';
import './error-boundary.style.scss';
import { Link } from 'react-router-dom';
import Button from '../custom-button/custom.button.component';

export const SignInError = () => {
   return(
      <div className='signin-failure-message'>
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
      <div className='register-failure-message'>
         Registration failed. This email address is assigned to existing account
      </div> 
   )
}

export const ReservationError = () => {
   return(
      <div className='reservation-failure-message'>
         Reservation failed, please refresh the page and try again
      </div> 
   )
}

export const SelectLocationError = () => {
   return (
      <div className='location-failure-message'>
         Please select the location from the list above
      </div> 
   )
}

export const SelectDeptError = () => {
   return (
      <div className='dept-failure-message'>
         Please select the department from the list above
      </div> 
   )
}

export const SelectTimeError = () => {
   return (
      <div className='time-failure-message'>
         Please select time slot from the list above
      </div> 
   )
}

export const AppointmentCancelation = () => {
   return (
      <div className='appointment-canceled-message'>
         This appointment was canceled
         <div>
            <Button><Link className='link' to='/reserve'>Make another one</Link></Button> 
         </div>
      </div>
   )
}

export const ReauthenticationError = () => {
   return (
      <div className='reauth-failure-message'>
         Current primary email or password is incorrect. Fix the errors and try again
      </div> 
   )
}

export const EmailChangeFailure = () => {
   return (
      <div className='reauth-failure-message'>
         It looks like the email address you try to assign to this account is already in use. Please use different email
      </div> 
   )
}