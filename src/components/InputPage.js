import React from 'react';
import '../App.css';
import TextBox from './TextBox.js';
import FileUpload from './FileUpload';

class InputPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactName: '',
      contactRole: '',
      companyName: '',
      companyDescription: '',
      based: '',
      marketOpportunity: '',
      targetDemo: '',
      competitors: '',
      uploads: [],
      currentTeam: '',
      positions: '',
      capitalRaised: '',
      capitalNeeded: '',
      launchSchedule: [
        '3 months',
        '6 months',
        '9 months',
        '1 year',
        '2 years',
        '2 years +',
      ],
      sernicesNeeded: [
        'Web Development',
        'Web Design',
        'Branding',
        'Strategy',
        'Fundraising',
      ],
      termsCheckbox: false,
    };

    this.handleChange.bind(this);
    this.handleSubmit.bind(this);
    this.handleFile.bind(this);
  }

  handleChange = event => {
    // eslint-disable-next-line no-unused-vars
    const stateName = event.target.name;
    console.log('event.target.value:', event.target.value);
    console.log('event.target.name:', event.target.name);
    console.log('event:', event);
    this.setState({ [stateName]: event.target.value });
    console.log(`this.state[${stateName}]:`, this.state);
  };

  handleSubmit = event => {
    console.log('this in handleSubmit: ', this);

    // event.preventDefault();
    // alert('SUBMIT ATTEMPTED');
  };

  handleFile = file => {
    console.log('this in handleFile: ', this);
    console.log(file);
    this.setState({ uploads: [...this.state.uploads, file] });
    console.log('handleFile this.state.uploads: ', this.state.uploads);
  };

  render() {
    return (
      <div className="input-page">
        <div className="closeButtonWrapper">
          <button
            className="closeButton"
            onClick={() => {
              alert('CLOSE CLICKED');
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
            <label>
              <input
                className="sideBySide-input"
                type="text"
                name="contactName"
                value={this.state.contactName}
                onChange={this.handleChange}
                required={true}
              />
              001. CONTACT NAME*
            </label>
            <label>
              <input
                className="sideBySide-input"
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
            <label>
              <input
                className="solo-input"
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
              <FileUpload
                name="uploadFile"
                value={this.state.uploads}
                handleFile={this.handleFile}
                // required={true}
              />
            </label>
          </div>
          <input type="SUBMIT" />
        </form>
      </div>
    );
  }
}

export default InputPage;
