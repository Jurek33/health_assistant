import React from 'react';
import Button from '../custom-button/custom.button.component';
import './event.detail.style.scss';

const EventDetail = () => {
   return (
      <div className="detail-container">
         <div className="detail-item">Date <Button>view ticket</Button> </div>
         <div className="detail-item">Time <Button>reschedule</Button></div>
         <div className="detail-item">Location <Button>cancel</Button></div>
      </div>
   )
}

export default EventDetail;