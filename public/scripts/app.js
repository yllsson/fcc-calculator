"use strict";

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
var App = function App() {
  return /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, /*#__PURE__*/React.createElement("h1", null, "hello world"));
};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));
