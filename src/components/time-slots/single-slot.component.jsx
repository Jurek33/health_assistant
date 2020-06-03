import React from 'react';

const SingleSlot = ({item}) => {
   const { value } = item;
   return (
      <div className='time-slot'>
         <div className='value'>{value}</div>
      </div>
   )
}

export default SingleSlot