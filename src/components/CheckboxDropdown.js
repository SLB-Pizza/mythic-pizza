import React from 'react';
import '../App.css';

// props (services, handleSelect, name, insidetext)
export default class CheckboxDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: this.props.services || [],
      showServices: false,
      selectedServices: [],
    };
  }

  dropdown = () => {
    this.setState({ showServices: !this.state.showServices });
  };

  selectService = async selectedService => {
    if (!this.state.selectedServices.includes(selectedService)) {
      await this.setState({
        selectedServices: [...this.state.selectedServices, selectedService],
        showServices: false,
      });
    } else {
      const filteredServices = this.state.selectedServices.filter(
        service => service.id !== selectedService.id
      );
      await this.setState({
        selectedServices: filteredServices,
      });
    }
    console.log(
      'CheckboxDropdown.js selectService func selectedServices: \n',
      this.state.selectedServices
    );
    this.props.handleSelect(selectedService);
    // this.props.handleSelect(service);
  };

  render() {
    return (
      <div className="checkboxDropdownWrapper">
        {this.state.selectedServices.length > 0
          ? this.state.selectedServices
              .reduce((acc, curr) => acc + ', ' + curr.service, '')
              .slice(1)
          : ''}
        <div className="dropDownArrow" onClick={this.dropdown}>
          <span
            className={
              this.state.showServices
                ? 'selectDropdownArrowUp'
                : 'selectDropdownArrowDown'
            }
          />
        </div>
        <div style={{ display: this.state.showServices ? 'block' : 'none' }}>
          {this.state.services.map(service => (
            <div
              className={
                this.state.selectedOption === service
                  ? 'selectedService'
                  : 'unselectedService'
              }
              key={service.id}
              onClick={() => this.selectService(service)}
            >
              {service.service}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
