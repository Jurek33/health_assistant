import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../App';
import './dashboard.style.scss';
import EventDetail from '../event-detail/event.detail.component';
import Spinner from '../spinner/spinner.component';
import { getUserTickets } from '../../firebase/firebase.utils';
import { Link } from 'react-router-dom';
import Button from '../custom-button/custom.button.component';

const Dashboard = () => {
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

   const theme = useContext(ThemeContext);
   const { text_color } = theme;

   return (
      <div>
         <h2 className="header">My upcoming events</h2>
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
             <Link style={{color: text_color}} className="link" to="/reserve"><Button>Reserve a visit</Button></Link>
           </div> 
         }
      </div>
   )
}

export default Dashboard;