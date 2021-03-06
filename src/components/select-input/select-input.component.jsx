import React, { useEffect, useState } from 'react';
import { getLocations, getLocationById } from '../../firebase/firebase.utils';
import './select-input.style.scss';
import TimeSlots from '../time-slots/time-slots.component';

export const SelectLocation = ({handleChoice, ...otherProperties}) => {
   const [prevState, setState] = useState({
      info1: '',
      info2: '',
      info3: ''
   })

   useEffect(() => {
      getLocations()
      .then(data => setState({
         info1: data[0],
         info2: data[1],
         info3: data[2]
      }))
   },[])

   const { info1, info2, info3 } = prevState;

   return (
      <div className='options first'>
         <label className='label'>Location</label>
         <select className='select' name='location' onChange={handleChoice} {...otherProperties}>
            <option value='none'>not selected</option>
            <option value={info1.name}>{info1.name}</option>
            <option value={info2.name}>{info2.name}</option>
            <option value={info3.name}>{info3.name}</option>
         </select>
      </div>
   )
}

export const SelectDepartment = ({handleChoice, ...otherProperties}) => {
   return (
      <div className='options'>
         <label className='label'>Department</label>
         <select className='select' name='location' onChange={handleChoice} {...otherProperties}>
            <option value='none'>not selected</option>
            <option value='general care'>general care</option>
            <option value='cardiology'>cardiology</option>
            <option value='neurology'>neurology</option>
            <option value='laboratory/testing'>laboratory/testing</option>
         </select>
      </div>
   )
}

export const SelectTimeSlot = ({id, location, handleChoice, ...otherProperties}) => {
   const [prevState, setState] = useState({ locationData: location})

   useEffect(() => {
      getLocationById(id).then(data => setState({locationData: data}))
   }, [id]);

   const { locationData } = prevState;

   return (
      location==='none' || !locationData ? 
      null : 
      <div className='options'>
         <label className="label">Time slot</label>
         <select className='select' name='timeSlot' onChange={handleChoice} {...otherProperties} >
            <option value='none'>not selected</option>
            <TimeSlots items={locationData.timeSlots}/>
         </select>
      </div>
   )
}

