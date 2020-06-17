import React from 'react';
import './custom.button.style.scss';

const Button = ({children, ...props}) => {
   return (
      <button className='button' {...props}>
         {children}
      </button>
   )
}

export default Button;