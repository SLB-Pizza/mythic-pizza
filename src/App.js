import React, { useContext } from "react";
import { Switch, Route, __RouterContext } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import LandingPage from "./components/LandingPage";
import InputPage from "./components/InputPage";
import SuccessPage from "./components/SuccessPage";

function App() {
  const { location } = useContext(__RouterContext);
  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 1, transform: "translate(20%, 0)" },
    enter: { opacity: 1, transform: "translate(0%, 0)" },
    leave: { opacity: 0, transform: "translate(-50%, 0)" }
  });

  return (
    <>
      <div className="App">
        {transitions.map(({ item, props, key }) => (
          <animated.div key={key} style={props}>
            {console.log("page route animation props \n", props)}
            {console.log("page route animation item \n", item)}

            <Switch location={item}>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/form" component={InputPage} />
              <Route exact path="/success" component={SuccessPage} />
            </Switch>
          </animated.div>
        ))}
      </div>
    </>
  );
}

export default App;
