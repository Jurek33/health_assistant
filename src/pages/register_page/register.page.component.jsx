import React from 'react';
import Register from '../../components/register/register.component';
import './register.page.style.scss';
import { Link } from 'react-router-dom';
const RegisterPage = () => {
   return (
      <div>
         <div className="register-container">
            <h2>Welcome to Health Assistant</h2>
               <Register />
         </div>
         <Link className="link" to='/'>Back to sign in</Link>
      </div>
   )
}

export default RegisterPage;