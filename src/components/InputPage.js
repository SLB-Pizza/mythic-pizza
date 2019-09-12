import React from 'react';
import '../App.css';

class InputPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactName: '',
      contactRole: '',
      companyName: '',
      companyDescription: '',
      based: '',
      // '006launchTiming': ['option1', 'option2', 'etc'],
      marketOpportunity: '',
      targetDemo: '',
      competitors: '',
      uploadFile: '',
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
  }

  handleChange = event => {
    // eslint-disable-next-line no-unused-vars
    const stateName = event.target.name;
    console.log('event.target.value:', event.target.value);
    console.log('event.target.name:', event.target.name);
    this.setState({ [stateName]: event.target.value });
    console.log(`this.state[${stateName}]:`, this.state);
  };

  handleSubmit = event => {
    event.preventDefault();
    alert('SUBMIT ATTEMPTED');
  };

  render() {
    return (
      <div className="input-page">
        <button
          className="closeButton"
          onClick={() => {
            alert('CLOSE CLICKED');
          }}
        >
          CLOSE
        </button>
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
              />
              001. CONTACT NAME*
            </label>
            <label className="sideBySide-input">
              <input
                type="text"
                name="contactRole"
                value={this.state.contactRole}
                onChange={this.handleChange}
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
              />
              003. COMPANY NAME
            </label>
          </div>
          <div className="solo-input-container">
            <label className="solo-input">
              <textarea
                type="text"
                name="companyDescription"
                value={this.state.companyDescription}
                onChange={this.handleChange}
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
