import React from 'react';
import introText from './introText.json';
import '../App.css';

function LandingPage() {
  return (
    <div className="landing">
      <div className="intro-text" style={{ whiteSpace: 'pre-line' }}>
        {introText.blurbText.split('\n').map((line, idx) => {
          return (
            <div className="intro-text" key={idx}>
              {line}
            </div>
          );
        })}
        >
      </div>
      {/* <div> */}
      <div classname="vertical-text">{introText.verticalText}</div>
      {/* </div> */}
      {/* <div> */}
      <div className="contact-text">
        {introText.contactText.map((line, idx) => {
          return <div key={idx}>{line}</div>;
        })}
      </div>
      {/* </div> */}
    </div>
  );
}

export default LandingPage;
