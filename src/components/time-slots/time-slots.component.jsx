import React from 'react';
import SingleSlot from './single-slot.component';
import './time-slots.style.scss';

const TimeSlots = ({items}) => {
   return (
      <div className='slots'>
         <div>I am time slots component</div>
         {Object.keys(items).map(item => <SingleSlot key={item} item={item}/>)}
      </div>
   )
}

export default TimeSlots;