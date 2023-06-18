import React from 'react';
import Style from './Button.module.scss';

class Button extends React.Component <{
   type?: "button" | "submit" | "reset" | undefined, 
   children?: React.ReactNode | undefined,
   onClick?: () => void
 }> {
   render() {
      const { type = "button" } = this.props;
      const children = this.props.children;
      const onClick = this.props.onClick;
      return (
         <button onClick={onClick} type={type} className={Style.button}>
            {children}
         </button>
      )
   }
}

export default Button;