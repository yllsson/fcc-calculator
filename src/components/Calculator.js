import React, { useState } from 'react';
import Button from './Button';
import Display from './Display';

const Calculator = () => {
  // state
  const [displayText, setDisplayText] = useState('0');

  const digits = [
    {
      text: '0',
      id: 'zero'
    },
    {
      text: '1',
      id: 'one'
    },
    {
      text: '2',
      id: 'two'
    },
    {
      text: '3',
      id: 'three'
    },
    {
      text: '4',
      id: 'four'
    },
    {
      text: '5',
      id: 'five'
    },
    {
      text: '6',
      id: 'six'
    },
    {
      text: '7',
      id: 'seven'
    },
    {
      text: '8',
      id: 'eight'
    },
    {
      text: '9',
      id: 'nine'
    }
  ];
  const operators = [
    {
      text: '=',
      id: 'equals'
    },
    {
      text: '+',
      id: 'add'
    },
    {
      text: '-',
      id: 'subtract'
    },
    {
      text: '*',
      id: 'multiply'
    },
    {
      text: '/',
      id: 'divide'
    },
    {
      text: ',',
      id: 'decimal'
    },
    {
      text: 'C',
      id: 'clear'
    }
  ];

  return (
    <div className='calculator'>
      <h1>I'm the Calculator component</h1>
      <Display displayText={displayText} />

      <section className='buttonContainer'>
        {digits.map(button => (
          <Button buttonText={button.text} id={button.id} key={button.id} />
        ))}

        {operators.map(button => (
          <Button buttonText={button.text} id={button.id} key={button.id} />
        ))}
      </section>
    </div>
  );
};

export default Calculator;
