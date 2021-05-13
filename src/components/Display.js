import React from 'react';

const Display = ({ displayText, className, id }) => {
  return (
    <h2 className={`${className} display`} id={id}>
      {displayText}
    </h2>
  );
};

export default Display;
