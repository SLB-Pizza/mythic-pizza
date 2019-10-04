import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './sass/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
//GOOGLE analytics
// import ReactGA from 'react-ga';
// FONTS
import './fonts/Graphik-Regular.otf';

// ReactGA.initialize('UA-143359903-3');

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
