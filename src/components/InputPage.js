import React from "react";
import Dropzone from "react-dropzone";
import "../App.css";
import TextBox from "./TextBox.js";
// import FileUpload from './FileUpload';
import SelectDropdown from "./SelectDropdown";
import CheckboxDropdown from "./CheckboxDropdown";

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
      file: {},
      currentTeam: "",
      positions: "",
      capitalRaised: "",
      capitalNeeded: "",
      launchSchedule: [
        { id: 1, timing: "3 months" },
        { id: 2, timing: "6 months" },
        { id: 3, timing: "9 months" },
        { id: 4, timing: "1 year" },
        { id: 5, timing: "2 years" },
        { id: 6, timing: "2 years +" }
      ],
      launchSelected: "3 months",
      servicesNeeded: [
        { id: 1, service: "Web Development" },
        { id: 2, service: "Web Design" },
        { id: 3, service: "Branding" },
        { id: 4, service: "Strategy" },
        { id: 5, service: "Fundraising" }
      ],
      servicesSelected: [],
      services: "",
      termsCheckbox: false
      // status: '',
    };

    this.handleChange.bind(this);
    this.handleSubmit.bind(this);
    // this.handleFile.bind(this);
    this.handleLaunchSelect.bind(this);
    this.handleServicesSelect.bind(this);
  }

  onDrop = async acceptedFiles => {
    if (acceptedFiles[0].size <= 10000000) {
      console.log("acceptdFiles: ", acceptedFiles);
      await this.setState({ file: acceptedFiles[0] });
      alert(`${acceptedFiles[0].name} has been uploaded`);
      console.log("file: ", this.state.file.name);
    } else {
      alert("FILE SIZE TOO LARGE\nPLEASE LIMIT ATTACHMENTS TO 10MB");
    }
    // console.log('this.state.file post setState: ', this.state.file);
  };
  // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  handleChange = event => {
    // eslint-disable-next-line no-unused-vars
    const stateName = event.target.name;
    console.log("event.target.value:", event.target.value);
    console.log("event.target.name:", event.target.name);
    console.log("event:", event);
    this.setState({ [stateName]: event.target.value });
    console.log(`this.state[${stateName}]:`, this.state);
  };

  //this handleSubmit is 100% copied from netlify docs
  //https://www.netlify.com/blog/2017/07/20/how-to-integrate-netlifys-form-handling-in-a-react-app/#form-handling-with-a-stateful-react-form
  // handleSubmit = e => {
  //   fetch('/', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //     body: this.encode({ 'form-name': 'contact', ...this.state }),
  //   })
  //     .then(() => alert('Success!'))
  //     .catch(error => alert(error));

  //   e.preventDefault();
  // };
  // //encode func is copied from netlify docs
  // encode = data => {
  //   return Object.keys(data)
  //     .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
  //     .join('&');
  // };

  encode = data => {
    const formData = new FormData();
    Object.keys(data).forEach(k => {
      formData.append(k, data[k]);
    });
    return formData;
  };

  handleSubmit = e => {
    const data = { "form-name": "contact", ...this.state };

    fetch("/", {
      method: "POST",
      // headers: { "Content-Type": 'multipart/form-data; boundary=random' },
      body: this.encode(data)
    })
      .then(() =>
        /*alert('Form Submission Successful!!')*/ console.log(
          "form submission object: ",
          data
        )
      )
      .catch(error => alert("Form Submission Failed!"));

    e.preventDefault();
  };

  // handleFile = file => {
  //   console.log('handleFile in Input.js current file: \n', file[0]);
  //   this.setState({ uploads: file[0] });

  //   console.log('handleFile this.state.uploads: ', this.state.uploads);
  // };

  //backup of array version
  // handleFile = file => {
  //   console.log('handleFile in Input.js current file: \n', file);
  //   if (!this.state.uploads.includes(file)) {
  //     this.setState({ uploads: [...this.state.uploads, file] });
  //   }
  //   console.log('handleFile this.state.uploads: ', this.state.uploads);
  // };
  handleLaunchSelect = async option => {
    await this.setState({
      launchSelected: option.timing
    });
    console.log(
      "InputPage handleSelect selectedTiming: ",
      this.state.launchSelected
    );
  };

  handleServicesSelect = async selectedService => {
    if (!this.state.servicesSelected.includes(selectedService)) {
      await this.setState({
        servicesSelected: [...this.state.servicesSelected, selectedService]
      });
    } else {
      const filteredServices = this.state.servicesSelected.filter(
        service => service.id !== selectedService.id
      );
      await this.setState({
        servicesSelected: filteredServices
      });
    }

    const stringServices = this.state.servicesSelected
      .reduce((acc, curr) => acc + ", " + curr.service, "")
      .slice(1);
    console.log("handleServicesSelect stringServices: ", stringServices);
    await this.setState({ services: stringServices });
  };

  handleTerms = async () => {
    await this.setState({
      termsCheckbox: !this.state.termsCheckbox
    });
  };

  handleServicesSelect = async selectedService => {
    if (!this.state.servicesSelected.includes(selectedService)) {
      await this.setState({
        servicesSelected: [...this.state.servicesSelected, selectedService]
      });
    } else {
      const filteredServices = this.state.servicesSelected.filter(
        service => service.id !== selectedService.id
      );
      await this.setState({
        servicesSelected: filteredServices
      });
    }

    const stringServices = this.state.servicesSelected
      .reduce((acc, curr) => acc + ", " + curr.service, "")
      .slice(1);
    console.log("handleServicesSelect stringServices: ", stringServices);
    await this.setState({ servicesString: stringServices });
  };

  handleTerms = async () => {
    await this.setState({
      termsCheckbox: !this.state.termsCheckbox
    });
  };

  // ██████╗ ███████╗███╗   ██╗██████╗ ███████╗██████╗
  // ██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝██╔══██╗
  // ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██████╔╝
  // ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗
  // ██║  ██║███████╗██║ ╚████║██████╔╝███████╗██║  ██║
  // ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝
  //
  // The flex for the four input page columns on desktop is as follows:
  // - vertical-logo: 1
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

  render() {
    return (
      <div className="input-page">
        <div className="vertical-logo">
          <p>
            PROJECT<span id="mercury-text">MERCURY</span>
          </p>
        </div>
        <div className="closeButtonWrapper">
          <button
            className="closeButton"
            onClick={() => {
              alert("CLOSE CLICKED");
            }}
            style={{
              backgroundColor: "black",
              borderColor: "white",
              color: "white",
              borderWidth: "1px",
              width: "7vw",
              height: "5vh"
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
        <div className="inputPageSidewaysTextWrapper">
          <div className="inputPageSidewaysText" style={{ flex: 1 }}>
            *denotes required field
          </div>
        </div>
        <form
          name="contact"
          onSubmit={this.handleSubmit}
          netlify="true"
          // data-netlify-honeypot="bot-field"
          className="input-form"
        >
          {/* <input type="hidden" name="form-name" value="contact" /> */}
          {/* <input type="hidden" name="bot-field" /> */}
          <p className="text">LET'S GET STARTED</p>
          <div className="sideBySide-input-container">
            <label
              style={
                this.state.contactName.length > 0
                  ? { borderColor: "white", color: "white" }
                  : { borderColor: "grey", color: "grey" }
              }
            >
              <input
                className="sideBySide-input"
                style={
                  this.state.contactName.length > 0
                    ? { borderColor: "white", color: "white" }
                    : { borderColor: "grey", color: "grey" }
                }
                type="text"
                name="contactName"
                value={this.state.contactName}
                onChange={this.handleChange}
                required={true}
              />
              001. CONTACT NAME*
            </label>
            <label
              style={
                this.state.contactRole.length > 0
                  ? { borderColor: "white", color: "white" }
                  : { borderColor: "grey", color: "grey" }
              }
            >
              <input
                className="sideBySide-input"
                style={
                  this.state.contactRole.length > 0
                    ? { borderColor: "white", color: "white" }
                    : { borderColor: "grey", color: "grey" }
                }
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
            <label
              style={
                this.state.companyName.length > 0
                  ? { borderColor: "white", color: "white" }
                  : { borderColor: "grey", color: "grey" }
              }
            >
              <input
                className="solo-input"
                style={
                  this.state.companyName.length > 0
                    ? { borderColor: "white", color: "white" }
                    : { borderColor: "grey", color: "grey" }
                }
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
            <div className="solo-input-textBox">
              <TextBox
                onChange={this.handleChange}
                value={this.state.companyDescription}
                name="companyDescription"
                insideText="004. COMPANY DESCRIPTION*"
              />
            </div>
          </div>
          <div className="solo-input-container">
            <label
              style={
                this.state.based.length > 0
                  ? { borderColor: "white", color: "white" }
                  : { borderColor: "grey", color: "grey" }
              }
            >
              <input
                className="solo-input"
                style={
                  this.state.based.length > 0
                    ? { borderColor: "white", color: "white" }
                    : { borderColor: "grey", color: "grey" }
                }
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
            <label className="solo-input-textBox">
              <TextBox
                onChange={this.handleChange}
                value={this.state.marketOpportunity}
                name="marketOpportunity"
                insideText="006. MARKET OPPORTUNITY*"
              />
            </label>
          </div>
          <div className="solo-input-container">
            <label
              style={
                this.state.targetDemo.length > 0
                  ? { borderColor: "white", color: "white" }
                  : { borderColor: "grey", color: "grey" }
              }
            >
              <input
                className="solo-input"
                style={
                  this.state.targetDemo.length > 0
                    ? { borderColor: "white", color: "white" }
                    : { borderColor: "grey", color: "grey" }
                }
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
            <label
              style={
                this.state.competitors.length > 0
                  ? { borderColor: "white", color: "white" }
                  : { borderColor: "grey", color: "grey" }
              }
            >
              <input
                className="solo-input"
                style={
                  this.state.competitors.length > 0
                    ? { borderColor: "white", color: "white" }
                    : { borderColor: "grey", color: "grey" }
                }
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
            <div
              className="fileUploadWrapper"
              style={{
                borderColor:
                  this.state.file && this.state.file.size > 0 ? "white" : "grey"
              }}
            >
              <div className="fileUploadInner">
                <Dropzone onDrop={this.onDrop}>
                  {({ getRootProps, getInputProps, isDragActive }) => (
                    <div
                      {...getRootProps()}
                      style={{
                        height: "19vh",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderColor:
                          this.state.file && this.state.file.size > 0
                            ? "white"
                            : "grey",
                        color:
                          this.state.file && this.state.file.size > 0
                            ? "white"
                            : "grey"
                      }}
                    >
                      <input {...getInputProps()} />
                      {isDragActive
                        ? "DROP YOUR FILE HERE"
                        : "009. UPLOAD OR DRAG YOUR DECK OR PITCH MATERIAL SIZE LIMIT:10MB*"}
                      {this.state.file && this.state.file.name ? (
                        <div>{this.state.file.name}</div>
                      ) : (
                        " "
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>
            </div>
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
            <label
              style={
                this.state.capitalRaised.length > 0
                  ? { borderColor: "white", color: "white" }
                  : { borderColor: "grey", color: "grey" }
              }
            >
              <label
                style={
                  this.state.capitalRaised.length > 0
                    ? {
                        borderColor: "white",
                        color: "white",
                        display: "flex",
                        flexDirection: "row"
                      }
                    : {
                        borderColor: "grey",
                        color: "grey",
                        display: "flex",
                        flexDirection: "row"
                      }
                }
              >
                $
                <input
                  className="solo-input"
                  style={
                    this.state.capitalRaised.length > 0
                      ? { borderColor: "white", color: "white" }
                      : { borderColor: "grey", color: "grey" }
                  }
                  type="number"
                  name="capitalRaised"
                  value={this.state.capitalRaised}
                  onChange={this.handleChange}
                  required={true}
                />
              </label>
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
          <div className="solo-input-select-dropdown-container">
            <label className="solo-input-select-dropdown">
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
            <label
              className="solo-input"
              style={
                this.state.servicesSelected.length > 0
                  ? { borderColor: "transparent", color: "white" }
                  : { borderColor: "transparent", color: "grey" }
              }
            >
              <CheckboxDropdown
                handleSelect={this.handleServicesSelect}
                services={this.state.servicesNeeded}
                name="services"
                insideText="015. SERVICES NEEDED*"
              />
              015. SERVICES NEEDED*
            </label>
          </div>
          <div
            className="termsAndCheckboxWrapper"
            style={{ paddingBottom: "5%" }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                className={
                  this.state.termsCheckbox
                    ? "termsCheckboxAgreed"
                    : "termsCheckboxNotAgree"
                }
                onClick={this.handleTerms}
              />
            </div>
            <div className="text">I AGREE TO THE TERMS BELOW</div>
          </div>
          <input
            type="SUBMIT"
            disabled={this.state.termsCheckbox ? false : true}
            style={{
              color: "black",
              border: "none",
              backgroundColor:
                this.state.termsCheckbox &&
                this.state.companyDescription.length > 0 &&
                this.state.marketOpportunity.length > 0 &&
                this.state.currentTeam.length > 0 &&
                this.state.positions.length > 0 &&
                this.state.capitalNeeded.length > 0 &&
                this.state.servicesSelected.length > 0 &&
                this.state.file.size > 0
                  ? "white"
                  : "grey",
              width: "100%",
              height: "5vh",
              borderRadius: "2px"
            }}
          />
          <p className="text">LEGAL:</p>
          <p className="text">
            Any nonpublic information provided hereunder is confidential, and
            Project Mercury will not disclose the information to third parties
            except for its professional advisors as strictly necessary; and will
            not use the information except as necessary to evaluate whether to
            perform services for or invest in the equity of the Company. Project
            Mercury will restrict the distribution of the information within its
            company to those of its employees and representatives who have a
            need to know.
          </p>
          <p className="text">
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
