import React, { Fragment } from 'react';
import '../App.css';

export default function TextBox({ onChange, value, name, insideText }) {
  return (
    <div className="textAreaWrapper">
      <div className="textBoxInner">
        {insideText ? <p>{insideText}</p> : <Fragment />}
        <p className="charCounter">{`${0 + value.length}/500`}</p>
      </div>
      <textarea
        className="textarea"
        name={name}
        value={value}
        onChange={onChange}
        maxLength="500"
        required={true}
        style={{ resize: 'none' }}
      ></textarea>
    </div>
  );
}
