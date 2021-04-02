import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App.jsx'

const debug = true;
const log = (...args) => {if(debug) console.log(...args)}

function pageStart(){
  log('started');

  const reactRoot = document.createElement('div');
  ReactDOM.render(
    <App />,
    reactRoot
  );
  document.body.appendChild(reactRoot);
}

window.addEventListener('load', pageStart);
