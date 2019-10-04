import React from "react";
import "../App.css";

export default function TextBox({ onChange, value, name, insideText, mobile }) {
  return (
    <div
      className="text-box"
      style={{ borderColor: value.length > 0 ? "white" : "grey" }}
    >
      {mobile ? (
        <div className="text-box-details is-flex">
          <div className="text-box-description" id="mobile">
            {insideText}
          </div>
          <div className="text-box-char-count" id="mobile">{`${0 +
            value.length}/500`}</div>
        </div>
      ) : (
        <div className="text-box-details is-flex">
          <div className="text-box-description">{insideText}</div>
          <div className="text-box-char-count">{`${0 + value.length}/500`}</div>
        </div>
      )}

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        maxLength="500"
        rows="6"
        style={{ resize: "none" }}
      />
    </div>
  );
}
