import React, { useContext } from 'react';
import { Switch, Route, __RouterContext } from 'react-router-dom';

import { useTransition, animated } from 'react-spring';
import * as easings from 'd3-ease';

import LandingPage from './components/LandingPage';
import InputPage from './components/InputPage';

import ReactGA from 'react-ga';
import history from './components/utils/History.js';

ReactGA.initialize('UA-143359903-3');

// history.listen(location => {
//   ReactGA.set({ page: location.pathname });
//   ReactGA.pageview(location.pathname);
// });

function App() {
  const { location } = useContext(__RouterContext);
  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 0, transform: 'translate(50%, 0)' },
    enter: { opacity: 1, transform: 'translate(0%, 0)' },
    leave: { opacity: 0, transform: 'translate(-20%, 0)' },
    config: { duration: 1500, easing: easings.easeQuadInOut },
  });

  return (
    <div className="App">
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <Switch location={item}>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/form" component={InputPage} />
          </Switch>
        </animated.div>
      ))}
    </div>
  );
}

export default App;
