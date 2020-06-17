import React, { useContext } from 'react';
import { ThemeContext } from '../../App';
import './spinner.style.scss';

const Spinner = () => {
   const theme = useContext(ThemeContext);
   const { text_color } = theme;
   return (
      <div className="spinner">
         <div style={{backgroundColor: text_color}} className="bounce1"></div>
         <div style={{backgroundColor: text_color}} className="bounce2"></div>
         <div style={{backgroundColor: text_color}} className="bounce3"></div>
      </div>
   )
}

export default Spinner;