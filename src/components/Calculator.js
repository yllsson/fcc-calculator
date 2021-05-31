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

    // if (displayText === '0' && eventOperator === '-') {
    //   newDisp = eventOperator;
    // } else if (displayText === '-') {
    //   setOperator(eventOperator);
    //   newDisp = '0';
    //   newTopDisp = topDisplayText + eventOperator;
    // } else if (displayText == 0) {
    //   setOperator(eventOperator);
    //   newTopDisp = topDisplayText + eventOperator;
    // } else {
    //   setOperator(eventOperator);
    //   newDisp = eventOperator;
    //   newTopDisp = topDisplayText + eventOperator;
    // }

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
    console.log(topDispEndsWithTwoOps);

    if (topDispEndsWithOperator && eventOperator === '-') {
      // check if we just clicked an operator and now clicked minus (so as to write 5 + -3 for example)
      // set the display to be the new operator
      newDisp = eventOperator;

      // add the minus to the topDisp
      newTopDisp = topDisplayText + eventOperator;
      // don't do anything with the operator

      console.log(
        'operator in top text and we clicked minus',
        topDispEndsWithOperator
      );
    } else if (topDispEndsWithTwoOps) {
      // set the display to be the new operator
      newDisp = eventOperator;

      newTopDisp =
        topDisplayText.slice(0, topDisplayText.length - 2) + eventOperator;

      console.log(newTopDisp);
      setOperator(eventOperator);
    } else if (topDispEndsWithOperator) {
      // set the display to be the new operator
      newDisp = eventOperator;

      // add the operator
      newTopDisp = topDisplayText.replace(operator, eventOperator);

      setOperator(eventOperator);

      console.log(
        'operator in top text and we clicked +,*,/',
        topDispEndsWithOperator
      );
      //
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
    const sum = eval(topDisplayText);

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
          <div>
            <h1>didJustCalculate: {`${didJustCalculate}`}</h1>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calculator;
