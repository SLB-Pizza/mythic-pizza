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

      <div class="columns is-vcentered">
        <div class="column is-8">
          <p class="bd-notification is-primary">First column</p>
        </div>
        <div class="column">
          <p class="bd-notification is-primary">
            Second column with more content. This is so you can see the vertical
            alignment.
          </p>
        </div>
      </div>

      <div class="columns">
        <div class="column is-four-fifths">is-four-fifths</div>
        <div class="column">Auto</div>
        <div class="column">Auto</div>
      </div>

      <div class="columns">
        <div class="column is-three-quarters">is-three-quarters</div>
        <div class="column">Auto</div>
        <div class="column">Auto</div>
      </div>

      <div class="columns">
        <div class="column is-two-thirds">is-two-thirds</div>
        <div class="column">Auto</div>
        <div class="column">Auto</div>
      </div>

      <div class="columns">
        <div class="column is-three-fifths">is-three-fifths</div>
        <div class="column">Auto</div>
        <div class="column">Auto</div>
      </div>

      <div class="columns">
        <div class="column is-half">is-half</div>
        <div class="column">Auto</div>
        <div class="column">Auto</div>
      </div>

      <div class="columns">
        <div class="column is-two-fifths">is-two-fifths</div>
        <div class="column">Auto</div>
        <div class="column">Auto</div>
      </div>

      <div class="columns">
        <div class="column is-one-third">is-one-third</div>
        <div class="column">Auto</div>
        <div class="column">Auto</div>
      </div>

      <div class="columns">
        <div class="column is-one-quarter">is-one-quarter</div>
        <div class="column">Auto</div>
        <div class="column">Auto</div>
      </div>

      <div class="columns">
        <div class="column is-one-fifth">is-one-fifth</div>
        <div class="column">Auto</div>
        <div class="column">Auto</div>
      </div>

      <p>You clicked {count} times</p>
      <button className="button is-primary" onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default BulmaTestPage;
