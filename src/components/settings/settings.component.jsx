import React from 'react';
import Button from '../custom-button/custom.button.component';
import './settings.component.style.scss';

const Settings = ({switchColor, switchDark, switchStandard}) => {

   return (
      <div className='standard'>
         <div className='color-scheme'>
            <h2 className='header'>Set color theme</h2>
            <Button onClick={switchColor}>Green</Button>
            <Button onClick={switchDark}>Dark</Button>
            <Button onClick={switchStandard}>Light</Button>
         </div>
      </div>
   )
}

export default Settings;