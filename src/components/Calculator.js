import React, { useState } from 'react';
import Button from './Button';
import Display from './Display';
import digits from '../data/digits';
import operators from '../data/operators';

const Calculator = () => {
  // STATE //
  const [displayText, setDisplayText] = useState('0');
  const [firstNum, setFirstNum] = useState(0);
  const [operator, setOperator] = useState('');
  const [lastSum, setLastSum] = useState(0);

  // FUNCTIONS //

  /* handleDigitClick()
    Grabs the innerText of the button component clicked,
    checks whether the current text is a single 0,
    if it is - sets the displayText directly to the event target value
    else if the string already includes a decimal point - retains the current displayText.
    else - concatenates the event target value to the current displayText */
  const handleDigitClick = (eventText) => {
    let newText;

    if (displayText === '0') {
      newText = eventText;
    } else if (String(displayText).includes('.') && eventText === '.') {
      newText = displayText;
    } else {
      newText = displayText + eventText;
    }

    setDisplayText(newText);
  };

  /* handleOperator()
  Takes the name of the operator and stores in operator.
  Takes the current displayText and stores in firstNum.
  Resets the displayText.
  */
  const handleOperator = (eventOperator) => {
    // to be fixed!! currently you cannot press more than one operator in a row as the firstNum will reset to 0
    // also want to fix it so you can press digit * - + and have it use the + without the displayText getting locked in as the '-' sign.
    if (displayText === '0' && eventOperator === '-') {
      setDisplayText(eventOperator);
      console.log('minus', displayText, operator, eventOperator);
    } else {
      setFirstNum(parseFloat(displayText));
      setOperator(eventOperator);
      setDisplayText('0');
      console.log('operator', firstNum, displayText, operator, eventOperator);
    }
  };

  /* handleEqualSign()
  Sets a variable sum.
  Checks the chosen operator (+,-,*,/) and performs the according calculation.
  */
  const handleEqualSign = () => {
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
    setLastSum(sum);
    setFirstNum(0);
    setOperator('');
    console.log(lastSum, firstNum, operator, displayText, sum);
  };

  // RETURN/RENDER //
  return (
    <div className='calculator'>
      <Display className='inputDisplay' displayText={lastSum} />
      <Display
        className='outputDisplay'
        displayText={displayText}
        id='display'
      />

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
