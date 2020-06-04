import React from 'react';

const SingleSlot = ({item, ...otherProperties}) => {
   const { value, isAvaliable } = item;
   return (
         isAvaliable ? <option value={value} {...otherProperties}>{value}</option> : null
   )
}

export default SingleSlot