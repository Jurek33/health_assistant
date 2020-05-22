import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button from '../custom-button/custom.button.component';
import Spinner from '../spinner/spinner.component';
import { PasswordError } from '../error-boundary/error-boundary.component';
import { registerStart } from '../../redux/user/user.actions';
import { selectIsPending } from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';

import './register.style.scss';

const Register = ({registerStart, isPending}) => {

	const [userCredentials, setUserCredentials] = useState({ 
		displayName: '',
		email: '',
		password: '',
		confirmPassword: '',
		tickets: ''
	 });

	 const [prevState, setState] = useState({
		 isPasswFailed: false
	 })

	 const {displayName, email, password, confirmPassword} = userCredentials;
	 const handleSubmit = async event => {
		event.preventDefault();
		if(password.length<6) {
			setState({isPasswFailed: true})
			return;
		} else if(password!==confirmPassword) {
			setState({isPasswFailed: true})
			return;
		};

		registerStart({ displayName, email, password });
	};

	const handleChange = event => {
		const { name, value } = event.target;
		setUserCredentials({...userCredentials, [name]: value});
	};
		return(
			<div className="register">
			<form className="register-form" onSubmit={handleSubmit}>
				<FormInput
					type="text"
					name="displayName"
					value={displayName}
					onChange={handleChange}
					label="Display Name"
					required
				/>
				<FormInput
					type="email"
					name="email"
					value={email}
					onChange={handleChange}
					label="Email"
					required
				/>
				<FormInput
					type="password"
					name="password"
					value={password}
					onChange={handleChange}
					label="Password"
					required
				/>
				<FormInput
					type="password"
					name="confirmPassword"
					value={confirmPassword}
					onChange={handleChange}
					label="Confirm Password"
					required
				/>
				<div className='pending-error-message'>
					<div>
						{ prevState.isPasswFailed ? <PasswordError /> : null }
					</div>
					<div>
						{ isPending ? <div>Just a few moments <Spinner /> </div> : null }
					</div>
				</div>
				<Button type="submit">Register</Button>
			</form>
		</div>
		)
}

const mapDispatchToProps = dispatch => ({
	registerStart: userCredentials => dispatch(registerStart(userCredentials))
});

const mapStateToProps = createStructuredSelector({
   isPending: selectIsPending
 });

export default connect(mapStateToProps, mapDispatchToProps)(Register);

