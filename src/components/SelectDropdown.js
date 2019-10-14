import React from 'react';
import downArrow from '../imgs/dropdownArrow-Sketch.svg';
import upArrow from '../imgs/dropdownUpArrow-Sketch.svg';

import downArrow4k from '../imgs/dropdownArrow-Sketch-4k.svg';
import upArrow4k from '../imgs/dropdownUpArrow-Sketch-4k.svg';

// props (options, handleSelect, name, insidetext)
export default class SelectDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: this.props.options || [],
      showOptions: false,
      selectedOption: this.props.options && this.props.options[0],
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
    this.setState({ showOptions: false });
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
      <div
        className={
          this.state.showOptions
            ? 'dropdown-wrapper-no-border'
            : 'dropdown-wrapper'
        }
        ref={node => (this.node = node)}>
        <div className="selected-option" onClick={this.dropdown}>
          {this.state.selectedOption.timing || ''}
          <div className="dropdown-arrow" onClick={this.dropdown}>
            {this.state.showOptions ? (
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
          className="dropdown-options"
          style={{ display: this.state.showOptions ? 'contents' : 'none' }}>
          {this.state.options.map(option => (
            <div
              className={
                this.state.selectedOption === option ||
                this.state.hoverNode === option.id
                  ? 'selected-option'
                  : 'unselected-option'
              }
              key={option.id}
              onMouseEnter={() => {
                this.setState({ hoverNode: option.id });
              }}
              onMouseLeave={() => {
                this.setState({ hoverNode: null });
              }}
              onClick={() => this.selectOption(option)}>
              {option.timing}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
