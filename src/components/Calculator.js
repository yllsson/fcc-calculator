import React, { useState } from 'react';
import Button from './Button';
import Display from './Display';
import digits from '../data/digits';
import operators from '../data/operators';

const Calculator = () => {
  // state
  const [displayText, setDisplayText] = useState('0');
  const [firstNum, setFirstNum] = useState(0);
  // const [secondNum, setSecondNum] = useState(0);
  const [operator, setOperator] = useState('');

  const handleDigitClick = (eventText) => {
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
  const handleOperator = (operator) => {
    setFirstNum(parseFloat(displayText));
    setOperator(operator);
    // console.log(displayText, operator);
    setDisplayText('0');
  };

  const handleEqualSign = () => {
    // setSecondNum(displayText);
    let sum;

    switch (operator) {
      case '+':
        sum = firstNum + parseFloat(displayText);
        break;
      case '-':
        sum = firstNum - parseFloat(displayText);
        break;
      case '*':
        sum = firstNum * parseFloat(displayText);
        break;
      case '/':
        sum = firstNum / parseFloat(displayText);
        break;
      default:
        sum = 'I am a papaya';
        console.log(sum);
    }

    setDisplayText(sum);
    // console.log(firstNum, displayText, 'equality yo', operator, sum);
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
        {digits.map((button) => (
          <Button
            onClick={(e) => {
              handleDigitClick(e.target.innerText);
            }}
            buttonText={button.text}
            id={button.id}
            key={button.id}
          />
        ))}

        {operators.map((button) => {
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
                onClick={(e) => {
                  handleEqualSign(e.target.innerText);
                }}
              />
            );
          } else {
            return (
              <Button
                buttonText={button.text}
                id={button.id}
                key={button.id}
                onClick={(e) => {
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
