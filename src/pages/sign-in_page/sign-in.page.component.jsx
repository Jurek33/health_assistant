import React from 'react';
import SignIn from '../../components/sign-in/signin.component';
import './sign-in.page.style.scss';
import { Link } from 'react-router-dom';
const SignInPage = () => {
   return (
      <div>
         <div className="signin_container">
            <h2>Welcome to Health Assistant</h2>
               <SignIn />
         </div>
         <Link className="link" to='/register'>I do not have an account yet</Link>
      </div>
   )
}

export default SignInPage;