import React from 'react';
import '../App.css';
import downArrow from '../icons/corner-right-down.svg';
import upArrow from '../icons/corner-right-up.svg';
import checkmark from '../imgs/check.svg';

// props (services, handleSelect, name, insidetext)
export default class CheckboxDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: this.props.services || [],
      showServices: false,
      selectedServices: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  handleClick() {
    if (!this.state.showServices) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState({ showServices: false });
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }

    this.handleClick();
  }

  dropdown = () => {
    this.setState({ showServices: !this.state.showServices });
  };

  selectService = async selectedService => {
    if (!this.state.selectedServices.includes(selectedService)) {
      await this.setState({
        selectedServices: [...this.state.selectedServices, selectedService],
        // showServices: false,
      });
    } else {
      const filteredServices = this.state.selectedServices.filter(
        service => service.id !== selectedService.id
      );
      await this.setState({
        selectedServices: filteredServices,
        // showServices: false,
      });
    }
    console.log(
      'CheckboxDropdown.js selectService func selectedServices: \n',
      this.state.selectedServices
    );
    this.props.handleSelect(this.state.selectedServices);
    // this.props.handleSelect(service);
  };

  render() {
    return (
      <div
        className="checkboxDropdownWrapper"
        style={{
          borderBottomColor: this.props.value.length > 0 ? 'white' : 'grey',
          display: 'flex',
          flexDirection: 'column',
        }}
        ref={node => {
          this.node = node;
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onClick={this.dropdown}
        >
          {this.props.value.length > 0
            ? this.props.value
                .reduce((acc, curr) => acc + ', ' + curr.service, '')
                .slice(1)
            : 'PLEASE SELECT AT LEAST ONE SERVICE'}
          <div className="dropDownArrow" onClick={this.dropdown}>
            {this.state.showServices ? (
              <img src={upArrow} alt={upArrow} />
            ) : (
              <img src={downArrow} alt={downArrow} />
            )}
          </div>
        </div>
        <div
          style={{
            display: this.state.showServices ? 'inline' : 'none',
            width: '100%',
          }}
        >
          {this.state.services.map(service => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderTop: '1px solid grey',
                height: '4vh',
                backgroundColor: 'white',
              }}
            >
              <div
                className={
                  this.state.selectedServices.includes(service)
                    ? 'servicesCheckboxActive'
                    : 'servicesCheckboxInactive'
                }
                onClick={() => this.selectService(service)}
              >
                {this.state.selectedServices.includes(service) ? (
                  <img
                    src={checkmark}
                    alt="check"
                    style={{ justifySelf: 'center', alignSelf: 'center' }}
                  />
                ) : null}
              </div>
              <div
                className="selectedService"
                // className={
                //   this.state.selectedOption === service
                //     ? 'selectedService'
                //     : 'unselectedService'
                // }
                key={service.id}
                onClick={() => this.selectService(service)}
              >
                {service.service}
              </div>
            </div>
          ))}
        </div>{' '}
      </div>
    );
  }
}
