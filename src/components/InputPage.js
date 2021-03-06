import React, { useState /*, useEffect, useRef*/ } from 'react';
import Dropzone from 'react-dropzone';
import { /*useTransition,*/ useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';

import TextBox from './TextBox.js';
// import SelectDropdown from './SelectDropdown';
// import CheckboxDropdown from './CheckboxDropdown';

import logo from '../imgs/project-mercury-logo.svg';
import closeArrow from '../imgs/close-arrow.svg';
import termsCheckmark from '../imgs/terms-checkmark.svg';
import termsNoCheckmark from '../imgs/terms-no-checkmark.svg';
import uploadIcon from '../imgs/uploadArrow-Sketch.svg';

import ReactGA from 'react-ga';

function initializeAnalytics() {
  ReactGA.initialize('UA-143359903-3', {
    name: 'Form Page',
    siteSpeedSampleRate: 100,
  });
  ReactGA.pageview('Form Page');
}

function InputPage(props) {
  const [contactName, setContactName] = useState('');
  const [contactRole, setContactRole] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [based, setBased] = useState('');
  const [marketOpportunity, setMarketOpportunity] = useState('');
  const [targetDemo, setTargetDemo] = useState('');
  const [competitors, setCompetitors] = useState('');
  const [file, setFile] = useState({});
  const [currentTeam, setCurrentTeam] = useState('');
  const [positions, setPositions] = useState('');
  const [capitalRaised, setCapitalRaised] = useState('');
  const [capitalNeeded, setCapitalNeeded] = useState('');
  const [launchSelected, setLaunchSelected] = useState('');
  const [servicesString, setServicesString] = useState('');
  const [termsCheckbox, setTermsCheckbox] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  initializeAnalytics();

  const onDrop = async acceptedFiles => {
    if (acceptedFiles[0].size <= 10000000) {
      await setFile(acceptedFiles[0]);
      // alert(`${acceptedFiles[0].name} has been uploaded.`);
    } else {
      alert('FILE SIZE TOO LARGE\nPLEASE LIMIT ATTACHMENTS TO 10MB');
    }
  };

  const encode = data => {
    const formData = new FormData();
    Object.keys(data).forEach(k => {
      formData.append(k, data[k]);
    });
    return formData;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      'form-name': 'contact',
      contactName,
      contactRole,
      contactEmail,
      companyName,
      companyDescription,
      based,
      marketOpportunity,
      targetDemo,
      competitors,
      file,
      currentTeam,
      positions,
      capitalRaised,
      capitalNeeded,
      launchSelected,
      servicesString,
    };

    fetch('/', {
      method: 'POST',
      body: encode(data),
    })
      .then(
        window.scrollTo(0, 0),
        ReactGA.event({
          category: 'Submission',
          action: 'Form Submission Received',
        }),
        setSubmitted(true)
      )
      .catch(error => alert('Form Submission Failed!'));
  };

  const handleTerms = async () => {
    await setTermsCheckbox(!termsCheckbox);
  };

  //The following are springs from react-springs defined here
  //for use in animated.div's below as style props

  //logo fade in on load
  const logoSpring = useSpring({
    config: {
      duration: 2000,
    },
    from: { opacity: 0 },
    to: { opacity: 1 },
    // delay: 200,
  });
  //form fade in upon page load
  const formSpring = useSpring({
    config: {
      duration: 4000,
    },
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 1000,
  });
  //success message fade-in upon submission:
  const successSpring = useSpring({
    config: { duration: 2000 },
    from: { opacity: submitted ? 0 : 1 },
    to: { opacity: submitted ? 1 : 0 },
    delay: 1000,
  });

  // ██████╗ ███████╗███╗   ██╗██████╗ ███████╗██████╗
  // ██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝██╔══██╗
  // ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██████╔╝
  // ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗
  // ██║  ██║███████╗██║ ╚████║██████╔╝███████╗██║  ██║
  // ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝
  //
  return (
    <div className="hero is-fullheight" id="input-page">
      <div className="hero-body">
        <div className="container">
          {/*
              ______                 __ __
             / ____/___  __  _______/ //_/
            / /_  / __ \/ / / / ___/ ,<
           / __/ / /_/ / /_/ / /  / /| |
          /_/    \____/\__,_/_/  /_/ |_|
          */}
          <div className="columns is-hidden-touch is-hidden-lowres-desktop">
            {/*
            // =============================
            // 1st Column
            // =============================
            */}
            <div className="column is-1">
              <animated.img
                style={logoSpring}
                src={logo}
                alt="LOGO"
                className="logo-size"
              />
            </div>
            {/*
            // =============================
            // 2nd Column
            // =============================
            */}
            <div className="column is-2">
              <Link to="/">
                <button id="four-k-close-btn">
                  <img src={closeArrow} alt="inquire arrow" />
                  <p>CLOSE</p>
                </button>
              </Link>
            </div>
            {/*
            // =============================
            // 3rd Column
            // =============================
            */}
            {submitted ? (
              <div className="column is-1" />
            ) : (
              <div className="column is-1" id="four-k-required">
                <p>* denotes required field</p>
              </div>
            )}
            {/*
            // =============================
            // 4th Column
            // =============================
            */}
            <div className="column" id="four-k-form">
              {/*BEGIN TERNARY*/}
              {submitted ? (
                <animated.div className="success" style={successSpring}>
                  <p>THANK YOU!</p>
                  <p>WE'LL BE IN TOUCH.</p>
                  <div className="copyrightSuccess">
                    <p id="copyright-text">COPYRIGHT ©2019 PROJECT MERCURY</p>
                    <p id="rights-text">ALL RIGHTS RESERVED</p>
                  </div>
                </animated.div>
              ) : (
                <animated.form
                  name="contact"
                  onSubmit={handleSubmit}
                  netlify="true"
                  style={formSpring}
                  // action="/success"
                >
                  <p id="four-k-start-text">LET'S GET STARTED.</p>
                  {/*
            // =============================
            // Contact Name & Role
            // 001 & 002
            // =============================
            */}
                  <div
                    className="adjacent-inputs is-flex-desktop"
                    id="four-k-adj-inputs">
                    <label>
                      <input
                        style={
                          contactName.length > 0
                            ? { borderColor: 'white', color: 'white' }
                            : { borderColor: 'grey', color: 'grey' }
                        }
                        type="text"
                        name="contactName"
                        value={contactName}
                        onChange={e => setContactName(e.target.value)}
                        // ref={inputFocus}
                        // required={true}
                      />
                      <p>001. CONTACT NAME*</p>
                    </label>
                    <label>
                      <input
                        style={
                          contactRole.length > 0
                            ? { borderColor: 'white', color: 'white' }
                            : { borderColor: 'grey', color: 'grey' }
                        }
                        type="text"
                        name="contactRole"
                        value={contactRole}
                        onChange={e => setContactRole(e.target.value)}
                        // required={true}
                      />
                      <p>002. CONTACT ROLE*</p>
                    </label>
                  </div>
                  {/*
            // =============================
            // Contact Email
            // 003
            // =============================
            */}
                  <label className="four-k-solo-label">
                    <input
                      className="four-k-solo-input"
                      style={
                        contactEmail.length > 0
                          ? {
                              borderColor: 'white',
                              color: 'white',
                              fontSize: '44px',
                            }
                          : {
                              borderColor: 'grey',
                              color: 'grey',
                              fontSize: '44px',
                            }
                      }
                      type="email"
                      name="contactEmail"
                      value={contactEmail}
                      onChange={e => setContactEmail(e.target.value)}
                      required={true}
                    />
                    <p>004. CONTACT EMAIL*</p>
                  </label>
                  {/*
            // =============================
            // Company Name
            // 004
            // =============================
            */}
                  <label className="four-k-solo-label">
                    <input
                      className="four-k-solo-input"
                      style={
                        companyName.length > 0
                          ? {
                              borderColor: 'white',
                              color: 'white',
                              fontSize: '44px',
                            }
                          : {
                              borderColor: 'grey',
                              color: 'grey',
                              fontSize: '44px',
                            }
                      }
                      type="text"
                      name="companyName"
                      value={companyName}
                      onChange={e => setCompanyName(e.target.value)}
                      // required={true}
                    />
                    <p>004. COMPANY NAME*</p>
                  </label>
                  {/*
            // =============================
            // Company Description
            // 005
            // =============================
            */}
                  <div className="four-k-text-area">
                    <TextBox
                      onChange={e => setCompanyDescription(e.target.value)}
                      value={companyDescription}
                      name="companyDescription"
                      insideText="005. COMPANY DESCRIPTION*"
                    />
                  </div>
                  {/*
            // =============================
            // Where are you based?
            // 006
            // =============================
            */}
                  <label className="four-k-solo-label">
                    <input
                      className="four-k-solo-input"
                      style={
                        based.length > 0
                          ? {
                              borderColor: 'white',
                              color: 'white',
                              fontSize: '44px',
                            }
                          : {
                              borderColor: 'grey',
                              color: 'grey',
                              fontSize: '44px',
                            }
                      }
                      type="text"
                      name="based"
                      value={based}
                      onChange={e => setBased(e.target.value)}
                      // required={true}
                    />
                    <p>006. WHERE ARE YOU BASED?*</p>
                  </label>
                  {/*
            // =============================
            // Market Opportunity
            // 007
            // =============================
            */}
                  <div className="four-k-text-area">
                    <TextBox
                      onChange={e => setMarketOpportunity(e.target.value)}
                      value={marketOpportunity}
                      name="marketOpportunity"
                      insideText="007. MARKET OPPORTUNITY*"
                    />
                  </div>
                  {/*
            // =============================
            // Target Demo
            // 008
            // =============================
            */}
                  <label className="four-k-solo-label">
                    <input
                      className="four-k-one-line"
                      style={
                        targetDemo.length > 0
                          ? {
                              borderColor: 'white',
                              color: 'white',
                              fontSize: '44px',
                            }
                          : {
                              borderColor: 'grey',
                              color: 'grey',
                              fontSize: '44px',
                            }
                      }
                      type="text"
                      name="targetDemo"
                      value={targetDemo}
                      onChange={e => setTargetDemo(e.target.value)}
                      // required={true}
                    />
                    <p>008. TARGET DEMO*</p>
                  </label>
                  {/*
            // =============================
            // Competitors
            // 009
            // =============================
            */}
                  <label className="four-k-solo-label ">
                    <input
                      className="four-k-solo-input"
                      style={
                        competitors.length > 0
                          ? {
                              borderColor: 'white',
                              color: 'white',
                              fontSize: '44px',
                            }
                          : {
                              borderColor: 'grey',
                              color: 'grey',
                              fontSize: '44px',
                            }
                      }
                      type="text"
                      name="competitors"
                      value={competitors}
                      onChange={e => setCompetitors(e.target.value)}
                      // required={true}
                    />
                    <p>009. COMPETITORS*</p>
                  </label>
                  {/*
            // =============================
            // File Upload
            // 010
            // =============================
            */}
                  <div
                    className="file-upload-four-k"
                    style={{
                      borderColor:
                        file && file.name && file.size > 0 ? 'white' : 'grey',
                      outline: 'none',
                    }}>
                    <Dropzone onDrop={onDrop}>
                      {({ getRootProps, getInputProps, isDragActive }) => (
                        <div
                          {...getRootProps()}
                          className="upload"
                          style={{
                            borderColor:
                              file && file.size > 0 ? 'white' : 'grey',
                            color: file && file.size > 0 ? 'white' : 'grey',
                            outline: 'none',
                          }}>
                          <input {...getInputProps()} />
                          {isDragActive ? (
                            <div className="upload-header">
                              <p id="drop-file">DROP YOUR FILE HERE</p>
                            </div>
                          ) : (
                            <div className="upload-header">
                              <p id="instructions">
                                010. UPLOAD OR DRAG YOUR DECK OR PITCH MATERIAL
                                HERE
                              </p>
                              <p id="limit">*LIMIT: 10 MB*</p>
                            </div>
                          )}
                          <div className="upload-icon">
                            <img src={uploadIcon} alt="Upload Icon" />
                            {file && file.name ? (
                              <p>Uploaded: {file.name}</p>
                            ) : (
                              <div />
                            )}
                          </div>
                        </div>
                      )}
                    </Dropzone>
                  </div>
                  {/*
            // =============================
            // Current Team Structure
            // 011
            // =============================
            */}
                  <div className="four-k-text-area">
                    <TextBox
                      onChange={e => setCurrentTeam(e.target.value)}
                      value={currentTeam}
                      name="currentTeam"
                      insideText="011. CURRENT TEAM (INCLUDE CURRENT MANAGEMENT STRUCTURE)*"
                    />
                  </div>

                  {/*
            // =============================
            // Open/Needed Positions
            // 012
            // =============================
            */}
                  <div className="four-k-text-area">
                    <TextBox
                      onChange={e => setPositions(e.target.value)}
                      value={positions}
                      name="positions"
                      insideText="012. OPEN/NEEDED POSITIONS*"
                    />
                  </div>
                  {/*
            // =============================
            // Capital Raised
            // 013
            // =============================
            */}
                  <label id="four-k-capital-input">
                    <div id="four-k-dollar-input">
                      <p
                        style={
                          capitalRaised.length > 0
                            ? {
                                color: 'white',
                              }
                            : {
                                color: 'grey',
                              }
                        }>
                        $
                      </p>
                      <input
                        type="number"
                        name="capitalRaised"
                        // placeholder="0"
                        value={capitalRaised}
                        onChange={e => setCapitalRaised(e.target.value)}
                        outline="none"
                        style={
                          capitalRaised.length > 0
                            ? {
                                borderColor: 'white',
                                color: 'white',
                                backgroundColor: '#292929',
                                outline: 'none',
                                fontSize: '44px',
                                fontFamily: 'Graphik',
                              }
                            : {
                                borderColor: 'grey',
                                color: 'grey',
                                backgroundColor: '#292929',
                                outline: 'none',
                                fontSize: '44px',
                                fontFamily: 'Graphik',
                              }
                        }
                        // required={true}
                      />
                    </div>
                    <p
                      id="four-k-capital-label"
                      style={{
                        color: capitalRaised.length > 0 ? 'white' : 'gray',
                      }}>
                      013. CAPITAL RAISED*
                    </p>
                  </label>
                  {/*
            // =============================
            // Capital Needed
            // 014
            // =============================
            */}
                  <div className="four-k-text-area">
                    <TextBox
                      onChange={e => setCapitalNeeded(e.target.value)}
                      value={capitalNeeded}
                      name="capitalNeeded"
                      insideText="014. CAPITAL NEEDED (INCLUDE CURRENT AND PROSPECTIVE INVESTORS*"
                    />
                  </div>
                  {/*
            // =============================
            // Anticipated Launch Schedule
            // 015
            // =============================
            */}
                  <div className="four-k-text-area">
                    <TextBox
                      onChange={e => setLaunchSelected(e.target.value)}
                      value={launchSelected}
                      name="launchSelected"
                      insideText="015. ANTICIPATED LAUNCH SCHEDULE*"
                    />
                  </div>
                  {/*
            // =============================
            // Services Needed
            // 016
            // =============================
            */}
                  <label className="four-k-solo-label">
                    <input
                      className="four-k-solo-input"
                      style={
                        servicesString.length > 0
                          ? {
                              borderColor: 'white',
                              color: 'white',
                              fontSize: '44px',
                            }
                          : {
                              borderColor: 'grey',
                              color: 'grey',
                              fontSize: '44px',
                            }
                      }
                      type="text"
                      name="servicesString"
                      value={servicesString}
                      onChange={e => setServicesString(e.target.value)}
                      // required={true}
                    />
                    <p>016. SERVICES NEEDED*</p>
                  </label>
                  {/*
            // =============================
            // Terms & Conditions
            // =============================
            */}
                  <div id="four-k-terms" onClick={handleTerms}>
                    <img
                      src={termsCheckbox ? termsCheckmark : termsNoCheckmark}
                      alt="terms agreement checkmark"
                      onClick={handleTerms}
                    />
                    <p className="agree-terms">I AGREE TO THE TERMS BELOW</p>
                  </div>
                  {/*
            // =============================
            // Submit Button
            // =============================
            */}
                  <input
                    id="four-k-submit"
                    type="SUBMIT"
                    disabled={
                      termsCheckbox &&
                      contactName.length > 0 &&
                      contactRole.length > 0 &&
                      contactEmail.length > 0 &&
                      companyName.length > 0 &&
                      based.length > 0 &&
                      targetDemo.length > 0 &&
                      competitors.length > 0 &&
                      capitalRaised.length > 0 &&
                      companyDescription.length > 0 &&
                      marketOpportunity.length > 0 &&
                      currentTeam.length > 0 &&
                      positions.length > 0 &&
                      capitalNeeded.length > 0 &&
                      launchSelected.length > 0 &&
                      // servicesSelected.length > 0 &&
                      servicesString.length > 0
                        ? false
                        : true
                    }
                    value="SUBMIT"
                    style={{
                      backgroundColor:
                        termsCheckbox &&
                        contactName.length > 0 &&
                        contactRole.length > 0 &&
                        contactEmail.length > 0 &&
                        companyName.length > 0 &&
                        based.length > 0 &&
                        targetDemo.length > 0 &&
                        competitors.length > 0 &&
                        capitalRaised.length > 0 &&
                        companyDescription.length > 0 &&
                        marketOpportunity.length > 0 &&
                        currentTeam.length > 0 &&
                        positions.length > 0 &&
                        capitalNeeded.length > 0 &&
                        launchSelected.length > 0 &&
                        // servicesSelected.length > 0 &&
                        servicesString.length > 0
                          ? 'white'
                          : 'grey',
                    }}
                    readOnly
                  />
                  {/*
            // =============================
            // Legalese
            // =============================
            */}
                  <div id="four-k-legal">
                    <p>LEGAL:</p>
                    <p className="grey-legal">
                      Any nonpublic information provided hereunder is
                      confidential, and Project Mercury will not disclose the
                      information to third parties except for its professional
                      advisors as strictly necessary; and will not use the
                      information except as necessary to evaluate whether to
                      perform services for or invest in the equity of the
                      Company. Project Mercury will restrict the distribution of
                      the information within its company to those of its
                      employees and representatives who have a need to know.
                    </p>
                    <br />
                    <p className="grey-legal">
                      The foregoing is intended solely as a basis for further
                      discussions and is not intended to be and does not
                      constitute a legally binding offer, obligation or
                      commitment on the part of Project Mercury to perform
                      services for or make an investment in the Company. No
                      agreement relating to a business relationship between the
                      parties, or any services or investment, shall arise unless
                      and until a definitive written agreement relating to such
                      business relationship is negotiated, executed and
                      delivered by the parties. The disclosure of information
                      herein or the entering into discussions or a business
                      relationship between the parties shall not prevent Project
                      Mercury or any of its affiliates from evaluating a
                      possible investment in and/or collaboration with, or
                      entering into any transaction with, a company whose
                      business is similar to or competitive with the business or
                      proposed business of the Company or its affiliates.
                    </p>
                  </div>
                  {/*
            // =============================
            // Copyright
            // =============================
            */}
                  <div id="four-k-copyright">
                    <p className="copyright-text">
                      COPYRIGHT ©2019 PROJECT MERCURY
                    </p>
                    <p className="rights-text">ALL RIGHTS RESERVED</p>
                  </div>
                </animated.form>
              )}
            </div>
          </div>
          {/*
          ____            __   __
         / __ \___  _____/ /__/ /_____  ____
        / / / / _ \/ ___/ //_/ __/ __ \/ __ \
       / /_/ /  __(__  ) ,< / /_/ /_/ / /_/ /
      /_____/\___/____/_/|_|\__/\____/ .___/
                                    /_/
      */}
          <div className="columns is-hidden-touch is-hidden-four-k">
            {/*
            // =============================
            // 1st Column
            // =============================
            */}
            <div className="column is-1">
              <animated.img
                style={logoSpring}
                src={logo}
                alt="LOGO"
                className="logo-size"
              />
            </div>
            {/*
            // =============================
            // 2nd Column
            // =============================
            */}
            <div className="column is-2">
              <Link to="/">
                <button className="close-btn">
                  <img src={closeArrow} alt="inquire arrow" />
                  <p>CLOSE</p>
                </button>
              </Link>
            </div>
            {/*
            // =============================
            // 3rd Column
            // =============================
            */}
            {submitted ? (
              <div className="column is-1 required-text" />
            ) : (
              <div className="column is-1 required-text">
                <p>* denotes required field</p>
              </div>
            )}
            {/*
            // =============================
            // 4th Column
            // =============================
            */}
            <div className="column">
              {/*BEGIN TERNARY*/}
              {submitted ? (
                <animated.div className="success" style={successSpring}>
                  <p>THANK YOU!</p>
                  <p>WE'LL BE IN TOUCH.</p>
                  <div className="copyrightSuccess">
                    <p id="copyright-text">COPYRIGHT ©2019 PROJECT MERCURY</p>
                    <p id="rights-text">ALL RIGHTS RESERVED</p>
                  </div>
                </animated.div>
              ) : (
                <animated.form
                  name="contact"
                  onSubmit={handleSubmit}
                  netlify="true"
                  style={formSpring}
                  // action="/success"
                >
                  <p id="form-header-text">LET'S GET STARTED.</p>
                  {/*
            // =============================
            // Contact Name & Role
            // 001 & 002
            // =============================
            */}
                  <div className="adjacent-inputs is-flex-desktop">
                    <label>
                      <input
                        style={
                          contactName.length > 0
                            ? { borderColor: 'white', color: 'white' }
                            : { borderColor: 'grey', color: 'grey' }
                        }
                        type="text"
                        name="contactName"
                        value={contactName}
                        onChange={e => setContactName(e.target.value)}
                        // ref={inputFocus}
                        // required={true}
                      />
                      <p>001. CONTACT NAME*</p>
                    </label>
                    <label>
                      <input
                        style={
                          contactRole.length > 0
                            ? { borderColor: 'white', color: 'white' }
                            : { borderColor: 'grey', color: 'grey' }
                        }
                        type="text"
                        name="contactRole"
                        value={contactRole}
                        onChange={e => setContactRole(e.target.value)}
                        // required={true}
                      />
                      <p>002. CONTACT ROLE*</p>
                    </label>
                  </div>
                  {/*
            // =============================
            // Contact Email
            // 003
            // =============================
            */}
                  <label className="one-line-input-label">
                    <input
                      className="four-k-solo-label"
                      style={
                        contactEmail.length > 0
                          ? { borderColor: 'white', color: 'white' }
                          : { borderColor: 'grey', color: 'grey' }
                      }
                      type="email"
                      name="contactEmail"
                      value={contactEmail}
                      onChange={e => setContactEmail(e.target.value)}
                      required={true}
                    />
                    <p>003. CONTACT EMAIL*</p>
                  </label>

                  {/*
            // =============================
            // Company Name
            // 004
            // =============================
            */}
                  <label className="one-line-input-label">
                    <input
                      className="four-k-solo-label"
                      style={
                        companyName.length > 0
                          ? { borderColor: 'white', color: 'white' }
                          : { borderColor: 'grey', color: 'grey' }
                      }
                      type="text"
                      name="companyName"
                      value={companyName}
                      onChange={e => setCompanyName(e.target.value)}
                      // required={true}
                    />
                    <p>004. COMPANY NAME*</p>
                  </label>
                  {/*
            // =============================
            // Company Description
            // 005
            // =============================
            */}
                  <div className="text-box-container">
                    <TextBox
                      onChange={e => setCompanyDescription(e.target.value)}
                      value={companyDescription}
                      name="companyDescription"
                      insideText="005. COMPANY DESCRIPTION*"
                    />
                  </div>
                  {/*
            // =============================
            // Where are you based?
            // 006
            // =============================
            */}
                  <label className="one-line-input-label">
                    <input
                      className="four-k-solo-label"
                      style={
                        based.length > 0
                          ? { borderColor: 'white', color: 'white' }
                          : { borderColor: 'grey', color: 'grey' }
                      }
                      type="text"
                      name="based"
                      value={based}
                      onChange={e => setBased(e.target.value)}
                      // required={true}
                    />
                    <p>006. WHERE ARE YOU BASED?*</p>
                  </label>
                  {/*
            // =============================
            // Market Opportunity
            // 007
            // =============================
            */}
                  <div className="text-box-container">
                    <TextBox
                      onChange={e => setMarketOpportunity(e.target.value)}
                      value={marketOpportunity}
                      name="marketOpportunity"
                      insideText="007. MARKET OPPORTUNITY*"
                    />
                  </div>
                  {/*
            // =============================
            // Target Demo
            // 008
            // =============================
            */}
                  <label className="one-line-input-label">
                    <input
                      className="four-k-solo-label"
                      style={
                        targetDemo.length > 0
                          ? { borderColor: 'white', color: 'white' }
                          : { borderColor: 'grey', color: 'grey' }
                      }
                      type="text"
                      name="targetDemo"
                      value={targetDemo}
                      onChange={e => setTargetDemo(e.target.value)}
                      // required={true}
                    />
                    <p>008. TARGET DEMO*</p>
                  </label>
                  {/*
            // =============================
            // Competitors
            // 009
            // =============================
            */}
                  <label className="one-line-input-label">
                    <input
                      className="four-k-solo-label"
                      style={
                        competitors.length > 0
                          ? { borderColor: 'white', color: 'white' }
                          : { borderColor: 'grey', color: 'grey' }
                      }
                      type="text"
                      name="competitors"
                      value={competitors}
                      onChange={e => setCompetitors(e.target.value)}
                      // required={true}
                    />
                    <p>009. COMPETITORS*</p>
                  </label>
                  {/*
            // =============================
            // File Upload
            // 010
            // =============================
            */}
                  <div
                    className="file-upload-box"
                    style={{
                      borderColor:
                        file && file.name && file.size > 0 ? 'white' : 'grey',
                      outline: 'none',
                    }}>
                    <Dropzone onDrop={onDrop}>
                      {({ getRootProps, getInputProps, isDragActive }) => (
                        <div
                          {...getRootProps()}
                          className="upload"
                          style={{
                            borderColor:
                              file && file.size > 0 ? 'white' : 'grey',
                            color: file && file.size > 0 ? 'white' : 'grey',
                            outline: 'none',
                          }}>
                          <input {...getInputProps()} />
                          {isDragActive ? (
                            <div className="upload-header">
                              <p id="drop-file">DROP YOUR FILE HERE</p>
                            </div>
                          ) : (
                            <div className="upload-header">
                              <p id="instructions">
                                010. UPLOAD OR DRAG YOUR DECK OR PITCH MATERIAL
                                HERE
                              </p>
                              <p id="limit">*LIMIT: 10 MB*</p>
                            </div>
                          )}
                          <div className="upload-icon">
                            <img src={uploadIcon} alt="Upload Icon" />
                            {file && file.name ? (
                              <p>Uploaded: {file.name}</p>
                            ) : (
                              <div />
                            )}
                          </div>
                        </div>
                      )}
                    </Dropzone>
                  </div>
                  {/*
            // =============================
            // Current Team Structure
            // 011
            // =============================
            */}
                  <div className="text-box-container">
                    <TextBox
                      onChange={e => setCurrentTeam(e.target.value)}
                      value={currentTeam}
                      name="currentTeam"
                      insideText="011. CURRENT TEAM (INCLUDE CURRENT MANAGEMENT STRUCTURE)*"
                    />
                  </div>

                  {/*
            // =============================
            // Open/Needed Positions
            // 012
            // =============================
            */}
                  <div className="text-box-container">
                    <TextBox
                      onChange={e => setPositions(e.target.value)}
                      value={positions}
                      name="positions"
                      insideText="012. OPEN/NEEDED POSITIONS*"
                    />
                  </div>
                  {/*
            // =============================
            // Capital Raised
            // 013
            // =============================
            */}
                  <label className="capital-input">
                    <div className="dollar-and-input">
                      <p
                        style={
                          capitalRaised.length > 0
                            ? {
                                color: 'white',
                              }
                            : {
                                color: 'grey',
                              }
                        }>
                        $
                      </p>
                      <input
                        type="number"
                        name="capitalRaised"
                        // placeholder="0"
                        value={capitalRaised}
                        onChange={e => setCapitalRaised(e.target.value)}
                        outline="none"
                        style={
                          capitalRaised.length > 0
                            ? {
                                borderColor: 'white',
                                color: 'white',
                                backgroundColor: '#292929',
                                outline: 'none',
                                fontSize: '22px',
                                fontFamily: 'Graphik',
                              }
                            : {
                                borderColor: 'grey',
                                color: 'grey',
                                backgroundColor: '#292929',
                                outline: 'none',
                                fontSize: '22px',
                                fontFamily: 'Graphik',
                              }
                        }
                        // required={true}
                      />
                    </div>
                    <p
                      style={{
                        fontFamily: 'Graphik',
                        fontSize: '12px',
                        backgroundColor: '#292929',
                        color: capitalRaised.length > 0 ? 'white' : 'gray',
                      }}>
                      013. CAPITAL RAISED*
                    </p>
                  </label>
                  {/*
            // =============================
            // Capital Needed
            // 014
            // =============================
            */}
                  <div className="text-box-container">
                    <TextBox
                      onChange={e => setCapitalNeeded(e.target.value)}
                      value={capitalNeeded}
                      name="capitalNeeded"
                      insideText="014. CAPITAL NEEDED (INCLUDE CURRENT AND PROSPECTIVE INVESTORS*"
                    />
                  </div>
                  {/*
            // =============================
            // Anticipated Launch Schedule
            // 015
            // =============================
            */}
                  <div className="text-box-container">
                    <TextBox
                      onChange={e => setLaunchSelected(e.target.value)}
                      value={launchSelected}
                      name="launchSelected"
                      insideText="015. ANTICIPATED LAUNCH SCHEDULE*"
                    />
                  </div>
                  {/*
            // =============================
            // Services Needed
            // 016
            // =============================
            */}
                  <label className="one-line-input-label">
                    <input
                      className="four-k-solo-label"
                      style={
                        servicesString.length > 0
                          ? { borderColor: 'white', color: 'white' }
                          : { borderColor: 'grey', color: 'grey' }
                      }
                      type="text"
                      name="servicesString"
                      value={servicesString}
                      onChange={e => setServicesString(e.target.value)}
                      // required={true}
                    />
                    <p>016. SERVICES NEEDED*</p>
                  </label>
                  {/*
            // =============================
            // Terms & Conditions
            // =============================
            */}
                  <div className="terms" onClick={handleTerms}>
                    <img
                      src={termsCheckbox ? termsCheckmark : termsNoCheckmark}
                      alt="terms agreement checkmark"
                      onClick={handleTerms}
                    />
                    <p className="agree-terms">I AGREE TO THE TERMS BELOW</p>
                  </div>
                  {/*
            // =============================
            // Submit Button
            // =============================
            */}
                  <input
                    className="submit-btn"
                    type="SUBMIT"
                    disabled={
                      termsCheckbox &&
                      contactName.length > 0 &&
                      contactRole.length > 0 &&
                      contactEmail.length > 0 &&
                      companyName.length > 0 &&
                      based.length > 0 &&
                      targetDemo.length > 0 &&
                      competitors.length > 0 &&
                      capitalRaised.length > 0 &&
                      companyDescription.length > 0 &&
                      marketOpportunity.length > 0 &&
                      currentTeam.length > 0 &&
                      positions.length > 0 &&
                      capitalNeeded.length > 0 &&
                      launchSelected.length > 0 &&
                      // servicesSelected.length > 0 &&
                      servicesString.length > 0
                        ? false
                        : true
                    }
                    value="SUBMIT"
                    style={{
                      backgroundColor:
                        termsCheckbox &&
                        contactName.length > 0 &&
                        contactRole.length > 0 &&
                        contactEmail.length > 0 &&
                        companyName.length > 0 &&
                        based.length > 0 &&
                        targetDemo.length > 0 &&
                        competitors.length > 0 &&
                        capitalRaised.length > 0 &&
                        companyDescription.length > 0 &&
                        marketOpportunity.length > 0 &&
                        currentTeam.length > 0 &&
                        positions.length > 0 &&
                        capitalNeeded.length > 0 &&
                        launchSelected.length > 0 &&
                        // servicesSelected.length > 0 &&
                        servicesString.length > 0
                          ? 'white'
                          : 'grey',
                    }}
                    readOnly
                  />
                  {/*
            // =============================
            // Legalese
            // =============================
            */}
                  <div className="legal-stuff">
                    <p style={{ color: 'white' }}>LEGAL:</p>
                    <p className="grey-legal">
                      Any nonpublic information provided hereunder is
                      confidential, and Project Mercury will not disclose the
                      information to third parties except for its professional
                      advisors as strictly necessary; and will not use the
                      information except as necessary to evaluate whether to
                      perform services for or invest in the equity of the
                      Company. Project Mercury will restrict the distribution of
                      the information within its company to those of its
                      employees and representatives who have a need to know.
                    </p>
                    <br />
                    <p className="grey-legal">
                      The foregoing is intended solely as a basis for further
                      discussions and is not intended to be and does not
                      constitute a legally binding offer, obligation or
                      commitment on the part of Project Mercury to perform
                      services for or make an investment in the Company. No
                      agreement relating to a business relationship between the
                      parties, or any services or investment, shall arise unless
                      and until a definitive written agreement relating to such
                      business relationship is negotiated, executed and
                      delivered by the parties. The disclosure of information
                      herein or the entering into discussions or a business
                      relationship between the parties shall not prevent Project
                      Mercury or any of its affiliates from evaluating a
                      possible investment in and/or collaboration with, or
                      entering into any transaction with, a company whose
                      business is similar to or competitive with the business or
                      proposed business of the Company or its affiliates.
                    </p>
                  </div>
                  {/*
            // =============================
            // Copyright
            // =============================
            */}
                  <div className="copyright">
                    <p className="copyright-text">
                      COPYRIGHT ©2019 PROJECT MERCURY
                    </p>
                    <p className="rights-text">ALL RIGHTS RESERVED</p>
                  </div>
                </animated.form>
              )}
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
            <div className="column is-2 is-relative">
              <animated.img
                style={logoSpring}
                src={logo}
                alt="LOGO"
                id="input-logo-mobile"
              />
            </div>
            {/*
            // =============================
            // 2nd Column
            // =============================
            */}
            <div className="column" id="mobile-column-margin">
              <Link to="/">
                <button id="close-button-mobile">
                  <img src={closeArrow} alt="inquire arrow" />
                  <p>CLOSE</p>
                </button>
              </Link>
              {/*BEGIN TERNARY*/}
              {submitted ? (
                <animated.div className="success-mobile" style={successSpring}>
                  <div className="success-inner-wrapper-mobile">
                    <p>THANK YOU!</p>
                    <p>WE'LL BE IN TOUCH.</p>
                    <div className="copyrightSuccess-mobile">
                      <p id="copyright-text-mobile">COPYRIGHT ©2019</p>
                      <p id="copyright-text-mobile">PROJECT MERCURY</p>
                      <p id="rights-text-mobile">ALL RIGHTS RESERVED</p>
                    </div>
                  </div>
                </animated.div>
              ) : (
                <animated.form
                  name="contact"
                  onSubmit={handleSubmit}
                  netlify="true"
                  action="/success"
                  style={formSpring}>
                  <p id="form-header-text">LET'S GET STARTED.</p>
                  <p id="form-header-required-text-mobile">
                    * denotes required field
                  </p>
                  {/*
            // =============================
            // Contact Name & Role
            // 001 & 002
            // =============================
            */}
                  <div className="adjacent-inputs is-flex-desktop">
                    <label>
                      <input
                        style={
                          contactName.length > 0
                            ? { borderColor: 'white', color: 'white' }
                            : { borderColor: 'grey', color: 'grey' }
                        }
                        type="text"
                        name="contactName"
                        value={contactName}
                        onChange={e => setContactName(e.target.value)}
                        // required={true}
                      />
                      <p>001. CONTACT NAME*</p>
                    </label>
                    <label>
                      <input
                        style={
                          contactRole.length > 0
                            ? { borderColor: 'white', color: 'white' }
                            : { borderColor: 'grey', color: 'grey' }
                        }
                        type="text"
                        name="contactRole"
                        value={contactRole}
                        onChange={e => setContactRole(e.target.value)}
                        // required={true}
                      />
                      <p>002. CONTACT ROLE*</p>
                    </label>
                  </div>
                  {/*
            // =============================
            // Contact Email
            // 003
            // =============================
            */}
                  <label className="one-line-input-label">
                    <input
                      className="one-line-input"
                      style={
                        contactEmail.length > 0
                          ? { borderColor: 'white', color: 'white' }
                          : { borderColor: 'grey', color: 'grey' }
                      }
                      type="email"
                      name="contactEmail"
                      value={contactEmail}
                      onChange={e => setContactEmail(e.target.value)}
                      required={true}
                    />
                    <p>003. CONTACT EMAIL*</p>
                  </label>
                  {/*
            // =============================
            // Company Name
            // 004
            // =============================
            */}
                  <label className="one-line-input-label">
                    <input
                      className="one-line-input"
                      style={
                        companyName.length > 0
                          ? { borderColor: 'white', color: 'white' }
                          : { borderColor: 'grey', color: 'grey' }
                      }
                      type="text"
                      name="companyName"
                      value={companyName}
                      onChange={e => setCompanyName(e.target.value)}
                      // required={true}
                    />
                    <p>004. COMPANY NAME*</p>
                  </label>
                  {/*
            // =============================
            // Company Description
            // 005
            // =============================
            */}
                  <div className="text-box-container">
                    <TextBox
                      onChange={e => setCompanyDescription(e.target.value)}
                      value={companyDescription}
                      name="companyDescription"
                      insideText="005. COMPANY DESCRIPTION*"
                    />
                  </div>
                  {/*
            // =============================
            // Where are you based?
            // 006
            // =============================
            */}
                  <label className="one-line-input-label">
                    <input
                      className="one-line-input"
                      style={
                        based.length > 0
                          ? { borderColor: 'white', color: 'white' }
                          : { borderColor: 'grey', color: 'grey' }
                      }
                      type="text"
                      name="based"
                      value={based}
                      onChange={e => setBased(e.target.value)}
                      // required={true}
                    />
                    <p>006. WHERE ARE YOU BASED?*</p>
                  </label>
                  {/*
            // =============================
            // Market Opportunity
            // 007
            // =============================
            */}
                  <div className="text-box-container">
                    <TextBox
                      onChange={e => setMarketOpportunity(e.target.value)}
                      value={marketOpportunity}
                      name="marketOpportunity"
                      insideText="007. MARKET OPPORTUNITY*"
                    />
                  </div>
                  {/*
            // =============================
            // Target Demo
            // 008
            // =============================
            */}
                  <label className="one-line-input-label">
                    <input
                      className="one-line-input"
                      style={
                        targetDemo.length > 0
                          ? { borderColor: 'white', color: 'white' }
                          : { borderColor: 'grey', color: 'grey' }
                      }
                      type="text"
                      name="targetDemo"
                      value={targetDemo}
                      onChange={e => setTargetDemo(e.target.value)}
                      // required={true}
                    />
                    <p>008. TARGET DEMO*</p>
                  </label>
                  {/*
            // =============================
            // Competitors
            // 009
            // =============================
            */}
                  <label className="one-line-input-label">
                    <input
                      className="one-line-input"
                      style={
                        competitors.length > 0
                          ? { borderColor: 'white', color: 'white' }
                          : { borderColor: 'grey', color: 'grey' }
                      }
                      type="text"
                      name="competitors"
                      value={competitors}
                      onChange={e => setCompetitors(e.target.value)}
                      // required={true}
                    />
                    <p>009. COMPETITORS*</p>
                  </label>
                  {/*
            // =============================
            // File Upload
            // 010
            // =============================
            */}
                  <div
                    className="file-upload-box"
                    style={{
                      borderColor:
                        file && file.name && file.size > 0 ? 'white' : 'grey',
                    }}>
                    <Dropzone onDrop={onDrop}>
                      {({ getRootProps, getInputProps, isDragActive }) => (
                        <div
                          {...getRootProps()}
                          className="upload"
                          style={{
                            borderColor:
                              file && file.size > 0 ? 'white' : 'grey',
                            color: file && file.size > 0 ? 'white' : 'grey',
                          }}>
                          <input {...getInputProps()} />
                          {isDragActive ? (
                            <div className="upload-header">
                              <p id="drop-file">DROP YOUR FILE HERE</p>
                            </div>
                          ) : (
                            <div className="upload-header">
                              <p id="instructions">
                                010. UPLOAD OR DRAG YOUR DECK OR PITCH MATERIAL
                                HERE
                              </p>
                              <p id="limit">*LIMIT: 10 MB*</p>
                            </div>
                          )}
                          <div className="upload-icon">
                            <img src={uploadIcon} alt="Upload Icon" />
                            {file && file.name ? (
                              <p>Uploaded: {file.name}</p>
                            ) : (
                              <div />
                            )}
                          </div>
                        </div>
                      )}
                    </Dropzone>
                  </div>

                  {/*
            // =============================
            // Current Team Structure
            // 011
            // =============================
            */}
                  <div className="text-box-container">
                    <TextBox
                      onChange={e => setCurrentTeam(e.target.value)}
                      value={currentTeam}
                      name="currentTeam"
                      insideText="011. CURRENT TEAM (INCLUDE CURRENT MANAGEMENT STRUCTURE)*"
                    />
                  </div>

                  {/*
            // =============================
            // Open/Needed Positions
            // 012
            // =============================
            */}
                  <div className="text-box-container">
                    <TextBox
                      onChange={e => setPositions(e.target.value)}
                      value={positions}
                      name="positions"
                      insideText="012. OPEN/NEEDED POSITIONS*"
                    />
                  </div>
                  {/*
            // =============================
            // Capital Raised
            // 013
            // =============================
            */}
                  <label className="one-line-input-label">
                    <div className="dollar-and-input-mobile">
                      <p>$</p>
                      <input
                        style={
                          capitalRaised.length > 0
                            ? {
                                borderColor: 'white',
                                color: 'white',
                                backgroundColor: 'transparent',
                                outline: 'none',
                              }
                            : {
                                borderColor: 'grey',
                                color: 'grey',
                                backgroundColor: 'transparent',
                                outline: 'none',
                              }
                        }
                        type="number"
                        name="capitalRaised"
                        value={capitalRaised}
                        outline="none"
                        onChange={e => setCapitalRaised(e.target.value)}
                        // required={true}
                      />
                    </div>
                    <p>013. CAPITAL RAISED*</p>
                  </label>
                  {/*
            // =============================
            // Capital Needed
            // 014
            // =============================
            */}
                  <div className="text-box-container">
                    <TextBox
                      onChange={e => setCapitalNeeded(e.target.value)}
                      value={capitalNeeded}
                      name="capitalNeeded"
                      insideText="014. CAPITAL NEEDED (INCLUDE CURRENT AND PROSPECTIVE INVESTORS*"
                    />
                  </div>
                  {/*
            // =============================
            // Anticipated Launch Schedule
            // 015
            // =============================
            */}
                  <div className="text-box-container">
                    <TextBox
                      onChange={e => setLaunchSelected(e.target.value)}
                      value={launchSelected}
                      name="launchSelected"
                      insideText="015. ANTICIPATED LAUNCH SCHEDULE*"
                    />
                  </div>
                  {/*
            // =============================
            // Services Needed
            // 016
            // =============================
            */}
                  <label className="one-line-input-label">
                    <input
                      className="one-line-input"
                      style={
                        servicesString.length > 0
                          ? { borderColor: 'white', color: 'white' }
                          : { borderColor: 'grey', color: 'grey' }
                      }
                      type="text"
                      name="servicesString"
                      value={servicesString}
                      onChange={e => setServicesString(e.target.value)}
                      // required={true}
                    />
                    <p>016. SERVICES NEEDED*</p>
                  </label>
                  {/*
            // =============================
            // Terms & Conditions
            // =============================
            */}

                  <div className="terms" onClick={handleTerms}>
                    <img
                      src={termsCheckbox ? termsCheckmark : termsNoCheckmark}
                      alt="terms agreement checkmark"
                      onClick={handleTerms}
                    />
                    <p className="agree-terms" onClick={handleTerms}>
                      I AGREE TO THE TERMS BELOW
                    </p>
                  </div>
                  {/*
            // =============================
            // Submit Button
            // =============================
            */}
                  <input
                    className="submit-btn"
                    type="SUBMIT"
                    disabled={
                      termsCheckbox &&
                      contactName.length > 0 &&
                      contactRole.length > 0 &&
                      contactEmail.length > 0 &&
                      companyName.length > 0 &&
                      based.length > 0 &&
                      targetDemo.length > 0 &&
                      competitors.length > 0 &&
                      capitalRaised.length > 0 &&
                      companyDescription.length > 0 &&
                      marketOpportunity.length > 0 &&
                      currentTeam.length > 0 &&
                      positions.length > 0 &&
                      capitalNeeded.length > 0 &&
                      launchSelected.length > 0 &&
                      // servicesSelected.length > 0 &&
                      servicesString.length > 0
                        ? false
                        : true
                    }
                    value="SUBMIT"
                    style={{
                      backgroundColor:
                        termsCheckbox &&
                        contactName.length > 0 &&
                        contactRole.length > 0 &&
                        contactEmail.length > 0 &&
                        companyName.length > 0 &&
                        based.length > 0 &&
                        targetDemo.length > 0 &&
                        competitors.length > 0 &&
                        capitalRaised.length > 0 &&
                        companyDescription.length > 0 &&
                        marketOpportunity.length > 0 &&
                        currentTeam.length > 0 &&
                        positions.length > 0 &&
                        capitalNeeded.length > 0 &&
                        launchSelected.length > 0 &&
                        // servicesSelected.length > 0 &&
                        servicesString.length > 0
                          ? 'white'
                          : 'grey',
                    }}
                    readOnly
                  />
                  {/*
            // =============================
            // Legalese
            // =============================
            */}
                  <div className="legal-stuff">
                    <p style={{ color: 'white' }}>LEGAL:</p>
                    <p className="grey-legal">
                      Any nonpublic information provided hereunder is
                      confidential, and Project Mercury will not disclose the
                      information to third parties except for its professional
                      advisors as strictly necessary; and will not use the
                      information except as necessary to evaluate whether to
                      perform services for or invest in the equity of the
                      Company. Project Mercury will restrict the distribution of
                      the information within its company to those of its
                      employees and representatives who have a need to know.
                    </p>
                    <br />
                    <p className="grey-legal">
                      The foregoing is intended solely as a basis for further
                      discussions and is not intended to be and does not
                      constitute a legally binding offer, obligation or
                      commitment on the part of Project Mercury to perform
                      services for or make an investment in the Company. No
                      agreement relating to a business relationship between the
                      parties, or any services or investment, shall arise unless
                      and until a definitive written agreement relating to such
                      business relationship is negotiated, executed and
                      delivered by the parties. The disclosure of information
                      herein or the entering into discussions or a business
                      relationship between the parties shall not prevent Project
                      Mercury or any of its affiliates from evaluating a
                      possible investment in and/or collaboration with, or
                      entering into any transaction with, a company whose
                      business is similar to or competitive with the business or
                      proposed business of the Company or its affiliates.
                    </p>
                  </div>
                  {/*
            // =============================
            // Copyright
            // =============================
            */}
                  <div className="copyright-mobile">
                    <p className="copyright-text">
                      COPYRIGHT ©2019 PROJECT MERCURY
                    </p>
                    <p className="rights-text">ALL RIGHTS RESERVED</p>
                  </div>
                </animated.form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputPage;
