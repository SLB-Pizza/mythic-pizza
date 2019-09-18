import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import InputPage from './components/InputPage';
function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route path="/form" component={InputPage} />
      </div>
    </Router>
  );
}

export default App;
