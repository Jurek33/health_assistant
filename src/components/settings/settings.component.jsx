import React, { useState } from 'react';
import Button from '../custom-button/custom.button.component';
import './settings.component.style.scss';

const Settings = () => {
   const [prevState, setState] = useState({backgroundColor: true})
   const switchColor = () => setState({backgroundColor: !prevState.backgroundColor})
   return (
      <div className={prevState.backgroundColor ? 'standard' : 'dark'}>
         <div className='color-scheme'>
            <div>Choose color theme</div>
            <Button onClick={switchColor}>Dark</Button>
            <Button>Light</Button>
            <Button>Standard</Button>
         </div>
      </div>
   )
}

export default Settings;