import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../App';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import jsPDF from 'jspdf';

import Button from '../custom-button/custom.button.component';
import Spinner from '../spinner/spinner.component';
import { cancellationStart } from '../../redux/user/user.actions';
import { AppointmentCancelation } from '../error-boundary/error-boundary.component';
import { getLocationById } from '../../firebase/firebase.utils';
import { selectIsPending } from '../../redux/user/user.selector';

import './single.event.style.scss';

const SingleEvent = ({ticket, cancellationStart, isPending}) => {
   const theme = useContext(ThemeContext);
   const { event_detail_background } = theme;
   const [prevState, setState] = useState({ doesWantToCancel: false, gotCanceled: false })
   const { location, department, timeSlot, date, locationId } = ticket;
   const { doesWantToCancel, gotCanceled} = prevState;
   const cancelStart = () => setState({doesWantToCancel: true, gotCanceled: false});
   const doNotCancel = () => setState({doesWantToCancel: false, gotCanceled: false});
   const remove = async () => {
      await cancellationStart(ticket);
      setState({doesWantToCancel: false, gotCanceled: true})
   }

   const downloadTicket = async () => {
      const currentLocation = await getLocationById(locationId);
      const address = currentLocation.address
      const doc = new jsPDF();
      doc.text('This is your ticket confirmation', 10, 20);
      doc.text(`Date: ${date}`, 10, 40);
      doc.text(`Time: ${timeSlot}`, 10, 50);
      doc.text(`Location: ${location}`, 10, 60);
      doc.text(`Address: ${address}`, 10, 70);
      doc.text(`Department: ${department}`, 10, 80);
      doc.text(`Confirmation Number: ${Math.floor(Math.random()*1000000)}`, 10, 90);
      doc.text('Please note that this confirmation will no longer', 10, 110);
      doc.text('be vaild if you cancel this appointment after downloading the ticket', 10, 120);
      doc.save('appointment-confirmation.pdf');
   }

   return (
      <div className="eventInfo">
         {
            isPending ? <div>Just a few moments <Spinner /></div> :
            gotCanceled ? <AppointmentCancelation /> :
            <div style={{backgroundColor:event_detail_background}} className="event">
               <div className="event-detail-component">Date: {date}</div>
                  <div className="event-detail-component">Time: {timeSlot}</div>
                  <div className="event-detail-component">Location: {location}</div> 
                  <div className="event-detail-component">Department: {department}</div>
                  <Button className="button event-detail-component-button" onClick={downloadTicket}>Download Ticket</Button>
                  <Button className="button event-detail-component-button" onClick={cancelStart}>Cancel Appointment</Button>
                  <div className="cancel-confirmation">
                     {
                        doesWantToCancel ? 
                        <div>
                           <h4>Are you sure you want to cancel?</h4>
                           <Button className="button event-detail-component-button" onClick={remove}>Yes</Button>
                           <Button className="button event-detail-component-button" onClick={doNotCancel}>No</Button>
                        </div>
                        : null
                        
                     }
                  </div>
            </div>
         }
      </div>
   )
}

const mapStateToProps = createStructuredSelector({
   isPending: selectIsPending
 });

const mapDispatchToProps = dispatch => ({
	cancellationStart: ticket => dispatch(cancellationStart(ticket))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleEvent)