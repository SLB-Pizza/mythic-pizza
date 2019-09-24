import React, { useRef } from "react";
import { useSpring, useTransition, animated, useChain } from "react-spring";
import { Link } from "react-router-dom";
import logo from "../imgs/project-mercury-logo.svg";

import "../App.css";

function LandingPage() {
  //Left text spring
  const leftText = useSpring({
    config: {
      duration: 1500
    },
    from: { opacity: 1, transform: "translate(0, -400%)" },
    to: { opacity: 1, transform: "translate(0, 0)" },
    delay: 200
  });
  //contact info srping
  const contactInfo = useSpring({
    config: {
      duration: 1500
    },
    from: { opacity: 0, transform: "translate(200%, 0)" },
    to: { opacity: 1, transform: "translate(0, 0)" },
    delay: 200
  });
  //inquire button move spring
  const inquireMoveRef = useRef();
  const inquireMove = useSpring({
    config: {
      duration: 1000
    },
    from: { transform: "translate(200%, 0)" },
    to: { transform: "translate(0, 0)" },
    ref: inquireMoveRef
  });
  //inquire button fade spring
  const inquireFadeRef = useRef();
  const inquireFade = useSpring({
    config: {
      duration: 500
    },
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 500,
    ref: inquireFadeRef
  });

  useChain([inquireMoveRef, inquireFadeRef]);

  return (
    <div className="landing">
      <animated.div style={leftText} className="left-text">
        <p>
          Derris and Mythology (formerly Partners & Spade) have worked together
          before, bringing to life some of the most known and loved brands of
          the past decade, and rethinking the businesses of big, iconic
          companies.
        </p>
        <p>
          Today, as we continue our work with our respective agencies, we're
          officially joining forces on Project Mercury - a project to find the
          founders and ideas that will change their industries and help build
          the next great brands.
        </p>
      </animated.div>

      <div className="vertical-logo">
        <img src={logo} alt="LOGO" id="mercury-logo" />
      </div>

      <animated.div style={inquireMove} className="right-third">
        <animated.div style={inquireFade} className="main-button">
          <Link to="/form">
            <button className="inquire">INQUIRE</button>
          </Link>
        </animated.div>

        <div style={contactInfo} className="contact-text">
          <p>office@projectmercury.com</p>
          <p>T 646 861 2827</p>
          <p>324 Lafayette Street</p>
          <p>NY, New York 11201</p>
        </div>
      </animated.div>
    </div>
  );
}

export default LandingPage;
