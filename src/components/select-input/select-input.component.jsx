import React from 'react';
import './select-input.style.scss';

export const SelectLocation = ({handleChoice, ...otherProperties}) => {
   return (
      <div className='options'>
         <label className='label'>Select one of the locations</label>
         <select name='location' onChange={handleChoice} {...otherProperties}>
            <option value='none'>not selected</option>
            <option value='clinic 1'>clinic 1</option>
            <option value='clinic 2'>clinic 2</option>
            <option value='clinic 3'>clinic 3</option>
         </select>
      </div>
   )
}

export const SelectDepartment = ({handleChoice, ...otherProperties}) => {
   return (
      <div className='options'>
         <label className='label'>Select department</label>
         <select name='location' onChange={handleChoice} {...otherProperties}>
            <option value='none'>not selected</option>
            <option value='general care'>general care</option>
            <option value='cardiology'>cardiology</option>
            <option value='neurology'>neurology</option>
            <option value='laboratory/testing'>laboratory/testing</option>
         </select>
      </div>
   )
}