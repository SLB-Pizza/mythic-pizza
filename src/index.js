import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './sass/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

// FONTS
// import "./fonts/David_temporary_03_Regular.otf";
import './fonts/Graphik-Regular.otf';

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
