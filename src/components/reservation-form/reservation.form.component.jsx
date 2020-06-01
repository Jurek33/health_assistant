import React, { useState } from 'react';
import { connect } from 'react-redux';
import './reservation.form.style.scss';

import FormInput from '../form-input/form-input.component';
import Button from '../custom-button/custom.button.component';
import Spinner from '../spinner/spinner.component';
import { ReservationError, SelectLocationError, SelectDeptError } from '../error-boundary/error-boundary.component';
import { SelectLocation, SelectDepartment, SelectTimeSlot } from '../select-input/select-input.component';

import { reservationStart } from '../../redux/user/user.actions';
import { selectIsPending } from '../../redux/user/user.selector';
import { selectError } from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';

const ReservationForm = ({reservationStart, isPending, error}) => {

   const [initialData, setUserData] = useState({
      legalName: '',
      policyNumber: '',
      location: '',
      department: '',
      isLocationSelectFailed: false,
      isDepertmentSelectFailed: false
   });
   const { legalName, policyNumber, location, department, isLocationSelectFailed, isDepertmentSelectFailed } = initialData;

   const handleChange = event => {
      const { name, value } = event.target;
      setUserData({...initialData, [name]: value})
   }

   const handleChoice = event => {
      const { name, value } = event.target;
      setUserData({
         ...initialData,
         [name]: value,
         isLocationSelectFailed: false,
         isDepertmentSelectFailed: false
      })
   }

   const handleSubmit = async event => {
      event.preventDefault();
      if(!location || location==='none') {
         setUserData({...initialData, isLocationSelectFailed: true});
         return;
      }
      if(!department || department==='none') {
         setUserData({...initialData, isDepertmentSelectFailed: true});
         return;
      }
      await reservationStart({legalName, policyNumber, location, department});
      setUserData({
         legalName: '',
         policyNumber: ''
      })
   }

   return (
      <div className='reservation-form'>
         <form onSubmit={handleSubmit} id='reservation'>
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
               form='reservation'
               value={location}
               onChange={handleChoice}
            />
            <SelectDepartment 
               type='option'
               name='department'
               form='reservation'
               value={department}
               onChange={handleChoice}
            />
            <SelectTimeSlot />
            <div>
               { isPending ? <div>Just a few moments <Spinner /> </div>:
                  error ? <ReservationError /> : null }
            </div>
            <div>
               { isLocationSelectFailed ? <SelectLocationError /> : null}
            </div>
            <div>
               { isDepertmentSelectFailed ? <SelectDeptError /> :  null}
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