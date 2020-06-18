import React, { useContext } from 'react';
import { ThemeContext } from '../../App';
import './custom.button.style.scss';

const Button = ({children, ...props}) => {
   const theme = useContext(ThemeContext);
   const { button_color } = theme;
   if(button_color==='rgb(181, 255, 162)') {
      return(
      <button className='button' {...props}>
         {children}
      </button>)
   } else {
      return(
         <button className='dark' {...props}>
            {children}
         </button>
      )
   }
}

export default Button;