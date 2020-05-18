import React, { Component } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../custom-button/custom.button.component';
import { auth } from '../../firebase/firebase.utils';

import './signin.style.scss';

class SignIn extends Component {
  constructor() {
     super();
     this.state = {
        email: '',
        password: ''
     }
  }

  handleSubmit = async event => {
   event.preventDefault();

   const { email, password } = this.state;

   try {
      await auth.signInWithEmailAndPassword(email,password);
      this.setState({ email: '', password: '' });
   } catch (err) {
      console.log(err)
   }
 };

  handleChange = event => {
   const { value, name } = event.target;

   this.setState({ [name]: value });
 };

 render() {
    return(
      <div className="signin">
         <form onSubmit={this.handleSubmit}>
            <FormInput 
            name="email"
            type="email"
            value={this.state.email}
            handleChange={this.handleChange}
            label="email"
            required
            />
            <FormInput 
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="password"
            required
            />
            <Button type="submit">Log In</Button>
         </form>
      </div>
    )
 }


}

export default SignIn;
