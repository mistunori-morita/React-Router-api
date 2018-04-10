import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const getDate = () => {
  const date = new Date();
  return date.toDateString();
}

const greeeting = <h1>Hello World date: {getDate()}</h1>
ReactDOM.render(greeeting, document.getElementById('root'));
registerServiceWorker();
