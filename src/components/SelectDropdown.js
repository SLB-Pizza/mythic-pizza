import React from 'react';
import '../App.css';
import downArrow from '../imgs/dropdownArrow-Sketch.svg';
import upArrow from '../imgs/dropdownUpArrow-Sketch.svg';

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
        className="selectDropdownWrapper"
        style={{ color: 'white' }}
        ref={node => (this.node = node)}>
        <div
          style={{ display: 'flex', justifyContent: 'space-between' }}
          onClick={this.dropdown}>
          {this.state.selectedOption.timing || ''}
          <div className="dropDownArrow" onClick={this.dropdown}>
            {this.state.showOptions ? (
              <img src={upArrow} alt={upArrow} />
            ) : (
              <img src={downArrow} alt={downArrow} />
            )}
          </div>
        </div>
        <div style={{ display: this.state.showOptions ? 'contents' : 'none' }}>
          {this.state.options.map(option => (
            <div
              className={
                this.state.selectedOption === option ||
                this.state.hoverNode === option.id
                  ? 'selectedOption'
                  : 'unselectedOption'
              }
              key={option.id}
              // ref={node => (this.node = node)}
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
