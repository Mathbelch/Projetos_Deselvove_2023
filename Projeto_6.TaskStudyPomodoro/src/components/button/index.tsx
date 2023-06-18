import React from 'react';
import Style from './Button.module.scss';

interface Props {
   type?: "button" | "submit" | "reset" | undefined, 
   children?: React.ReactNode | undefined,
   onClick?: () => void
}

function Button({ onClick, type, children }: Props) {
   return (
      <button onClick={onClick} type={type} className={Style.button}>
         {children}
      </button>
   )
}

export default Button;