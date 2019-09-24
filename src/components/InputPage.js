import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { useTransition, useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";

import "../App.css";
import TextBox from "./TextBox.js";
import SelectDropdown from "./SelectDropdown";
import CheckboxDropdown from "./CheckboxDropdown";
import logo from "../imgs/project-mercury-logo.svg";

function InputPage(props) {
  const [contactName, setContactName] = useState("");
  const [contactRole, setContactRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [based, setBased] = useState("");
  const [marketOpportunity, setMarketOpportunity] = useState("");
  const [targetDemo, setTargetDemo] = useState("");
  const [competitors, setCompetitors] = useState("");
  const [file, setFile] = useState({});
  const [currentTeam, setCurrentTeam] = useState("");
  const [positions, setPositions] = useState("");
  const [capitalRaised, setCapitalRaised] = useState("");
  const [capitalNeeded, setCapitalNeeded] = useState("");
  const launchSchedule = [
    { id: 1, timing: "3 MONTHS" },
    { id: 2, timing: "6 MONTHS" },
    { id: 3, timing: "9 MONTHS" },
    { id: 4, timing: "1 YEAR" },
    { id: 5, timing: "2 YEARS" },
    { id: 6, timing: "2 YEARS+" }
  ];
  const [launchSelected, setLaunchSelected] = useState("3 MONTHS");
  const servicesNeeded = [
    { id: 1, service: "BRANDING" },
    { id: 2, service: "FUNDRAISING" },
    { id: 3, service: "STRATEGY" },
    { id: 4, service: "WEB DESIGN" },
    { id: 5, service: "WEB DEVELOPMENT" }
  ];
  const [servicesSelected, setServicesSelected] = useState([]);
  const [servicesString, setServicesString] = useState("");
  const [termsCheckbox, setTermsCheckbox] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onDrop = async acceptedFiles => {
    if (acceptedFiles[0].size <= 10000000) {
      console.log("acceptdFiles: ", acceptedFiles);
      // await this.setState({ file: acceptedFiles[0] });
      await setFile(acceptedFiles[0]);
      alert(`${file.name} has been uploaded`);
    } else {
      alert("FILE SIZE TOO LARGE\nPLEASE LIMIT ATTACHMENTS TO 10MB");
    }
  };

  //remnant from class based origins:
  // const handleChange = event => {
  //   // eslint-disable-next-line no-unused-vars
  //   const stateName = event.target.name;
  //   console.log('event.target.value:', event.target.value);
  //   console.log('event.target.name:', event.target.name);
  //   console.log('event:', event);
  //   this.setState({ [stateName]: event.target.value });
  //   console.log(`this.state[${stateName}]:`, this.state);
  // };

  const encode = data => {
    const formData = new FormData();
    Object.keys(data).forEach(k => {
      formData.append(k, data[k]);
    });
    return formData;
  };

  const handleSubmit = e => {
    // const data = { 'form-name': 'contact', ...this.state };
    const data = {
      "form-name": "contact",
      contactName,
      contactRole,
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
      servicesString
    };

    fetch("/", {
      method: "POST",
      // headers: { "Content-Type": 'multipart/form-data; boundary=random' },
      body: encode(data)
    })
      .then(
        () => alert("Form Submission Successful!!"),
        console.log("form submission object: ", data),
        setSubmitted(true)
      )
      .catch(error => alert("Form Submission Failed!"));

    e.preventDefault();
  };

  const handleLaunchSelect = async option => {
    await setLaunchSelected(option.timing);
    console.log("InputPage handleSelect selectedTiming: ", launchSelected);
  };

  const handleServicesSelect = async selectedServices => {
    console.log("handleServicesSelect selectedServices: ", selectedServices);
    await setServicesSelected(selectedServices);
    console.log(
      "servicesSelected AFTER setServicesSelected: ",
      servicesSelected
    );

    const stringServices = await selectedServices
      .reduce((acc, curr) => acc + ", " + curr.service, "")
      .slice(1);
    console.log("handleServicesSelect stringServices: ", stringServices);
    await setServicesString(stringServices);
    console.log("handleServicesSelect servicesString: ", servicesString);
  };

  const handleTerms = async () => {
    await setTermsCheckbox(!termsCheckbox);
  };

  // ██████╗ ███████╗███╗   ██╗██████╗ ███████╗██████╗
  // ██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝██╔══██╗
  // ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██████╔╝
  // ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗
  // ██║  ██║███████╗██║ ╚████║██████╔╝███████╗██║  ██║
  // ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝
  //
  // The flex for the four input page columns on desktop is as follows:
  // - vertical-logo-input: 1
  // - button/address: 3
  // - required-stuff-warning: 1
  // - inquire-form: 7
  // 12 columns total - something we may replicate when bulma is added

  // Things to note:
  // vertical-logo and address remain fixed even as inquire-form scrolls
  // required-stuff-warning does not seem to scroll as we move down the form
  // ISSUE: Re-org this page into 4 sub-divs as detailed above under "input-page"
  //
  // This should be the foundation for the addition of mobile responsiveness

  //THe Following are springs from react-springs defined here
  //for use in animated.div's below as style props
  const logoSpring = useSpring({
    config: {
      duration: 2000
    },
    from: { opacity: 0 },
    to: { opacity: 1 }
    // delay: 200,
  });

  return (
    <div className="input-page">
      {/*
          ___    __    _____     __
         <  /__ / /_  / ___/__  / /_ ____ _  ___
         / (_-</ __/ / /__/ _ \/ / // /  ' \/ _ \
        /_/___/\__/  \___/\___/_/\_,_/_/_/_/_//_/
        */}

      <div className="vertical-logo-input">
        <animated.img
          style={logoSpring}
          src={logo}
          alt="LOGO"
          className="mercury-logo"
        />
        {/* <p>
          PROJECT<span id="mercury-text-input">MERCURY</span>
        </p> */}
      </div>
      {/*
           ___          __  _____     __
          |_  |___  ___/ / / ___/__  / /_ ____ _  ___
         / __// _ \/ _  / / /__/ _ \/ / // /  ' \/ _ \
        /____/_//_/\_,_/  \___/\___/_/\_,_/_/_/_/_//_/
        */}
      <div className="closeButtonWrapper">
        <Link to="/">
          <button
            className="closeButton"
            // onClick={() => {
            //   alert('CLOSE CLICKED');
            // }}
          >
            CLOSE
          </button>
        </Link>
        <div className="inputContactInfo">
          <p>office@projectmercury.com</p>
          <p>T 646 861 2827</p>
          <p>324 Lafayette Street</p>
          <p>NY, New York 11201</p>
        </div>
      </div>
      {/*
           ____        __  _____     __
          |_  /_______/ / / ___/__  / /_ ____ _  ___
         _/_ </ __/ _  / / /__/ _ \/ / // /  ' \/ _ \
        /____/_/  \_,_/  \___/\___/_/\_,_/_/_/_/_//_/
        */}
      <div className="requiredWrapper">
        <p>* denotes required field</p>
      </div>
      {/*
          ____ __  __     _____     __
         / / // /_/ /    / ___/__  / /_ ____ _  ___
        /_  _/ __/ _ \  / /__/ _ \/ / // /  ' \/ _ \
         /_/ \__/_//_/  \___/\___/_/\_,_/_/_/_/_//_/
        */}
      <form
        name="contact"
        onSubmit={handleSubmit}
        netlify="true"
        // data-netlify-honeypot="bot-field"
        className="input-form"
        action="/success"
        style={{ overflow: "visible" }}
      >
        {/* <input type="hidden" name="form-name" value="contact" /> */}
        {/* <input type="hidden" name="bot-field" /> */}
        <p className="form-header-text">LET'S GET STARTED.</p>
        <div className="sideBySide-input-container">
          <label
            id="left-sideBySide"
            style={
              contactName.length > 0
                ? { borderColor: "white", color: "white" }
                : { borderColor: "grey", color: "grey" }
            }
          >
            <input
              className="sideBySide-input"
              style={
                contactName.length > 0
                  ? { borderColor: "white", color: "white" }
                  : { borderColor: "grey", color: "grey" }
              }
              type="text"
              name="contactName"
              value={contactName}
              onChange={e => setContactName(e.target.value)}
              required={true}
            />
            <p>001. CONTACT NAME*</p>
          </label>
          <label
            id="right-sideBySide"
            style={
              contactRole.length > 0
                ? { borderColor: "white", color: "white" }
                : { borderColor: "grey", color: "grey" }
            }
          >
            <input
              className="sideBySide-input"
              style={
                contactRole.length > 0
                  ? { borderColor: "white", color: "white" }
                  : { borderColor: "grey", color: "grey" }
              }
              type="text"
              name="contactRole"
              value={contactRole}
              onChange={e => setContactRole(e.target.value)}
              required={true}
            />
            <p>002. CONTACT ROLE*</p>
          </label>
        </div>
        <div className="solo-input-container">
          <label
            style={
              companyName.length > 0
                ? { borderColor: "white", color: "white" }
                : { borderColor: "grey", color: "grey" }
            }
          >
            <input
              className="solo-input"
              style={
                companyName.length > 0
                  ? { borderColor: "white", color: "white" }
                  : { borderColor: "grey", color: "grey" }
              }
              type="text"
              name="companyName"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              required={true}
            />
            <p>003. COMPANY NAME*</p>
          </label>
        </div>
        <div className="solo-input-container">
          <div className="solo-input-textBox">
            <TextBox
              onChange={e => setCompanyDescription(e.target.value)}
              value={companyDescription}
              name="companyDescription"
              insideText="004. COMPANY DESCRIPTION*"
            />
          </div>
        </div>
        <div className="solo-input-container">
          <label
            style={
              based.length > 0
                ? { borderColor: "white", color: "white" }
                : { borderColor: "grey", color: "grey" }
            }
          >
            <input
              className="solo-input"
              style={
                based.length > 0
                  ? { borderColor: "white", color: "white" }
                  : { borderColor: "grey", color: "grey" }
              }
              type="text"
              name="based"
              value={based}
              onChange={e => setBased(e.target.value)}
              required={true}
            />
            <p>005. WHERE ARE YOU BASED?*</p>
          </label>
        </div>
        <div className="solo-input-container">
          <label className="solo-input-textBox">
            <TextBox
              onChange={e => setMarketOpportunity(e.target.value)}
              value={marketOpportunity}
              name="marketOpportunity"
              insideText="006. MARKET OPPORTUNITY*"
            />
          </label>
        </div>
        <div className="solo-input-container">
          <label
            style={
              targetDemo.length > 0
                ? { borderColor: "white", color: "white" }
                : { borderColor: "grey", color: "grey" }
            }
          >
            <input
              className="solo-input"
              style={
                targetDemo.length > 0
                  ? { borderColor: "white", color: "white" }
                  : { borderColor: "grey", color: "grey" }
              }
              type="text"
              name="targetDemo"
              value={targetDemo}
              onChange={e => setTargetDemo(e.target.value)}
              required={true}
            />
            <p>007. TARGET DEMO*</p>
          </label>
        </div>
        <div className="solo-input-container">
          <label
            style={
              competitors.length > 0
                ? { borderColor: "white", color: "white" }
                : { borderColor: "grey", color: "grey" }
            }
          >
            <input
              className="solo-input"
              style={
                competitors.length > 0
                  ? { borderColor: "white", color: "white" }
                  : { borderColor: "grey", color: "grey" }
              }
              type="text"
              name="competitors"
              value={competitors}
              onChange={e => setCompetitors(e.target.value)}
              required={true}
            />
            <p>008. COMPETITORS*</p>
          </label>
        </div>
        <div className="solo-input-container">
          <div
            className="fileUploadWrapper"
            style={{
              borderColor: file && file.name && file.size > 0 ? "white" : "grey"
            }}
          >
            <div className="fileUploadInner">
              <Dropzone onDrop={onDrop}>
                {({ getRootProps, getInputProps, isDragActive }) => (
                  <div
                    {...getRootProps()}
                    style={{
                      height: "19vh",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderColor: file && file.size > 0 ? "white" : "grey",
                      color: file && file.size > 0 ? "white" : "grey"
                    }}
                  >
                    <input {...getInputProps()} />
                    {isDragActive
                      ? "DROP YOUR FILE HERE"
                      : "009. UPLOAD OR DRAG YOUR DECK OR PITCH MATERIAL *LIMIT:10MB*"}
                    {file && file.name ? <div>{file.name}</div> : " "}
                  </div>
                )}
              </Dropzone>
            </div>
          </div>
        </div>
        <div className="solo-input-container">
          <label className="solo-input">
            <TextBox
              onChange={e => setCurrentTeam(e.target.value)}
              value={currentTeam}
              name="currentTeam"
              insideText="010. CURRENT TEAM (INCLUDE CURRENT MANAGEMENT STRUCTURE)*"
            />
          </label>
        </div>
        <div className="solo-input-container">
          <label className="solo-input">
            <TextBox
              onChange={e => setPositions(e.target.value)}
              value={positions}
              name="positions"
              insideText="011. OPEN/NEEDED POSITIONS*"
            />
          </label>
        </div>
        <div className="solo-input-container">
          <label
            style={
              capitalRaised.length > 0
                ? { borderColor: "white", color: "white" }
                : { borderColor: "grey", color: "grey" }
            }
          >
            <label
              style={
                capitalRaised.length > 0
                  ? {
                      borderColor: "white",
                      display: "flex",
                      flexDirection: "row",
                      fontSize: "1.5rem"
                    }
                  : {
                      borderColor: "grey",
                      color: "grey",
                      display: "flex",
                      flexDirection: "row",
                      fontSize: "1.5rem"
                    }
              }
            >
              <p
                style={{
                  height: "100%",
                  // borderBottomStyle: 'solid',
                  // borderBottomWidth: '1px',
                  alignSelf: "center"
                }}
              >
                $
              </p>
              <input
                className="solo-input"
                style={
                  capitalRaised.length > 0
                    ? {
                        borderColor: "white",
                        color: "white",
                        backgroundColor: "transparent"
                      }
                    : {
                        borderColor: "grey",
                        color: "grey",
                        backgroundColor: "transparent"
                      }
                }
                type="number"
                name="capitalRaised"
                value={capitalRaised}
                onChange={e => setCapitalRaised(e.target.value)}
                required={true}
              />
            </label>
            <p>012. CAPITAL RAISED*</p>
          </label>
        </div>
        <div className="solo-input-container">
          <label className="solo-input">
            <TextBox
              onChange={e => setCapitalNeeded(e.target.value)}
              value={capitalNeeded}
              name="capitalNeeded"
              insideText="013. CAPITAL NEEDED (INCLUDE CURRENT AND PROSPECTIVE INVESTORS*"
            />
          </label>
        </div>
        <div className="solo-input-select-dropdown-container">
          <label className="solo-input-select-dropdown">
            <SelectDropdown
              handleSelect={handleLaunchSelect}
              options={launchSchedule}
              name="launchSelected"
              insideText="014. ANTICIPATED LAUNCH SCHEDULE*"
            />
            <p style={{ paddingTop: "10px" }}>
              014. ANTICIPATED LAUNCH SCHEDULE*
            </p>
          </label>
        </div>
        <div className="solo-input-container">
          <label
            className="solo-input"
            style={
              servicesSelected.length > 0
                ? { borderColor: "transparent", color: "white" }
                : { borderColor: "transparent", color: "grey" }
            }
          >
            <CheckboxDropdown
              value={servicesSelected}
              handleSelect={handleServicesSelect}
              services={servicesNeeded}
              name="servicesString"
              insideText="015. SERVICES NEEDED*"
            />
            <p style={{ paddingTop: "10px" }}>015. SERVICES NEEDED*</p>
          </label>
        </div>
        <div
          className="termsAndCheckboxWrapper"
          style={{ paddingBottom: "5%" }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              className={
                termsCheckbox ? "termsCheckboxAgreed" : "termsCheckboxNotAgree"
              }
              onClick={handleTerms}
            />
          </div>
          <div className="text" style={{ color: "white", paddingLeft: "2vw" }}>
            I AGREE TO THE TERMS BELOW
          </div>
        </div>
        <input
          type="SUBMIT"
          disabled={termsCheckbox ? false : true}
          style={{
            color: "black",
            border: "none",
            backgroundColor:
              termsCheckbox &&
              companyDescription.length > 0 &&
              marketOpportunity.length > 0 &&
              currentTeam.length > 0 &&
              positions.length > 0 &&
              capitalNeeded.length > 0 &&
              servicesSelected.length > 0 &&
              file.size > 0
                ? "white"
                : "grey",
            width: "100%",
            height: "5vh",
            borderRadius: "2px"
          }}
        />
        SUBMIT
        <p className="text" style={{ color: "white" }}>
          LEGAL:
        </p>
        <p className="text" style={{ color: "grey" }}>
          Any nonpublic information provided hereunder is confidential, and
          Project Mercury will not disclose the information to third parties
          except for its professional advisors as strictly necessary; and will
          not use the information except as necessary to evaluate whether to
          perform services for or invest in the equity of the Company. Project
          Mercury will restrict the distribution of the information within its
          company to those of its employees and representatives who have a need
          to know.
        </p>
        <p className="text" style={{ color: "grey" }}>
          The foregoing is intended solely as a basis for further discussions
          and is not intended to be and does not constitute a legally binding
          offer, obligation or commitment on the part of Project Mercury to
          perform services for or make an investment in the Company. No
          agreement relating to a business relationship between the parties, or
          any services or investment, shall arise unless and until a definitive
          written agreement relating to such business relationship is
          negotiated, executed and delivered by the parties. The disclosure of
          information herein or the entering into discussions or a business
          relationship between the parties shall not prevent Project Mercury or
          any of its affiliates from evaluating a possible investment in and/or
          collaboration with, or entering into any transaction with, a company
          whose business is similar to or competitive with the business or
          proposed business of the Company or its affiliates.
        </p>
        <div className="copyright">
          <p id="copyright-text">COPYRIGHT 2019 PROJECT MERCURY</p>
          <p id="rights-text">ALL RIGHTS RESERVED</p>
        </div>
      </form>
    </div>
  );
}

export default InputPage;
