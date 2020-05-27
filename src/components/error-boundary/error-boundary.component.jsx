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
