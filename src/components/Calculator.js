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
  const [didJustCalculate, setDidJustCalculate] = useState(false);
  const [prevSum, setPrevSum] = useState(0);

  // FUNCTIONS //

  /* handleReset()
    resets firstNum and operator
  */
  const handleReset = () => {
    setFirstNum(0);
    setOperator('');
  };

  /* handleDigitClick()
    adds the innerText of the button to the displays when clicked
  */
  const handleDigitClick = (eventText) => {
    let newText;
    let newTopDisp;

    if (displayText === '0' || didJustCalculate) {
      // check if new calculation (if true let the displayText be the digit clicked)
      newText = eventText;
      newTopDisp = eventText;
      setDidJustCalculate(false);
    } else if (String(displayText).includes('.') && eventText === '.') {
      // check to exclude double periods (if true - keep displayText and topDisplayText as is)
      newText = displayText;
      newTopDisp = topDisplayText;
    } else {
      // otherwise add the new digit to the displayText and to the topDisplayText
      newText = displayText + eventText;
      newTopDisp = topDisplayText + eventText;
    }

    setDisplayText(newText);
    setTopDisplayText(newTopDisp);
  };

  /* handleOperator()
  Takes the name of the operator and stores in operator.
  Takes the current displayText and stores in firstNum.
  Resets the displayText.
  */
  const handleOperator = (eventOperator) => {
    let newTopDisp;

    setFirstNum(parseFloat(displayText));
    setOperator(eventOperator);
    setDisplayText(eventOperator);
    setTopDisplayText(`${topDisplayText}${eventOperator}`);

    /* created addToDisplay() to avoid repeating myself in the if-statement below.
    It takes a boolean as an argument (resetDisplayText)
    If resetDisplayText is true we reset the displayText to '0'.
    Whether true or false we always set the operator to eventOperator and topDisplayText to newTopDisp
    */
    // const addToDisplay = (resetDisplayText) => {
    //   if (resetDisplayText) {
    //     setDisplayText('0');
    //   }

    //   setOperator(eventOperator);
    //   setTopDisplayText(newTopDisp);
    // };

    // need to figure out how to make the top and normal display show - if pressed right after a calculation
    // currently topDisplay shows - but display shows 0...
    // if (didJustCalculate) {
    //   console.log('operator pressed directly after calculation');
    //   setDidJustCalculate(false);
    //   if (eventOperator === '-') {
    //     newTopDisp = eventOperator;
    //   } else {
    //     newTopDisp = `${prevSum}${eventOperator}`;
    //   }
    // } else {
    //   newTopDisp = `${topDisplayText}${eventOperator}`;
    // }

    // if (displayText === '0' && eventOperator === '-') {
    //   setDisplayText(eventOperator);
    // } else if (displayText === '-') {
    //   addToDisplay(true);
    // } else if (displayText == 0) {
    //   addToDisplay(false);
    // } else {
    //   setFirstNum(parseFloat(displayText));
    //   addToDisplay(true);
    // }
  };

  /* handleEqualSign()
  Sets a variable sum.
  Checks the chosen operator (+,-,*,/) and performs the according calculation.
  */
  const handleEqualSign = () => {
    let sum;

    // testing eval...
    console.log(topDisplayText, eval(topDisplayText));

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
        sum = parseFloat(displayText);
        console.log(`Current sum: ${sum}`);
    }

    // sets the text to each display
    setDisplayText(sum);
    setTopDisplayText(`${topDisplayText}=${sum}`);

    // resets firstNum and operator
    handleReset();

    // sets didJustCalculate to true
    setDidJustCalculate(true);

    setPrevSum(sum);
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
