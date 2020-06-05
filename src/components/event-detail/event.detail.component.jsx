import React from 'react';
import SingleEvent from './single.event';
import './event.detail.style.scss';

const EventDetail = ({tickets}) => {
   return (
      tickets.map(ticket => <SingleEvent key={ticket.timeSlot} ticket={ticket}/>)
   )
}

export default EventDetail;