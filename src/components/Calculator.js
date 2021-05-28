import React, { useState } from 'react';
import Button from './Button';
import Display from './Display';
import digits from '../data/digits';
import operators from '../data/operators';

const Calculator = () => {
  // STATE //
  const [displayText, setDisplayText] = useState('0');
  const [topDisplayText, setTopDisplayText] = useState('');
  const [firstNum, setFirstNum] = useState(0);
  const [operator, setOperator] = useState('');

  // FUNCTIONS //

  /* handleReset()
    resets firstNum and operator
  */
  const handleReset = () => {
    setFirstNum(0);
    setOperator('');
  };

  /* handleDigitClick()
    Grabs the innerText of the button component clicked,
    checks whether the current text is a single 0,
    if it is - sets the displayText directly to the event target value
    else if the string already includes a decimal point - retains the current displayText.
    else - concatenates the event target value to the current displayText */
  const handleDigitClick = eventText => {
    let newText;

    if (displayText === '0') {
      newText = eventText;
    } else if (String(displayText).includes('.') && eventText === '.') {
      newText = displayText;
    } else {
      newText = displayText + eventText;
    }

    setDisplayText(newText);
    setTopDisplayText(`${topDisplayText} ${newText}`);
  };

  /* handleOperator()
  Takes the name of the operator and stores in operator.
  Takes the current displayText and stores in firstNum.
  Resets the displayText.
  */
  const handleOperator = eventOperator => {
    // to be fixed!! currently you cannot press more than one operator in a row as the firstNum will reset to 0
    let newTopDisp = `${topDisplayText} ${eventOperator}`;

    if (displayText === '0' && eventOperator === '-') {
      setDisplayText(eventOperator);
    } else if (displayText === '-') {
      setOperator(eventOperator);
      setDisplayText('0');
    } else if (displayText == 0) {
      setOperator(eventOperator);
    } else {
      setFirstNum(parseFloat(displayText));
      setOperator(eventOperator);
      setDisplayText('0');
    }

    setTopDisplayText(newTopDisp);
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
        sum = 'no operator';
        console.log(`Current sum: ${sum}`);
    }

    // sets the text to each display
    setDisplayText(sum);
    setTopDisplayText(`${topDisplayText} = ${sum}`);

    // resets firstNum and operator
    handleReset();

    console.log(
      `Equal was pressed.
      topDisplayText: ${topDisplayText}
      firstNum: ${firstNum}, 
      operator: ${operator}, 
      displayText: ${displayText}, 
      sum: ${sum}`
    );
  };

  // RETURN/RENDER //
  return (
    <div className='calculator'>
      <h1>topDisplayText</h1>
      <Display className='inputDisplay' displayText={topDisplayText} />
      <h1>displayText</h1>
      <Display
        className='outputDisplay'
        displayText={displayText}
        id='display'
      />
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
                onClick={() => {
                  handleReset();
                  setDisplayText('0');
                  setTopDisplayText('');
                }}
              />
            );
          } else if (button.text === '=') {
            return (
              <Button
                buttonText={button.text}
                id={button.id}
                key={button.id}
                onClick={e => {
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
                onClick={e => {
                  handleOperator(e.target.innerText);
                }}
              />
            );
          }
        })}

        <div className='debug-console'>
          <div>
            <h1>FirstNum: {firstNum}</h1>
          </div>
          <div>
            <h1>operator: {operator}</h1>
          </div>
          <div>
            <h1>displayText: {displayText}</h1>
          </div>
          <div>
            <h1>topDisplayText: {topDisplayText}</h1>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calculator;
