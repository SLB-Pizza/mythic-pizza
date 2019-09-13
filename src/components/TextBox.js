import React, { Fragment, useState } from 'react';
import '../App.css';

export default function TextBox({ onChange, value, name }) {
  return (
    <div className="textAreaWrapper">
      <text>004. COMPANY DESCRIPTION*</text>
      <p className="charCounter">{`${0 + value.length}/500`}</p>
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
