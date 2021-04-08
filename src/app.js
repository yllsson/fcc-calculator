// import './css/style.css';
// import Calculator from './components/Calculator';

// need to fix my imports somehow

/*
All the components I need:

container/Calculator
  Display
  buttonsContainer/Buttons
    Button * however many I need
  
*/

const App = () => {
  return (
    <div className='app'>
      <h1>hello world</h1>
      {/* <Calculator /> */}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
