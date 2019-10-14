import React from 'react';
import downArrow from '../imgs/dropdownArrow-Sketch.svg';
import upArrow from '../imgs/dropdownUpArrow-Sketch.svg';
import downArrow4k from '../imgs/dropdownArrow-Sketch-4k.svg';
import upArrow4k from '../imgs/dropdownUpArrow-Sketch-4k.svg';
import checkmark from '../imgs/check.svg';
import whiteCheck from '../imgs/check-white.svg';

// props (services, handleSelect, name, insidetext)
export default class CheckboxDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: this.props.services || [],
      showServices: false,
      selectedServices: [],
      hovering: false,
      hoverNode: null,
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
      });
    }

    this.props.handleSelect(this.state.selectedServices);
  };

  render() {
    return this.props.touch ? (
      <div
        className={
          this.state.showServices
            ? 'checkboxDropdown-no-border'
            : 'checkboxDropdown'
        }
        style={{
          borderBottomColor: this.props.value.length > 0 ? 'white' : 'grey',
          display: 'flex',
          flexDirection: 'column',
        }}
        ref={node => (this.node = node)}>
        <div className="checkbox-inner-wrapper" onClick={this.dropdown}>
          {this.props.value.length > 0
            ? this.props.value
                .reduce((acc, curr) => acc + ', ' + curr.service, '')
                .slice(1)
            : 'Please select at least one service'}
          <div className="dropDownArrow" onClick={this.dropdown}>
            {this.state.showServices ? (
              <img src={this.props.fourk ? upArrow4k : upArrow} alt={upArrow} />
            ) : (
              <img
                src={this.props.fourk ? downArrow4k : downArrow}
                alt={downArrow}
              />
            )}
          </div>
        </div>
        <div
          style={{
            display: this.state.showServices ? 'contents' : 'none',
            width: '100%',
          }}>
          {/* MAP  */}
          {this.state.services.map(service => (
            // MAP RETURN WRAPPER DIV
            <div
              key={service.id}
              className="map-wrapper"
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderTop: '1px solid grey',
                // height: '4vh',
                backgroundColor: this.props.touch
                  ? 'white'
                  : this.state.hoverNode === service.id
                  ? '#292929'
                  : 'white',
                color: this.props.touch
                  ? '#292929'
                  : this.state.hoverNode === service.id
                  ? 'white'
                  : '#292929',
              }}>
              {/* checkbox div orange  */}
              <div
                className={
                  this.state.hoverNode === service.id
                    ? 'servicesCheckboxHover'
                    : this.state.selectedServices.includes(service)
                    ? 'servicesCheckboxActive'
                    : 'servicesCheckboxInactive'
                }
                onClick={() => this.selectService(service)}
                style={{
                  // backgroundColor: 'orange',
                  marginRight: '1%',
                  marginLeft: '1%',
                }}>
                {this.state.selectedServices.includes(service) ? (
                  this.state.hoverNode === service.id ? (
                    <img
                      src={whiteCheck}
                      alt="whiteCheck"
                      className="checkmark"
                    />
                  ) : (
                    <img src={checkmark} alt="check" className="checkmark" />
                  )
                ) : null}
              </div>

              <div
                // className="selectedService"
                className={
                  this.state.hoverNode === service.id
                    ? 'hoverService'
                    : 'selectedService'
                }
                key={service.id}
                onMouseEnter={() => {
                  this.setState({ hoverNode: service.id });
                }}
                onMouseLeave={() => {
                  this.setState({ hoverNode: null });
                }}
                onClick={() => this.selectService(service)}
                style={{
                  alignSelf: 'center',
                  // backgroundColor: 'teal'
                }}>
                {service.service}
              </div>
            </div>
          ))}
          {/*end of MAP*/}
        </div>
      </div>
    ) : (
      <div
        className={
          this.state.showServices
            ? 'checkboxDropdown-no-border'
            : 'checkboxDropdown'
        }
        style={{
          borderBottomColor: this.props.value.length > 0 ? 'white' : 'grey',
          display: 'flex',
          flexDirection: 'column',
        }}
        ref={node => (this.node = node)}>
        <div className="checkbox-inner-wrapper" onClick={this.dropdown}>
          {this.props.value.length > 0
            ? this.props.value
                .reduce((acc, curr) => acc + ', ' + curr.service, '')
                .slice(1)
            : 'Please select at least one service'}
          <div className="dropDownArrow" onClick={this.dropdown}>
            {this.state.showServices ? (
              <img src={this.props.fourk ? upArrow4k : upArrow} alt={upArrow} />
            ) : (
              <img
                src={this.props.fourk ? downArrow4k : downArrow}
                alt={downArrow}
              />
            )}
          </div>
        </div>
        <div
          style={{
            display: this.state.showServices ? 'inline' : 'none',
            width: '100%',
          }}>
          {/* MAP  */}
          {this.state.services.map(service => (
            // MAP RETURN WRAPPER DIV
            <div
              key={service.id}
              className="map-wrapper"
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderTop: '1px solid grey',
                height: '4vh',
                backgroundColor:
                  this.state.hoverNode === service.id ? '#292929' : 'white',
                color:
                  this.state.hoverNode === service.id ? 'white' : '#292929',
              }}>
              {/* checkbox div orange  */}
              <div
                className={
                  this.state.hoverNode === service.id
                    ? 'servicesCheckboxHover'
                    : this.state.selectedServices.includes(service)
                    ? 'servicesCheckboxActive'
                    : 'servicesCheckboxInactive'
                }
                onClick={() => this.selectService(service)}
                style={{
                  // backgroundColor: 'orange',
                  marginRight: '1%',
                  marginLeft: '1%',
                }}>
                {this.state.selectedServices.includes(service) ? (
                  this.state.hoverNode === service.id ? (
                    <img
                      src={whiteCheck}
                      alt="whiteCheck"
                      className="checkmark"
                    />
                  ) : (
                    <img src={checkmark} alt="check" className="checkmark" />
                  )
                ) : null}
              </div>

              <div
                // className="selectedService"
                className={
                  this.state.hoverNode === service.id
                    ? 'hoverService'
                    : 'selectedService'
                }
                key={service.id}
                onMouseEnter={() => {
                  this.setState({ hoverNode: service.id });
                }}
                onMouseLeave={() => {
                  this.setState({ hoverNode: null });
                }}
                onClick={() => this.selectService(service)}
                style={{
                  alignSelf: 'center',
                  // backgroundColor: 'teal'
                }}>
                {service.service}
              </div>
            </div>
          ))}
          {/*end of MAP*/}
        </div>
      </div>
    );
  }
}
