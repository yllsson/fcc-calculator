"use strict";

var App = function App() {
  return /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, /*#__PURE__*/React.createElement("h1", null, "hello world"));
};

var appRoot = document.getElementById('root');
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), appRoot);
