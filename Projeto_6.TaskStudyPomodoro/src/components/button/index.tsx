import React from 'react';
import Style from './Button.module.scss';

class Button extends React.Component <{ children?: React.ReactNode }> {
   render() {
      return (
         <button className={Style.button}>
            {this.props.children}
         </button>
      )
   }
}

export default Button;