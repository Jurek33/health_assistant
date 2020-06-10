import React, { useState } from 'react';
import { connect } from 'react-redux';
import './reservation.form.style.scss';

import FormInput from '../form-input/form-input.component';
import Button from '../custom-button/custom.button.component';
import Spinner from '../spinner/spinner.component';
import { ReservationError, SelectLocationError, SelectDeptError, SelectTimeError } from '../error-boundary/error-boundary.component';
import { SelectLocation, SelectDepartment, SelectTimeSlot } from '../select-input/select-input.component';

import { reservationStart } from '../../redux/user/user.actions';
import { selectIsPending } from '../../redux/user/user.selector';
import { selectError } from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

const ReservationForm = ({reservationStart, isPending, error}) => {
   //for futher updates: make sure there is no way to provide negative policy number
   const getTomorrowDay = () => {
      let today = new Date();
      today.setDate(today.getDate()+1);
      const arr = [today.getMonth()+1, '/', today.getDate(),'/', today.getFullYear()]
      return(arr.join(''))
   }

   const [initialData, setUserData] = useState({
      legalName: '',
      policyNumber: '',
      location: '',
      locationId: 0,
      department: '',
      date: getTomorrowDay(),
      timeSlot: '',
      isLocationSelectFailed: false,
      isDepertmentSelectFailed: false,
      isTimeSelectFailed: false,
      isReservationSucceed: false
   });
   const { 
      legalName, 
      policyNumber, 
      location, 
      locationId, 
      date, 
      timeSlot, 
      department, 
      isLocationSelectFailed, 
      isDepertmentSelectFailed, 
      isTimeSelectFailed,
      isReservationSucceed
   } = initialData;

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
      if(!timeSlot || timeSlot==='none') {
         setUserData({...initialData, isTimeSelectFailed: true});
         return;
      }
      await reservationStart({legalName, policyNumber, location, locationId, department, date, timeSlot});
      setUserData({
         legalName: '',
         policyNumber: '',
         location: '',
         locationId: 0,
         department: '',
         timeSlot: '',
         date: getTomorrowDay(),
         isLocationSelectFailed: false,
         isDepertmentSelectFailed: false,
         isTimeSelectFailed: false,
         isReservationSucceed: true
      })
   }

   const anotherReservation = () => {
      setUserData({...initialData, isReservationSucceed: false})
   }

   return (
      <div>
         {
            isReservationSucceed ? 
            <div>
               <h4>Appointment was successfuly scheduled!</h4>
               <div>Would you like to make another one?</div>
               <Button onClick={anotherReservation}>Yes</Button>
               <Button><Link to='/home'>No</Link></Button>
            </div> 
            :
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
               <SelectTimeSlot
                  type='option'
                  name='timeSlot'
                  form='reservation'
                  id={locationId}
                  onChange={handleChoice}
                  location={location} 
                  value={timeSlot}
               />
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
               <div>
                  {isTimeSelectFailed ? <SelectTimeError /> : null}
               </div>
               <Button type='submit'>Submit</Button>
            </form>
         </div>
         }
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