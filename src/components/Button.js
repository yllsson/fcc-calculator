import React from 'react';

const Button = ({ buttonText, id, onClick, className }) => {
  return (
    <button className={`${className} button`} onClick={onClick} id={id}>
      {buttonText}
    </button>
  );
};

export default Button;
