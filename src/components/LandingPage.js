import React, { useRef } from "react";
import {
  useSpring,
  /*useTransition,*/ animated,
  useChain
  // config,
} from "react-spring";
import { Link } from "react-router-dom";
import logo from "../imgs/project-mercury-logo.svg";
import inquireArrow from "../imgs/inquire-arrow.svg";
import * as easings from "d3-ease";

function LandingPage() {
  //Left text spring
  const leftText = useSpring({
    config: { duration: 1500, easing: easings.easeCubicOut },
    from: { opacity: 1, transform: "translate(0, -400%)" },
    to: { opacity: 1, transform: "translate(0, 0)" },
    delay: 200
  });
  //Left text spring mobile
  const leftTextMobile = useSpring({
    config: { duration: 1500, easing: easings.easeCubicOut },
    from: { opacity: 1, transform: "translate(0, 400%)" },
    to: { opacity: 1, transform: "translate(0, 0)" },
    delay: 200
  });
  //inquire button move spring
  const inquireMoveRef = useRef();
  const inquireMove = useSpring({
    config: { duration: 1500, easing: easings.easeCubicOut },
    from: { transform: "translate(200%, 0)" },
    to: { transform: "translate(0, 0)" },
    ref: inquireMoveRef
  });
  //contact info srping
  // const contactInfo = useSpring({
  //   config: config.molasses,
  //   from: { opacity: 0, transform: 'translate(200%, 0)' },
  //   to: { opacity: 1, transform: 'translate(0, 0)' },
  //   delay: 200,
  // });
  //inquire button fade spring
  const inquireFadeRef = useRef();
  const inquireFade = useSpring({
    config: {
      duration: 800
    },
    from: { opacity: 0 },
    to: { opacity: 1 },
    // delay: 300,
    ref: inquireFadeRef
  });

  useChain([inquireMoveRef, inquireFadeRef]);

  return (
    <div className="hero is-fullheight" id="landing-bg">
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
              {/*
            // =============================
            // 1st Column
            // =============================
            */}
              <animated.div style={leftText} id="desktop-blurb">
                <p>
                  Attention new thinkers, subversive talents and iconoclasts,
                </p>
                <p>
                  Announcing Project Mercury, a joint initiative from Derris and
                  Mythology (formerly Partners & Spade) to find the undiscovered
                  founders and radical ideas that will change industries, and
                  help them build the next great brands.
                </p>
              </animated.div>
            </div>
            {/*
            // =============================
            // 2nd Column
            // =============================
            */}
            <div className="column">
              <div className="vertical-logo is-flex-desktop">
                <img
                  src={logo}
                  height="65vh"
                  width="auto"
                  alt="projectMERCURY"
                />
              </div>
            </div>
            {/*
            // =============================
            // 3rd Column
            // =============================
            */}
            <div className="column">
              <animated.div style={inquireMove} className="landing-right">
                <animated.div style={inquireFade} className="btn-animation">
                  <Link to="/form">
                    <button className="inquire-style">
                      <p>INQUIRE</p>
                      <img src={inquireArrow} alt="inquire arrow" />
                    </button>
                  </Link>
                </animated.div>
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
            {/*
            // =============================
            // 1st Column
            // =============================
            */}
            <div className="column is-one-quarter">
              <div className="vertical-logo">
                <img
                  src={logo}
                  height="65vh"
                  width="auto"
                  alt="projectMERCURY"
                  // style={{ width: "49px", height: "auto" }}
                />
              </div>
            </div>
            {/*
            // =============================
            // 2nd Column
            // =============================
            */}
            <div className="column">
              <animated.div
                style={inquireMove}
                className="landing-right"
                id="mobile-landing"
              >
                <animated.div style={inquireFade} className="btn-animation">
                  <Link to="/form">
                    <button className="inquire-style">
                      <p>INQUIRE</p>
                      <img src={inquireArrow} alt="learn more" />
                    </button>
                  </Link>
                </animated.div>

                <animated.div style={leftTextMobile} id="mobile-blurb">
                  <p>
                    Attention new thinkers, subversive talents and iconoclasts,
                  </p>
                  <p>
                    Announcing Project Mercury, a joint initiative from Derris
                    and Mythology (formerly Partners & Spade) to find the
                    undiscovered founders and radical ideas that will change
                    industries, and help them build the next great brands.
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
