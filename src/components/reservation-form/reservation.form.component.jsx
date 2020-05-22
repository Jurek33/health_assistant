import React, { useState } from 'react';
import './reservation.form.style.scss';import FormInput from '../form-input/form-input.component';
import Button from '../custom-button/custom.button.component';
;
const ReservationForm = () => {

   const [initialData, setUserData] = useState({
      legalName: ''
   });
   const { legalName } = initialData;

   const handleChange = event => {
      const { name, value } = event.target;
      setUserData({...initialData, [name]: value})
   }

   const handleSubmit = async event => {
      event.preventDefault();
      console.log(event)
   }

   return (
      <div className='reservation-form'>
         <form onSubmit={handleSubmit}>
            <FormInput
               type='text'
               name='legalName'
               value={legalName}
               onChange={handleChange}
               label='Your full legal name'
               required
            />
            <Button type='submit'>Submit</Button>
         </form>
      </div>
   )
}

export default ReservationForm;