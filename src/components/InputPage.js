import React from 'react';
import '../App.css';

class InputPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (event, label) => {
    this.setState({ label: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return <div>TEST</div>;
  }
}

export default InputPage;
