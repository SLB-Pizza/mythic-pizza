import React from 'react';
import '../App.css';
import TextBox from './TextBox.js';
import FileUpload from './FileUpload';
import SelectDropdown from './SelectDropdown';
import CheckboxDropdown from './CheckboxDropdown';

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
        { id: 1, timing: '3 months' },
        { id: 2, timing: '6 months' },
        { id: 3, timing: '9 months' },
        { id: 4, timing: '1 year' },
        { id: 5, timing: '2 years' },
        { id: 6, timing: '2 years +' },
      ],
      launchSelected: '3 months',
      servicesNeeded: [
        { id: 1, service: 'Web Development' },
        { id: 2, service: 'Web Design' },
        { id: 3, service: 'Branding' },
        { id: 4, service: 'Strategy' },
        { id: 5, service: 'Fundraising' },
      ],
      servicesSelected: [],
      servicesString: '',
      termsCheckbox: false,
      status: '',
    };

    this.handleChange.bind(this);
    this.handleSubmit.bind(this);
    this.handleFile.bind(this);
    this.handleLaunchSelect.bind(this);
    this.handleServicesSelect.bind(this);
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

  //this handleSubmit is 100% copied from netlify docs
  //https://www.netlify.com/blog/2017/07/20/how-to-integrate-netlifys-form-handling-in-a-react-app/#form-handling-with-a-stateful-react-form
  handleSubmit = e => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: this.encode({ 'form-name': 'contact', ...this.state }),
    })
      .then(() => alert('Success!'))
      .catch(error => alert(error));

    e.preventDefault();
  };
  //encode func is copied from netlify docs
  encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  };

  handleFile = file => {
    console.log('handleFile in Input.js current file: \n', file);
    if (!this.state.uploads.includes(file)) {
      this.setState({ uploads: [...this.state.uploads, file] });
    }
    console.log('handleFile this.state.uploads: ', this.state.uploads);
  };

  handleLaunchSelect = async option => {
    await this.setState({
      launchSelected: option.timing,
    });
    console.log(
      'InputPage handleSelect selectedTiming: ',
      this.state.launchSelected
    );
  };

  handleServicesSelect = async selectedService => {
    if (!this.state.servicesSelected.includes(selectedService)) {
      await this.setState({
        servicesSelected: [...this.state.servicesSelected, selectedService],
      });
    } else {
      const filteredServices = this.state.servicesSelected.filter(
        service => service.id !== selectedService.id
      );
      await this.setState({
        servicesSelected: filteredServices,
      });
    }

    const stringServices = this.state.servicesSelected
      .reduce((acc, curr) => acc + ', ' + curr.service, '')
      .slice(1);
    console.log('handleServicesSelect stringServices: ', stringServices);
    await this.setState({ servicesString: stringServices });
  };

  handleTerms = async () => {
    await this.setState({
      termsCheckbox: !this.state.termsCheckbox,
    });
  };

  render() {
    return (
      <div className="input-page">
        <p className="inputPageSidewaysText">projectMERCURY</p>
        <div className="closeButtonWrapper">
          <button
            className="closeButton"
            onClick={() => {
              alert('CLOSE CLICKED');
            }}
          >
            CLOSE
          </button>
          <p className="inputPageContactInfo">office@projectmercury.com</p>
          <p className="inputPageContactInfo">T 646 861 2827</p>
          <div className="inputPageContactSpacer"></div>
          <p className="inputPageContactInfo">324 Lafayette Street</p>
          <p className="inputPageContactInfo">NY, New York 11201</p>
        </div>
        <form
          name="contact"
          onSubmit={this.handleSubmit}
          netlify
          // data-netlify-honeypot="bot-field"
          className="input-form"
        >
          {/* <input type="hidden" name="form-name" value="contact" /> */}
          {/* <input type="hidden" name="bot-field" /> */}
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
            <label>
              <input
                className="solo-input"
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
            <label>
              <input
                className="solo-input"
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
            <label>
              <input
                className="solo-input"
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
                name="uploads"
                value={this.state.uploads}
                handleFile={this.handleFile}
                required={true}
              />
            </label>
          </div>
          <div className="solo-input-container">
            <label className="solo-input">
              <TextBox
                onChange={this.handleChange}
                value={this.state.currentTeam}
                name="currentTeam"
                insideText="010. CURRENT TEAM (INCLUDE CURRENT MANAGEMENT STRUCTURE)*"
              />
            </label>
          </div>
          <div className="solo-input-container">
            <label className="solo-input">
              <TextBox
                onChange={this.handleChange}
                value={this.state.positions}
                name="positions"
                insideText="011. OPEN/NEEDED POSITIONS*"
              />
            </label>
          </div>
          <div className="solo-input-container">
            <label>
              $
              <input
                className="solo-input"
                type="number"
                name="capitalRaised"
                value={this.state.capitalRaised}
                onChange={this.handleChange}
                required={true}
              />
              012. CAPITAL RAISED*
            </label>
          </div>
          <div className="solo-input-container">
            <label className="solo-input">
              <TextBox
                onChange={this.handleChange}
                value={this.state.capitalNeeded}
                name="capitalNeeded"
                insideText="013. CAPITAL NEEDED (INCLUDE CURRENT AND PROSPECTIVE INVESTORS*"
              />
            </label>
          </div>
          <div className="solo-input-container">
            <label className="solo-input">
              <SelectDropdown
                handleSelect={this.handleLaunchSelect}
                options={this.state.launchSchedule}
                name="launchSelected"
                insideText="014. ANTICIPATED LAUNCH SCHEDULE*"
              />
              014. ANTICIPATED LAUNCH SCHEDULE*
            </label>
          </div>
          <div className="solo-input-container">
            <label className="solo-input">
              <CheckboxDropdown
                handleSelect={this.handleServicesSelect}
                services={this.state.servicesNeeded}
                name="servicesString"
                insideText="015. SERVICES NEEDED*"
              />
              015. SERVICES NEEDED*
            </label>
          </div>
          <div className="termsAndCheckboxWrapper">
            <div
              className={
                this.state.termsCheckbox
                  ? 'termsCheckboxAgreed'
                  : 'termsCheckboxNotAgree'
              }
              onClick={this.handleTerms}
            />
          </div>
          <p>I AGREE TO THE TERMS BELOW</p>
          <input
            type="SUBMIT"
            disabled={this.state.termsCheckbox ? false : true}
          />
          <p>LEGAL:</p>
          <p>
            Any nonpublic information provided hereunder is confidential, and
            Project Mercury will not disclose the information to third parties
            except for its professional advisors as strictly necessary; and will
            not use the information except as necessary to evaluate whether to
            perform services for or invest in the equity of the Company. Project
            Mercury will restrict the distribution of the information within its
            company to those of its employees and representatives who have a
            need to know.
          </p>
          <p>
            The foregoing is intended solely as a basis for further discussions
            and is not intended to be and does not constitute a legally binding
            offer, obligation or commitment on the part of Project Mercury to
            perform services for or make an investment in the Company. No
            agreement relating to a business relationship between the parties,
            or any services or investment, shall arise unless and until a
            definitive written agreement relating to such business relationship
            is negotiated, executed and delivered by the parties. The disclosure
            of information herein or the entering into discussions or a business
            relationship between the parties shall not prevent Project Mercury
            or any of its affiliates from evaluating a possible investment in
            and/or collaboration with, or entering into any transaction with, a
            company whose business is similar to or competitive with the
            business or proposed business of the Company or its affiliates.
          </p>
        </form>
      </div>
    );
  }
}

export default InputPage;
