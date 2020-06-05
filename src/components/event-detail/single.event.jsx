import React from 'react';

const SingleEvent = ({ticket}) => {
   const { location, department, timeSlot } = ticket;
   return (
      <div className="eventInfo">
         <div className="location">{location}</div> 
         <div className="department">{department}</div> 
         <div className="timeSlot">{timeSlot}</div>
      </div>
   )
}

export default SingleEvent