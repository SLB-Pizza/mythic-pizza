import React, { Fragment, useState } from 'react';
import '../App.css';

export default function TextBox({ onChange, value, name }) {
  const [charCount, setCharCount] = useState(0);

  return (
    <Fragment>
      <textarea
        className="textarea"
        name={name}
        value={value}
        onChange={onChange}
        maxLength="500"
        required={true}
        style={{ resize: 'none' }}
      ></textarea>
      <p>{`${0 + value.length}/500`}</p>
    </Fragment>
  );
}
