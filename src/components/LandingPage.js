import React from 'react';
import { useTransition, useSpring, animated } from 'react-spring';
import { Link, __RouterContext } from 'react-router-dom';

import '../App.css';

function LandingPage() {
  const textfadeIn = useSpring({ opacity: 1, from: { opacity: 0 } });
  return (
    <div className="landing">
      <animated.div className="left-text" style={textfadeIn}>
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
        <p>
          PROJECT <span id="mercury-text">MERCURY</span>
        </p>
      </div>

      <div className="right-third">
        <div className="main-button">
          <Link to="/form">
            <button className="inquire">INQUIRE</button>
          </Link>
        </div>

        <div className="contact-text">
          <p>office@projectmercury.com</p>
          <p>T 646 861 2827</p>
          <p>324 Lafayette Street</p>
          <p>NY, New York 11201</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
