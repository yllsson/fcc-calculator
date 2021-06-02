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
    let newDisp;
    let newTopDisp;

    if (didJustCalculate) {
      // check if new calculation after calculation just been done (if true let the displayText be the digit clicked)
      newDisp = eventText;
      newTopDisp = eventText;
      setDidJustCalculate(false);
    } else if (displayText === '0') {
      // check if new calculation (if true let the displayText be the digit clicked)
      newDisp = eventText;
      newTopDisp = eventText;
      setDidJustCalculate(false);
    } else if (displayText === operator) {
      // check if operator has just been pressed and is currently showing in the display
      newDisp = eventText;
      newTopDisp = topDisplayText + eventText;
    } else if (String(displayText).includes('.') && eventText === '.') {
      // check to exclude double periods (if true - keep displayText and topDisplayText as is)
      newDisp = displayText;
      newTopDisp = topDisplayText;
    } else {
      // otherwise add the new digit to the displayText and to the topDisplayText
      newDisp = displayText + eventText;
      newTopDisp = topDisplayText + eventText;
    }

    setDisplayText(newDisp);
    setTopDisplayText(newTopDisp);
  };

  /* handleOperator()
  Takes the name of the operator and stores in operator.
  Takes the current displayText and stores in firstNum.
  Resets the displayText.
  */
  const handleOperator = (eventOperator) => {
    let newDisp;
    let newTopDisp;

    let topDispEndsWithOperator =
      topDisplayText.endsWith('+') ||
      topDisplayText.endsWith('-') ||
      topDisplayText.endsWith('*') ||
      topDisplayText.endsWith('/');
    let topDispEndsWithTwoOps =
      topDisplayText.endsWith('+-') ||
      topDisplayText.endsWith('--') ||
      topDisplayText.endsWith('*-') ||
      topDisplayText.endsWith('/-');

    if (didJustCalculate) {
      newTopDisp = prevSum + eventOperator;
      newDisp = eventOperator;
      setDidJustCalculate(false);
    } else if (topDispEndsWithOperator && eventOperator === '-') {
      // check if we just clicked an operator and now clicked minus (so as to write 5 + -3 for example)
      // set the display to be the new operator
      newDisp = eventOperator;

      // add the minus to the topDisp
      newTopDisp = topDisplayText + eventOperator;

      // don't do anything with the operator
    } else if (topDispEndsWithTwoOps) {
      // check if the topDisp ends in two operators (+-, --, *-, /-)
      // set the display to be the new operator
      newDisp = eventOperator;

      // cut off both the last two characters of the topDisplayText and replace with the clicked operator
      newTopDisp =
        topDisplayText.slice(0, topDisplayText.length - 2) + eventOperator;

      // store the clicked operator in the operator state
      setOperator(eventOperator);
    } else if (topDispEndsWithOperator) {
      // set the display to be the new operator
      newDisp = eventOperator;

      // add the operator
      newTopDisp = topDisplayText.replace(operator, eventOperator);

      // store the clicked operator in the operator state
      setOperator(eventOperator);
    } else {
      // any other case when operator is pressed

      // reset the displayText (ready for the next number)
      newDisp = eventOperator;

      // add the clicked operator to the end of the current topDisplay
      newTopDisp = topDisplayText + eventOperator;

      // store the clicked operator in the operator state
      setOperator(eventOperator);
    }

    setDisplayText(newDisp);
    setTopDisplayText(newTopDisp);
  };

  /* handleEqualSign()
  Sets a variable sum and runs the topDisplayText through the eval function
  */
  const handleEqualSign = () => {
    let sum = eval(topDisplayText);

    sum = parseFloat(sum.toFixed(11));
    console.log(sum);

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
      <div className='displays'>
        <Display className='topDisplay' displayText={topDisplayText} />
        <Display
          className='mainDisplay'
          displayText={displayText}
          id='display'
        />
      </div>

      <section className='buttonContainer'>
        <section className='clearAndDigits'>
          <Button
            buttonText={'C'}
            id={'clear'}
            key={'clear'}
            onClick={() => {
              handleReset();
              setDisplayText('0');
              setTopDisplayText('');
            }}
          />
          <div className='digits'>
            {digits.map((button) => (
              <Button
                onClick={(e) => {
                  handleDigitClick(e.target.innerText);
                }}
                buttonText={button.text}
                id={button.id}
                key={button.id}
                className={'digit'}
              />
            ))}
          </div>
        </section>

        <div className='operators'>
          {operators.map((button) => {
            if (button.text === 'C') {
              // do nothing
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
        </div>
      </section>
    </div>
  );
};

export default Calculator;
