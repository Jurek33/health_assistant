import React, { useContext } from 'react';
import { ThemeContext } from '../../App';
import SignIn from '../../components/sign-in/signin.component';
import './sign-in.page.style.scss';

const SignInPage = () => {
   const theme = useContext(ThemeContext);
   const { text_color } = theme;
   return (
      <div>
         <div className="signin_container">
            <h2>Welcome to Health Assistant</h2>
               <SignIn />
         </div>
         <a style={{color: text_color}} className="no-account-link" href='/register'>I do not have an account yet</a>
      </div>
   )
}

export default SignInPage;