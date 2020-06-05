import React, { useState, useEffect } from 'react';
import './dashboard.style.scss';
import EventDetail from '../event-detail/event.detail.component';
import { getUserTickets } from '../../firebase/firebase.utils';

const Dashboard = () => {
   const [prevState, setState] = useState({
      ticketData: null,
      isLoading: false
   })

   useEffect(() => {
      setState({isLoading: true})
      getUserTickets()
         .then(data=>setState({ticketData: data, isLoading: false}))
         .catch(()=>setState({isLoading: false}))
   }, [])

   const { ticketData, isLoading } = prevState;

   return (
      <div>
         <h2>This is main page</h2>
         { isLoading? <h4>Loading data</h4> : 
           ticketData ? <EventDetail tickets={ticketData}/> : 
           <h4>You have no events upcoming</h4>
         }
      </div>
   )
}

export default Dashboard;