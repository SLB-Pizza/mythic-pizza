import React from 'react';
import '../App.css';

//<p className="insideText">{`${insideText} ${0 + value.length}/500`}</p>

export default function TextBox({ onChange, value, name, insideText }) {
  return (
    <div
      className="textAreaWrapper"
      style={{ borderColor: value.length > 0 ? 'white' : 'grey' }}
    >
      <div
        className="textBoxInner"
        style={{ color: value.length > 0 ? 'white' : 'grey' }}
      >
        <div className="insideText">{insideText}</div>
        <div className="charCounter">{`${0 + value.length}/500`}</div>
      </div>
      <textarea
        className="textarea"
        name={name}
        value={value}
        onChange={onChange}
        maxLength="500"
        rows="6"
        // required={true}
        style={{ resize: 'none' }}
      ></textarea>
    </div>
  );
}
