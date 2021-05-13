import React from 'react';

const Display = ({ displayText, className }) => {
  /*
    I removed the id='display' from this component in order to put it in the displayContainer element. But it might be that the fcc tests require the element with the id='display' to contain the actual value, so may need to revisit this. 
  */
  return <h2 className={`${className} display`}>{displayText}</h2>;
};

export default Display;
