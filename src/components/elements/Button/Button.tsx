import React from 'react';

// Define the type for the props
interface ButtonProps {
  className?: string; // className is optional
  text: string;       // text is required
  onClick : () => void
  disabled? : boolean
}

const Button: React.FC<ButtonProps> = ({ className, text, onClick , disabled = false}) => {
  return (
    <button className={`bg-slate-50 p-2 rounded-md transition delay-[10] hover:bg-slate-100 cursor-pointer ${className} ${disabled && "cursor-not-allowed opacity-25 hover:bg-slate-50"}`} onClick={onClick} disabled={disabled}>{text}</button>
  );
}

export default Button;
