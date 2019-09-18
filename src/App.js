import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import LandingPage from './components/LandingPage';
import InputPage from './components/InputPage';
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/form" component={InputPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
