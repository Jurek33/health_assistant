import React, { useContext } from 'react';
import { ThemeContext } from '../../App';
import './form-input.style.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => {
	const theme = useContext(ThemeContext);
   const { text_color } = theme;
	return (<div className="group">
		<input 
      className="form-input"
      onChange={handleChange} 
		{...otherProps} />
		{
			label ? 

			(<label
			style={{color: text_color}} 
			className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
				{label}	
			</label>)

			: null
		}
	</div>)
}

export default FormInput;