import React from "react";
import "../App.css";

//<p className="insideText">{`${insideText} ${0 + value.length}/500`}</p>

export default function TextBox({ onChange, value, name, insideText }) {
  return (
    <div
      className="text-box"
      style={{ borderColor: value.length > 0 ? "white" : "grey" }}
    >
      <div
        className="text-box-details is-flex"
        // style={{ color: value.length > 0 ? "white" : "grey" }}
      >
        <div className="text-box-description">{insideText}</div>
        <div className="text-box-char-count">{`${0 + value.length}/500`}</div>
      </div>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        maxLength="500"
        rows="6"
        // required={true}
        style={{ resize: "none" }}
      />
    </div>
  );
}
