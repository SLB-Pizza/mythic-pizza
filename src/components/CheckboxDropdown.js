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
    this.node = null;
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleOutsideClick() {
    this.setState({ showServices: false });
  }

  handleClick(e) {
    if (this.node.contains(e.target)) {
      // attach/remove event handler
      return;
    } else {
      this.handleOutsideClick();
    }
  }

  dropdown = () => {
    this.setState({ showServices: !this.state.showServices });
  };

  selectService = async selectedService => {
    if (!this.state.selectedServices.includes(selectedService)) {
      const newServices = [...this.state.selectedServices, selectedService];
      await newServices.sort((a, b) => a.id - b.id);

      await this.setState({
        selectedServices: newServices,
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
        ref={node => (this.node = node)}
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
          {/* MAP  */}
          {this.state.services.map(service => (
            // MAP RETURN WRAPPER DIV
            <div
              key={service.id}
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderTop: '1px solid grey',
                height: '4vh',
                backgroundColor: 'white',
              }}
            >
              {/* checkbox div orange  */}
              <div
                className={
                  this.state.selectedServices.includes(service)
                    ? 'servicesCheckboxActive'
                    : 'servicesCheckboxInactive'
                }
                onClick={() => this.selectService(service)}
                style={{
                  // backgroundColor: 'orange',
                  marginRight: '1%',
                  marginLeft: '1%',
                }}
              >
                {this.state.selectedServices.includes(service) ? (
                  <img
                    src={checkmark}
                    alt="check"
                    style={{
                      justifySelf: 'center',
                      alignSelf: 'center',
                      height: '95%',
                      width: '95%',
                    }}
                  />
                ) : null}
              </div>

              {/*textfield div teal*/}
              <div
                className="selectedService"
                // className={
                //   this.state.selectedOption === service
                //     ? 'selectedService'
                //     : 'unselectedService'
                // }
                key={service.id}
                onClick={() => this.selectService(service)}
                style={{
                  alignSelf: 'center',
                  // backgroundColor: 'teal'
                }}
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
