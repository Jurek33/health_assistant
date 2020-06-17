import React, { useContext } from 'react';
import { ThemeContext } from '../../App';
import './footer.style.scss';

const Footer = () => {
   const theme = useContext(ThemeContext);
   const { text_color } = theme;
   return (
      <div className="wrapper">
         <footer className="footer"> 
            <a style={{color: text_color}} href='https://github.com/Jurek33/health_assistant'>source code</a>
         </footer>
      </div>
   )
}

export default Footer;