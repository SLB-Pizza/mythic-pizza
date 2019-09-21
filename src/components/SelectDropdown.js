import React from 'react';
import '../App.css';
import downArrow from '../icons/corner-right-down.svg';
import upArrow from '../icons/corner-right-up.svg';

// props (options, handleSelect, name, insidetext)
export default class SelectDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: this.props.options || [],
      showOptions: false,
      selectedOption: this.props.options && this.props.options[0],
    };
  }

  dropdown = () => {
    this.setState({ showOptions: !this.state.showOptions });
  };

  selectOption = option => {
    this.setState({
      selectedOption: option,
      showOptions: false,
    });
    this.props.handleSelect(option);
  };

  render() {
    return (
      <div className="selectDropdownWrapper" style={{ color: 'white' }}>
        <div
          style={{ display: 'flex', justifyContent: 'space-between' }}
          onClick={this.dropdown}
        >
          {this.state.selectedOption.timing || ''}
          <div className="dropDownArrow" onClick={this.dropdown}>
            {this.state.showOptions ? (
              <img src={upArrow} alt={upArrow} />
            ) : (
              <img src={downArrow} alt={downArrow} />
            )}
          </div>
        </div>
        <div style={{ display: this.state.showOptions ? 'block' : 'none' }}>
          {this.state.options.map(option => (
            <div
              className={
                this.state.selectedOption === option
                  ? 'selectedOption'
                  : 'unselectedOption'
              }
              key={option.id}
              onClick={() => this.selectOption(option)}
            >
              {option.timing}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
