import React, { useState } from 'react';
import Button from '../custom-button/custom.button.component';
import { removeTicket } from '../../firebase/firebase.utils';

const SingleEvent = ({ticket}) => {
   //make sure not to display ticket that just has been removed
   const [prevState, setState] = useState({doesWantToCancel: false})
   const { location, department, timeSlot, date } = ticket;
   const { doesWantToCancel } = prevState;
   const cancelStart = () => setState({doesWantToCancel: true});
   const doNotCancel = () => setState({doesWantToCancel: false});
   const remove = () => removeTicket(ticket)
   return (
      <div className="eventInfo">
         <div className="date">Date: {date}</div>
         <div className="timeSlot">Time: {timeSlot}</div>
         <div className="location">Location: {location}</div> 
         <div className="department">Department: {department}</div>
         <Button onClick={cancelStart}>Cancel Appointment</Button>
         <div className="cancel-confirmation">
            {
               doesWantToCancel ? 
               <div>
                  <h4>Are you sure you want to cancel?</h4>
                  <Button onClick={remove}>Yes</Button>
                  <Button onClick={doNotCancel}>No</Button>
               </div>
               : null
                
            }
         </div>
      </div>
   )
}

export default SingleEvent