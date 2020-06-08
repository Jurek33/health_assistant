import React from 'react';
import SingleEvent from './single.event';
import './event.detail.style.scss';

const EventDetail = ({tickets}) => {
   return (
      tickets.map(ticket => <SingleEvent key={Math.floor(Math.random()*100000)} ticket={ticket}/>)
   )
}

export default EventDetail;