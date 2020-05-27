import React from 'react';
import SignIn from '../../components/sign-in/signin.component';
import './sign-in.page.style.scss';

const SignInPage = () => {
   return (
      <div>
         <div className="signin_container">
            <h2>Welcome to Health Assistant</h2>
               <SignIn />
         </div>
         <a className="link" href='/register'>I do not have an account yet</a>
      </div>
   )
}

export default SignInPage;