import React, { useState } from 'react';
import { connect } from 'react-redux';
import './reservation.form.style.scss';

import FormInput from '../form-input/form-input.component';
import Button from '../custom-button/custom.button.component';

import { reservationStart } from '../../redux/user/user.actions';
import { createUserTicketDocument } from '../../firebase/firebase.utils';

const ReservationForm = () => {

   const [initialData, setUserData] = useState({
      legalName: ''
   });
   const { legalName } = initialData;

   const handleChange = event => {
      const { name, value } = event.target;
      setUserData({...initialData, [name]: value})
   }

   const handleSubmit = async event => {
      event.preventDefault();
      createUserTicketDocument({legalName});
   }

   return (
      <div className='reservation-form'>
         <form onSubmit={handleSubmit}>
            <FormInput
               type='text'
               name='legalName'
               value={legalName}
               onChange={handleChange}
               label='Your full legal name'
               required
            />
            <Button type='submit'>Submit</Button>
         </form>
      </div>
   )
}

const mapDispatchToProps = dispatch => ({
   reservationStart: initialData => dispatch(reservationStart(initialData))
})

export default connect(null, mapDispatchToProps)(ReservationForm);