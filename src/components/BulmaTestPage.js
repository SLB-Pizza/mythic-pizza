import React, { useState } from "react";

function BulmaTestPage() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <h1 className="title">Bulma</h1>
      <p className="subtitle">
        Modern CSS framework based on
        <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox">
          Flexbox
        </a>
      </p>

      <div className="field">
        <div className="control">
          <input className="input" type="text" placeholder="Input" />
        </div>
      </div>

      <div className="field">
        <p className="control">
          <span className="select">
            <select>
              <option>Select dropdown</option>
            </select>
          </span>
        </p>
      </div>

      <div className="columns is-vcentered">
        <div className="column is-8" id="test-color">
          <p className="bd-notification is-primary">First column</p>
        </div>
        <div className="column">
          <p className="bd-notification is-primary">
            Second column with more content. This is so you can see the vertical
            alignment in action. IS-VCENTERED is how you make sure everything is
            vcentered in columns.
          </p>
        </div>
      </div>

      <div className="columns">
        <div className="column is-four-fifths" id="test-color">
          is-four-fifths
        </div>
        <div className="column">Auto</div>
        <div className="column">Auto</div>
      </div>

      <div className="columns">
        <div className="column is-three-quarters" id="test-color">
          is-three-quarters
        </div>
        <div className="column">Auto</div>
        <div className="column">Auto</div>
      </div>

      <div className="columns">
        <div className="column is-two-thirds" id="test-color">
          is-two-thirds
        </div>
        <div className="column">Auto</div>
        <div className="column">Auto</div>
      </div>

      <div className="columns">
        <div className="column is-three-fifths" id="test-color">
          is-three-fifths
        </div>
        <div className="column">Auto</div>
        <div className="column">Auto</div>
      </div>

      <div className="columns">
        <div className="column is-half" id="test-color">
          is-half
        </div>
        <div className="column">Auto</div>
        <div className="column">Auto</div>
      </div>

      <div className="columns">
        <div className="column is-two-fifths" id="test-color">
          is-two-fifths
        </div>
        <div className="column">Auto</div>
        <div className="column">Auto</div>
      </div>

      <div className="columns">
        <div className="column is-one-third" id="test-color">
          is-one-third
        </div>
        <div className="column">Auto</div>
        <div className="column">Auto</div>
      </div>

      <div className="columns">
        <div className="column is-one-quarter" id="test-color">
          is-one-quarter
        </div>
        <div className="column">Auto</div>
        <div className="column">Auto</div>
      </div>

      <div className="columns">
        <div className="column is-one-fifth" id="test-color">
          is-one-fifth
        </div>
        <div className="column">Auto</div>
        <div className="column">Auto</div>
      </div>

      <p>You clicked {count} times</p>
      <button className="button is-primary" onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default BulmaTestPage;
