import React, { Component } from 'react';
import './dashboard.style.scss';
import EventDetail from '../event-detail/event.detail.component';

class Dashboard extends Component {
   constructor() {
      super();
      this.state = {
         hasUpcomingEvents: true
      }
   }
   render() {
      if(!this.state.hasUpcomingEvents) {
         return (
            <div className="dashboard-container">
               <h2 className="title">You have no upcoming events</h2>
            </div>
         )
      } else {
         return(
            <div className="dashboard-container">
               <h2 className="title">Upcoming events</h2>
               <EventDetail className="detail"/>
               <EventDetail className="detail" />
            </div>
         )
      }
   }
}

export default Dashboard;