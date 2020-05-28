import React, { useState } from 'react';
import { connect } from 'react-redux';
import './reservation.form.style.scss';

import FormInput from '../form-input/form-input.component';
import Button from '../custom-button/custom.button.component';
import Spinner from '../spinner/spinner.component';
import { ReservationError } from '../error-boundary/error-boundary.component';
import { SelectLocation } from '../select-input/select-input.component';

import { reservationStart } from '../../redux/user/user.actions';
import { selectIsPending } from '../../redux/user/user.selector';
import { selectError } from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';

const ReservationForm = ({reservationStart, isPending, error}) => {

   const [initialData, setUserData] = useState({
      legalName: '',
      policyNumber: '',
      location: ''
   });
   const { legalName, policyNumber, location } = initialData;

   const handleChange = event => {
      const { name, value } = event.target;
      setUserData({...initialData, [name]: value})
   }

   const handleChoice = event => {
      //find a way to pass selected location properly
   }

   const handleSubmit = async event => {
      event.preventDefault();
      await reservationStart({legalName, policyNumber, location});
      setUserData({
         legalName: '',
         policyNumber: '',
         location: ''
      })
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
            <FormInput
               type='number'
               name='policyNumber'
               value={policyNumber}
               onChange={handleChange}
               label='Your insurance policy number'
               required
            />
            <SelectLocation
               type='option'
               name='location'
               value={location}
               onChange={handleChoice}
            />
            <div>
               { isPending ? <div>Just a few moments <Spinner /> </div>:
                  error ? <ReservationError />:
                  null }
            </div>
            <Button type='submit'>Submit</Button>
         </form>
      </div>
   )
}

const mapDispatchToProps = dispatch => ({
   reservationStart: initialData => dispatch(reservationStart(initialData))
})

const mapStateToProps = createStructuredSelector({
   isPending: selectIsPending,
   error: selectError
 });

export default connect(mapStateToProps, mapDispatchToProps)(ReservationForm);