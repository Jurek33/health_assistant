import React from 'react';
import Register from '../../components/register/register.component';
import './register.page.style.scss';

const RegisterPage = () => {
   return (
      <div>
         <div className="register-container">
            <h2>Welcome to Health Assistant</h2>
               <Register />
         </div>
         <a className="link" href='/'>Back to sign in</a>
      </div>
   )
}

export default RegisterPage;