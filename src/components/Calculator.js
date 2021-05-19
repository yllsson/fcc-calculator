import React, { useState } from 'react';
import Button from './Button';
import Display from './Display';

const Calculator = () => {
  // state
  const [displayText, setDisplayText] = useState('0');
  const [firstNum, setFirstNum] = useState(0);
  const [secondNum, setSecondNum] = useState(0);
  const [operator, setOperator] = useState('');

  const digits = [
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
    },
    {
      text: '0',
      id: 'zero'
    },
    {
      text: '.',
      id: 'decimal'
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
      text: 'C',
      id: 'clear'
      // handler() {
      //   setDisplayText('0');
      // }
    }
  ];

  const handleDigitClick = eventText => {
    /* grabs the innerText of the button component clicked,
    checks whether the current text is a single 0,
    if it is - sets the displayText directly to the event target value
    else if the string already includes a decimal point - retains the current displayText.
    else - concatenates the event target value to the current displayText */
    let newText;

    if (displayText === '0') {
      newText = eventText;
    } else if (displayText.includes('.') && eventText === '.') {
      newText = displayText;
    } else {
      newText = displayText + eventText;
    }

    setDisplayText(newText);
  };

  /*
  takes the name of the operator and stores in operator.
  takes the current displayText and stores in firstNum
  resets the displayText
  */
  const handleOperator = operator => {
    setFirstNum(parseFloat(displayText));
    setOperator(operator);
    console.log(displayText, operator);
    setDisplayText('0');
  };

  const handleEqualSign = () => {
    setSecondNum(displayText);
    let sum;
    console.log(firstNum, secondNum, displayText, 'equality yo');

    // switch (operator) {
    //   case '+':
    //     sum =
    // }
  };

  return (
    <div className='calculator'>
      <Display
        className='inputDisplay'
        displayText={displayText}
        id='display'
      />
      <Display className='outputDisplay' displayText={displayText} />

      <section className='buttonContainer'>
        {digits.map(button => (
          <Button
            onClick={e => {
              handleDigitClick(e.target.innerText);
            }}
            buttonText={button.text}
            id={button.id}
            key={button.id}
          />
        ))}

        {operators.map(button => {
          if (button.text === 'C') {
            return (
              <Button
                buttonText={button.text}
                id={button.id}
                key={button.id}
                onClick={() => setDisplayText('0')}
              />
            );
          } else if (button.text === '=') {
            return (
              <Button
                buttonText={button.text}
                id={button.id}
                key={button.id}
                onClick={e => {
                  handleEqualSign();
                }}
              />
            );
          } else {
            return (
              <Button
                buttonText={button.text}
                id={button.id}
                key={button.id}
                onClick={e => {
                  handleOperator(e.target.innerText);
                }}
              />
            );
          }
        })}
      </section>
    </div>
  );
};

export default Calculator;
