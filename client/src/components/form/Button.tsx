import React from 'react';
import type { ButtonProps } from '../../misc/types';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps> = ({ variant, className, children, ...rest }) => {
  return (
    <button className={`my-btn btn-${variant} transition-03 pointer ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
