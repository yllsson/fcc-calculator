import React from 'react';

const Button = ({ buttonText, id, onClick }) => {
  return (
    <button className='button' onClick={onClick} id={id}>
      {buttonText}
    </button>
  );
};

export default Button;
