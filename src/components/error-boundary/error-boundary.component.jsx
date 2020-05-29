import React from 'react';
import './error-boundary.style.scss';

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