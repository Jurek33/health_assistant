import React from 'react';
import './error-boundary.style.scss';

export const SignInError = ({message}) => {
   return(
      <div className='container'>
         <div className='message'>
           {message} 
         </div> 
      </div>
   )
}