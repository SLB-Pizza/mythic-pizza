import React, { useRef } from 'react';
import {
  useSpring,
  /*useTransition,*/ animated,
  useChain,
  config,
} from 'react-spring';
import { Link } from 'react-router-dom';
import logo from '../imgs/project-mercury-logo.svg';
import bgIMG from '../imgs/bg1.jpg';
import * as easings from 'd3-ease';

// import "../App.css";

function LandingPage() {
  //Left text spring
  const leftText = useSpring({
    config: { duration: 1500, easing: easings.easeCubicOut },
    from: { opacity: 1, transform: 'translate(0, -400%)' },
    to: { opacity: 1, transform: 'translate(0, 0)' },
    delay: 200,
  });
  //Left text spring mobile
  const leftTextMobile = useSpring({
    config: { duration: 1500, easing: easings.easeCubicOut },
    from: { opacity: 1, transform: 'translate(0, 400%)' },
    to: { opacity: 1, transform: 'translate(0, 0)' },
    delay: 200,
  });
  //inquire button move spring
  const inquireMoveRef = useRef();
  const inquireMove = useSpring({
    config: { duration: 1500, easing: easings.easeCubicOut },
    from: { transform: 'translate(200%, 0)' },
    to: { transform: 'translate(0, 0)' },
    ref: inquireMoveRef,
  });
  //contact info srping
  const contactInfo = useSpring({
    config: config.molasses,
    from: { opacity: 0, transform: 'translate(200%, 0)' },
    to: { opacity: 1, transform: 'translate(0, 0)' },
    delay: 200,
  });
  //inquire button fade spring
  const inquireFadeRef = useRef();
  const inquireFade = useSpring({
    config: {
      duration: 800,
    },
    from: { opacity: 0 },
    to: { opacity: 1 },
    // delay: 300,
    ref: inquireFadeRef,
  });

  useChain([inquireMoveRef, inquireFadeRef]);

  return (
    <div
      className="hero is-fullheight"
      style={{
        backgroundImage: 'url(' + bgIMG + ')',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        overflowY: 'hidden',
      }}>
      <div className="hero-body">
        <div className="container">
          {/*
              ____            __   __
             / __ \___  _____/ /__/ /_____  ____
            / / / / _ \/ ___/ //_/ __/ __ \/ __ \
           / /_/ /  __(__  ) ,< / /_/ /_/ / /_/ /
          /_____/\___/____/_/|_|\__/\____/ .___/
                                        /_/
          */}
          <div className="columns is-hidden-touch">
            <div className="column">
              <animated.div style={leftText} id="desktop-blurb">
                <p>
                  Derris and Mythology (formerly Partners & Spade) have worked
                  together before, bringing to life some of the most known and
                  loved brands of the past decade, and rethinking the businesses
                  of big, iconic companies.
                </p>
                <p>
                  Today, as we continue our work with our respective agencies,
                  we're officially joining forces on Project Mercury - a project
                  to find the founders and ideas that will change their
                  industries and help build the next great brands.
                </p>
              </animated.div>
            </div>
            <div className="column">
              <div className="vertical-logo is-flex-desktop">
                <img
                  src={logo}
                  alt="projectMERCURY"
                  // style={{ width: "49px", height: "auto" }}
                />
              </div>
            </div>
            <div className="column">
              <animated.div
                style={inquireMove}
                className="is-flex-desktop"
                id="desktop-landing-right">
                <animated.div style={inquireFade} id="main-button">
                  <Link to="/form">
                    <button className="inquire-btn">INQUIRE ⟶</button>
                  </Link>
                </animated.div>

                <div style={contactInfo} id="desktop-landing-address">
                  <p>office@projectmercury.com</p>
                  <p>T 646 861 2827</p>
                  <p>324 Lafayette Street</p>
                  <p>NY, New York 11201</p>
                </div>
              </animated.div>
            </div>
          </div>
          {/*
            ______                 __
           /_  __/___  __  _______/ /_
            / / / __ \/ / / / ___/ __ \
           / / / /_/ / /_/ / /__/ / / /
          /_/  \____/\__,_/\___/_/ /_/
          */}
          <div className="columns is-mobile is-hidden-desktop">
            <div className="column is-one-fifth">
              <div className="vertical-logo">
                <img
                  src={logo}
                  alt="projectMERCURY"
                  // style={{ width: "49px", height: "auto" }}
                />
              </div>
            </div>
            <div className="column">
              <animated.div
                style={inquireMove}
                className="is-flex-touch"
                id="mobile-landing">
                <div style={contactInfo} id="mobile-address">
                  <p>office@projectmercury.com</p>
                  <p>T 646 861 2827</p>
                  <p>324 Lafayette Street</p>
                  <p>NY, New York 11201</p>
                </div>
                <animated.div style={inquireFade} id="mobile-inquire">
                  <Link to="/form">
                    <button className="inquire-btn">INQUIRE ⟶</button>
                  </Link>
                </animated.div>

                <animated.div style={leftTextMobile} id="mobile-blurb">
                  <p>
                    Derris and Mythology (formerly Partners & Spade) have worked
                    together before, bringing to life some of the most known and
                    loved brands of the past decade, and rethinking the
                    businesses of big, iconic companies.
                  </p>
                  <p>
                    Today, as we continue our work with our respective agencies,
                    we're officially joining forces on Project Mercury - a
                    project to find the founders and ideas that will change
                    their industries and help build the next great brands.
                  </p>
                </animated.div>
              </animated.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
