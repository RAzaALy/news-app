import React from 'react';

// Define the type for the props
interface HeadingProps {
  text: string;
  className?: string; // className is optional
}

const Heading: React.FC<HeadingProps> = ({ text, className }) => {
  return (
    <h1 className={`text-3xl heading ${className}`}>{text}</h1>
  );
}

export default Heading;
