import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button from '../custom-button/custom.button.component';
import { registerStart } from '../../redux/user/user.actions';

import './register.style.scss';

const Register = ({registerStart}) => {

	const [userCredentials, setUserCredentials] = useState({ 
		displayName: '',
		email: '',
		password: '',
		confirmPassword: ''
	 });

	 const {displayName, email, password, confirmPassword} = userCredentials;
	 const handleSubmit = async event => {
		event.preventDefault();
		if(password.length<6) {
			alert('Password must be at least 6 characters');
			return;
		} else if(password!==confirmPassword) {
			alert('passwords do not match');
			return;
		};

		registerStart({ displayName, email, password });
	};

	const handleChange = event => {
		const { name, value } = event.target;
		setUserCredentials({...userCredentials, [name]: value})
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
				<Button type="submit">Register</Button>
			</form>
		</div>
		)
}

const mapDispatchToProps = dispatch => ({
	registerStart: userCredentials => dispatch(registerStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(Register);

// constructor() {
// 	super();
// 	this.state = {
// 		displayName: '',
// 		email: '',
// 		password: '',
// 		confirmPassword: ''
// 	}
// }

// handleSubmit = async event => {
// 	event.preventDefault();

// 	const { displayName, email, password, confirmPassword } = this.state;

// 	if (password !== confirmPassword) {
// 	  alert("passwords don't match");
// 	  return;
// 	}

// 	try {
// 	  const { user } = await auth.createUserWithEmailAndPassword(
// 		 email,
// 		 password
// 	  );

// 	  await createUserProfileDocument(user, { displayName });

// 	  this.setState({
// 		 displayName: '',
// 		 email: '',
// 		 password: '',
// 		 confirmPassword: ''
// 	  });
// 	} catch (error) {
// 	  console.error(error);
// 	}
//  };

// handleChange = event => {
// 	const { name, value } = event.target;

// 	this.setState({ [name]: value });
//  };
