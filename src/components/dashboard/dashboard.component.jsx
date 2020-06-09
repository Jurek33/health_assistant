import React, { useState, useEffect } from 'react';
import './dashboard.style.scss';
import EventDetail from '../event-detail/event.detail.component';
import Spinner from '../spinner/spinner.component';
import { getUserTickets } from '../../firebase/firebase.utils';
import { Link } from 'react-router-dom';
import Button from '../custom-button/custom.button.component';

const Dashboard = () => {
   //for further updates: make sure not to display tickets with past date
   const [prevState, setState] = useState({
      ticketData: null,
      isLoading: false
   })

   const { ticketData, isLoading } = prevState;

   useEffect(() => {
      setState({isLoading: true})
      getUserTickets()
         .then(data=> setState({ticketData: data, isLoading: false}))
         .catch(()=>setState({isLoading: false}))
   }, [])

   return (
      <div>
         <h2 className="header">This is main page</h2>
         { 
           isLoading ? 
           <div className="loading-boundary"> 
            <Spinner /> 
            <h4 className="message">Loading data</h4> 
           </div>
           : 
           ticketData && ticketData.length>0 ? 
           <EventDetail tickets={ticketData}/> 
           : 
           <div className="no-event-boundary">
             <h4 className="message">You have no events upcoming</h4>
             <Button children={<Link className="link" to="/reserve"> Reserve a visit </Link>} />
           </div> 
         }
      </div>
   )
}

export default Dashboard;