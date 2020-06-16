import React, { useContext } from 'react';
import { ThemeContext } from '../App';


export const ThemedDiv = (props) => {
   const theme = useContext(ThemeContext);
   const { background, text_color } = theme;
   return (
     <div style={{background: background, color: text_color}} {...props}></div>
   )
}

export const MainDiv = (props) => <ThemedDiv {...props}/>