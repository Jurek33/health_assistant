import React from 'react';
import './select-input.style.scss';

export const SelectLocation = ({handleChoice, label, ...otherProps}) => {
   return (
      <div 
         className='options'
         onChange={handleChoice}
         {...otherProps}
         >
         <label className='label'>Please select one of the locations</label>
         <select>
            <option value='none'>-not selected-</option>
            <option value='1'>clinic 1</option>
            <option value='2'>clinic 2</option>
            <option value='3'>clinic 3</option>
         </select>
      </div>
   )
}