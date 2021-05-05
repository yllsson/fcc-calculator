// import './css/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './components/Calculator';

/*
All the components I need:

container/Calculator
  Display
  buttonsContainer/Buttons
    Button * however many I need
  
*/

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <h1>hello world</h1>
        <Calculator />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
