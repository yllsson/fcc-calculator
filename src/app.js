import './css/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './components/Calculator';

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <Calculator />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
