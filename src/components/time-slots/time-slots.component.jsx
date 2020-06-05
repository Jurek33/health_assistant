import React from 'react';
import SingleSlot from './single-slot.component';
import './time-slots.style.scss';

const TimeSlots = ({items, ...otherProperties}) => {
   return (
      items.map(item => 
         <SingleSlot 
            key={Math.floor(Math.random()*item.locationId*1000)} 
            item={item} 
            {...otherProperties}
      />)
   )
}

export default TimeSlots;