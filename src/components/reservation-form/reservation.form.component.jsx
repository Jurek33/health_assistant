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
   //for futher updates: make sure there is no way to provide negative policy number

   const [initialData, setUserData] = useState({
      legalName: '',
      policyNumber: '',
      location: '',
      locationId: 0,
      department: '',
      isLocationSelectFailed: false,
      isDepertmentSelectFailed: false
   });
   const { legalName, policyNumber, location, locationId, department, isLocationSelectFailed, isDepertmentSelectFailed } = initialData;

   const handleChange = event => {
      const { name, value } = event.target;
      setUserData({...initialData, [name]: value})
   }

   const handleChoice = event => {
      const { name, value } = event.target;
      if(value==='clinic 1') {
         setUserData({
            ...initialData,
            [name]: value,
            locationId: 1,
            isLocationSelectFailed: false,
            isDepertmentSelectFailed: false
         })
      } else if(value==='clinic 2') {
         setUserData({
            ...initialData,
            [name]: value,
            locationId: 2,
            isLocationSelectFailed: false,
            isDepertmentSelectFailed: false
         })
      } else if(value==='clinic 3') {
         setUserData({
            ...initialData,
            [name]: value,
            locationId: 3,
            isLocationSelectFailed: false,
            isDepertmentSelectFailed: false
         })
      } else {
         setUserData({
            ...initialData,
            [name]: value,
            isLocationSelectFailed: false,
            isDepertmentSelectFailed: false
         })
      }
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
            <SelectTimeSlot id={locationId}/>
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