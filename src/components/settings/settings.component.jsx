import React from 'react';
import Button from '../custom-button/custom.button.component';
import './settings.component.style.scss';

const Settings = ({switchColor, switchDark, switchStandard}) => {

   return (
      <div className='standard'>
         <div className='color-scheme'>
            <div>Choose color theme</div>
            <Button onClick={switchColor}>Light</Button>
            <Button onClick={switchDark}>Dark</Button>
            <Button onClick={switchStandard}>Standard</Button>
         </div>
      </div>
   )
}

export default Settings;