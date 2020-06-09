import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '../custom-button/custom.button.component';
import { cancellationStart } from '../../redux/user/user.actions';
import './single.event.style.scss';
import { AppointmentCancelation } from '../error-boundary/error-boundary.component';

const SingleEvent = ({ticket, cancellationStart}) => {
   //make sure not to display ticket that has just been removed
   const [prevState, setState] = useState({doesWantToCancel: false, gotCanceled: false})
   const { location, department, timeSlot, date } = ticket;
   const { doesWantToCancel, gotCanceled} = prevState;
   const cancelStart = () => setState({doesWantToCancel: true, gotCanceled: false});
   const doNotCancel = () => setState({doesWantToCancel: false, gotCanceled: false});
   const remove = async () => {
      await cancellationStart(ticket);
      setState({doesWantToCancel: false, gotCanceled: true})
   }

   return (
      <div className="eventInfo">
         { 
            gotCanceled ? <AppointmentCancelation /> :
            <div>
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
         }
      </div>
   )
}

const mapDispatchToProps = dispatch => ({
	cancellationStart: ticket => dispatch(cancellationStart(ticket))
})

export default connect(null, mapDispatchToProps)(SingleEvent)