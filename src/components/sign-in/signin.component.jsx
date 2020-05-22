import React, { useState } from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import Button from '../custom-button/custom.button.component';
// import { auth } from '../../firebase/firebase.utils';
import { emailSignInStart } from '../../redux/user/user.actions';
import { SignInError } from '../error-boundary/error-boundary.component';
import Spinner from '../spinner/spinner.component';
import { selectError, selectIsPending } from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';

import './signin.style.scss';

const SignIn = ({ emailSignInStart, error, isPending }) => {
   const [userCredentials, setCredentials] = useState({ 
      email: '', 
      password: '' 
   });
   const { email, password } = userCredentials;

   const handleSubmit = async event => {
      event.preventDefault();
      emailSignInStart(email, password);
	};

	const handleChange = event => {
		const { value, name } = event.target;
      setCredentials({...userCredentials, [name]: value });
      
   };

    return(
      <div className="signin">
         <form onSubmit={handleSubmit}>
            <FormInput 
            name="email"
            type="email"
            value={email}
            handleChange={handleChange}
            label="email"
            required
            />
            <FormInput 
            name="password"
            type="password"
            value={password}
            handleChange={handleChange}
            label="password"
            required
            />
            <div className="pending-error-message">
               {
                  isPending ? <div>loading <Spinner /> </div>:
                  error ?<SignInError />:
                  null
               }
            </div>
            <Button type="submit">Log In</Button>
         </form>
      </div>
    )
}

const mapDispatchToProps = dispatch => ({
	emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

const mapStateToProps = createStructuredSelector({
   error: selectError,
   isPending: selectIsPending
 });


export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

