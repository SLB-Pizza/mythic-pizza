import React from "react";
import "../App.css";

function LandingPage() {
  return (
    <div className="landing">
      <div className="left-text">
        <p>OVER THE PAST DECADE, DERRIS AND</p>
        <p>MYTHOLOGY (PREVIOUSLY PARTNERS &</p>
        <p>SPADE) HAVE HELPED BUILD SOME OF</p>
        <p>TODAY'S MOST RECOGNIZABLE</p>
        <p>CONSUMER BRANDS. IN TANDEM, WE'VE</p>
        <p>REORIENTED ICONIC, LARGE COMPANIES</p>
        <p>TO REIMAGINE THEIR BUSINESSES, AND</p>
        <p>EVOLVE WITH CONSUMERS' CHANGING</p>
        <p>EXPECTATIONS. NOW, WE'RE EMBARKING</p>
        <p>WITH OUR AGENCIES' CURRENT WORK: A</p>
        <p>JOINT VENTURE, PROJECT MERCURY,</p>
        <p>WHERE WE'LL USE OUR EXPERTISE AND</p>
        <p>NETWORKS TO BUILD THE NEXT</p>
        <p>ITERATION OF GREAT COMPANIES</p>
        <p>ALONGSIDE UNDISCOVERED FOUNDERS</p>
        <p>WITH INDUSTRY-CHANGING IDEAS.</p>
      </div>

      <div className="vertical-text">
        <p>projectMERCURY</p>
      </div>

      <div className="right-third">
        <button className="inquire">INQUIRE</button>

        <div className="contact-text">
          <p>office@projectmercury.com</p>
          <p>T 646 861 2827</p>
        </div>

        <div className="address-text">
          <p>324 Lafayette Street</p>
          <p>NY, New York 11201</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
