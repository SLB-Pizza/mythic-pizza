import React from "react";
import "../App.css";
import TextBox from "./TextBox.js";

class InputPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactName: "",
      contactRole: "",
      companyName: "",
      companyDescription: "",
      based: "",
      marketOpportunity: "",
      targetDemo: "",
      competitors: "",
      uploadFile: "",
      currentTeam: "",
      positions: "",
      capitalRaised: "",
      capitalNeeded: "",
      launchSchedule: [
        "3 months",
        "6 months",
        "9 months",
        "1 year",
        "2 years",
        "2 years +"
      ],
      sernicesNeeded: [
        "Web Development",
        "Web Design",
        "Branding",
        "Strategy",
        "Fundraising"
      ],
      termsCheckbox: false
    };

    this.handleChange.bind(this);
    this.handleSubmit.bind(this);
  }

  handleChange = event => {
    // eslint-disable-next-line no-unused-vars
    const stateName = event.target.name;
    console.log("event.target.value:", event.target.value);
    console.log("event.target.name:", event.target.name);
    this.setState({ [stateName]: event.target.value });
    console.log(`this.state[${stateName}]:`, this.state);
  };

  handleSubmit = event => {
    event.preventDefault();
    alert("SUBMIT ATTEMPTED");
  };

  render() {
    return (
      <div className="input-page">
        <div>
          <button
            className="closeButton"
            onClick={() => {
              alert("CLOSE CLICKED");
            }}
          >
            CLOSE
          </button>
        </div>
        <form
          name="project mercury form"
          onSubmit={this.handleSubmit}
          netlify="true"
          className="input-form"
        >
          <div className="sideBySide-input-container">
            <label className="sideBySide-input">
              <input
                type="text"
                name="contactName"
                value={this.state.contactName}
                onChange={this.handleChange}
                required={true}
              />
              001. CONTACT NAME*
            </label>
            <label className="sideBySide-input">
              <input
                type="text"
                name="contactRole"
                value={this.state.contactRole}
                onChange={this.handleChange}
                required={true}
              />
              002. CONTACT ROLE*
            </label>
          </div>
          <div className="solo-input-container">
            <label className="solo-input">
              <input
                type="text"
                name="companyName"
                value={this.state.companyName}
                onChange={this.handleChange}
                required={true}
              />
              003. COMPANY NAME*
            </label>
          </div>
          <div className="solo-input-container">
            <div className="solo-input">
              <TextBox
                onChange={this.handleChange}
                value={this.state.companyDescription}
                name="companyDescription"
                insideText="004. COMPANY DESCRIPTION*"
              />
            </div>
          </div>
          <div className="solo-input-container">
            <label className="solo-input">
              <input
                type="text"
                name="based"
                value={this.state.based}
                onChange={this.handleChange}
                required={true}
              />
              005. WHERE ARE YOU BASED?*
            </label>
          </div>
          <div className="solo-input-container">
            <label className="solo-input">
              <TextBox
                onChange={this.handleChange}
                value={this.state.marketOpportunity}
                name="marketOpportunity"
                insideText="006. MARKET OPPORTUNITY*"
              />
            </label>
          </div>
          <div className="solo-input-container">
            <label className="solo-input">
              <input
                type="text"
                name="targetDemo"
                value={this.state.targetDemo}
                onChange={this.handleChange}
                required={true}
              />
              007. TARGET DEMO*
            </label>
          </div>
          <div className="solo-input-container">
            <label className="solo-input">
              <input
                type="text"
                name="competitors"
                value={this.state.competitors}
                onChange={this.handleChange}
                required={true}
              />
              008. COMPETITORS*
            </label>
          </div>
          <div className="solo-input-container">
            <label className="solo-input">
              <input
                type="file"
                name="uploadFile"
                value={this.state.uploadFile}
                onChange={this.handleChange}
                required={true}
              />
              008. UPLOAD OR DRAG YOUR DECK OR PITCH MATERIALS HERE SIZE
              LIMIT:10MB*
            </label>
          </div>
          <input type="SUBMIT" />
        </form>
      </div>
    );
  }
}

export default InputPage;
