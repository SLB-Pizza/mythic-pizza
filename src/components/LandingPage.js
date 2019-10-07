import React, { useRef } from 'react';
import { useSpring, animated, useChain } from 'react-spring';
import { Link } from 'react-router-dom';
import logo from '../imgs/project-mercury-logo.svg';
import inquireArrow from '../imgs/inquire-arrow.svg';
import * as easings from 'd3-ease';
import ReactGA from 'react-ga';

function initializeAnalytics() {
  ReactGA.initialize('UA-143359903-3', {
    name: 'Landing Page',
    siteSpeedSampleRate: 100,
  });
  ReactGA.pageview('Intro Page');
}

function LandingPage() {
  initializeAnalytics();

  const leftText = useSpring({
    config: { duration: 1500, easing: easings.easeCubicOut },
    from: { opacity: 1, transform: 'translate(0, -400%)' },
    to: { opacity: 1, transform: 'translate(0, 0)' },
    delay: 200,
  });

  const leftTextMobile = useSpring({
    config: { duration: 1500, easing: easings.easeCubicOut },
    from: { opacity: 1, transform: 'translate(0, 400%)' },
    to: { opacity: 1, transform: 'translate(0, 0)' },
    delay: 200,
  });

  const inquireMoveRef = useRef();
  const inquireMove = useSpring({
    config: { duration: 1500, easing: easings.easeCubicOut },
    from: { transform: 'translate(200%, 0)' },
    to: { transform: 'translate(0, 0)' },
    ref: inquireMoveRef,
  });

  const inquireFadeRef = useRef();
  const inquireFade = useSpring({
    config: {
      duration: 800,
    },
    from: { opacity: 0 },
    to: { opacity: 1 },
    ref: inquireFadeRef,
  });

  useChain([inquireMoveRef, inquireFadeRef]);

  return (
    <div className="hero is-fullheight" id="landing-bg">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-hidden-touch is-hidden-lowres-desktop">
            <div className="column">
              <animated.div style={leftText} id="four-k-blurb">
                <p>
                  Attention new thinkers, subversive talents and iconoclasts.
                </p>
                <p>
                  Announcing Project Mercury, a joint initiative from
                  <a
                    href="https://www.derris.com/"
                    target="_blank"
                    rel="noopener noreferrer">
                    Derris
                  </a>
                  and
                  <a
                    href="https://www.mythology.com"
                    target="_blank"
                    rel="noopener">
                    Mythology
                  </a>
                  (formerly Partners & Spade) to find the undiscovered founders
                  and radical ideas that will change industries, and help them
                  build the next great brands.
                </p>
              </animated.div>
            </div>

            <div className="column">
              <div className="vertical-logo is-flex-desktop">
                <img
                  className="vertical-logo-img"
                  src={logo}
                  height="65vh"
                  width="auto"
                  alt="projectMERCURY"
                />
              </div>
            </div>

            <div className="column">
              <animated.div style={inquireMove} className="landing-right">
                <animated.div style={inquireFade} className="btn-animation">
                  <Link to="/form">
                    <button id="four-k-btn">
                      <p>INQUIRE</p>
                      <img src={inquireArrow} alt="inquire arrow" />
                    </button>
                  </Link>
                </animated.div>
              </animated.div>
            </div>
          </div>

          <div className="columns is-hidden-touch is-hidden-four-k">
            <div className="column">
              <animated.div style={leftText} id="desktop-blurb">
                <p>
                  Attention new thinkers, subversive talents and iconoclasts.
                </p>
                <p>
                  Announcing Project Mercury, a joint initiative from{' '}
                  <a
                    href="https://www.derris.com/"
                    target="_blank"
                    rel="noopener">
                    Derris
                  </a>{' '}
                  and{' '}
                  <a
                    href="https://www.mythology.com"
                    target="_blank"
                    rel="noopener noreferrer">
                    Mythology
                  </a>{' '}
                  (formerly Partners & Spade) to find the undiscovered founders
                  and radical ideas that will change industries, and help them
                  build the next great brands.
                </p>
              </animated.div>
            </div>

            <div className="column">
              <div className="vertical-logo is-flex-desktop">
                <img
                  className="vertical-logo-img"
                  src={logo}
                  height="65vh"
                  width="auto"
                  alt="projectMERCURY"
                />
              </div>
            </div>

            <div className="column">
              <animated.div style={inquireMove} className="landing-right">
                <animated.div style={inquireFade} className="btn-animation">
                  <Link to="/form">
                    <button className="inquire-btn">
                      <p>INQUIRE</p>
                      <img src={inquireArrow} alt="inquire arrow" />
                    </button>
                  </Link>
                </animated.div>
              </animated.div>
            </div>
          </div>

          <div className="columns is-mobile is-hidden-desktop">
            <div className="column is-one-quarter">
              <div className="vertical-logo">
                <img
                  src={logo}
                  height="65vh"
                  width="auto"
                  alt="projectMERCURY"
                />
              </div>
            </div>

            <div className="column">
              <animated.div
                style={inquireMove}
                className="landing-right"
                id="mobile-landing">
                <animated.div style={inquireFade} className="btn-animation">
                  <Link to="/form">
                    <button className="inquire-mobile">
                      <p>INQUIRE</p>
                      <img src={inquireArrow} alt="learn more" />
                    </button>
                  </Link>
                </animated.div>

                <animated.div style={leftTextMobile} id="mobile-blurb">
                  <p>
                    Attention new thinkers, subversive talents and iconoclasts.
                  </p>
                  <p>
                    Announcing Project Mercury, a joint initiative from
                    <a
                      href="https://www.derris.com/"
                      target="_blank"
                      rel="noopener">
                      Derris
                    </a>
                    and
                    <a
                      href="https://www.mythology.com"
                      target="_blank"
                      rel="noopener noreferrer">
                      Mythology
                    </a>
                    (formerly Partners & Spade) to find the undiscovered
                    founders and radical ideas that will change industries, and
                    help them build the next great brands.
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
