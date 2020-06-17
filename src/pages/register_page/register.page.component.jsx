import React, { useContext } from 'react';
import { ThemeContext } from '../../App';
import Register from '../../components/register/register.component';
import './register.page.style.scss';

const RegisterPage = () => {
   const theme = useContext(ThemeContext);
   const { text_color } = theme;
   return (
      <div>
         <div className="register-container">
            <h2 className="header">Welcome to Health Assistant</h2>
               <Register />
         </div>
         <a style={{color: text_color}} className="link" href='/'>Back to sign in</a>
      </div>
   )
}

export default RegisterPage;