import React from 'react';
import '../App.css';

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
      <div className="selectDropdownWrapper">
        {this.state.selectedOption.timing || ''}
        <div className="dropDownArrow" onClick={this.dropdown}>
          <span
            className={
              this.state.showOptions
                ? 'selectDropdownArrowUp'
                : 'selectDropdownArrowDown'
            }
          />
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
