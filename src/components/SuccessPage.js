//will be displayed after successful submission of input form

import { Link } from 'react-router-dom';
import React from 'react';

export default function SuccessPage() {
  return (
    <div className="input-page">
      {/*
    ___    __    _____     __
   <  /__ / /_  / ___/__  / /_ ____ _  ___
   / (_-</ __/ / /__/ _ \/ / // /  ' \/ _ \
  /_/___/\__/  \___/\___/_/\_,_/_/_/_/_//_/
  */}
      <div className="vertical-logo-input">
        <p>
          PROJECT<span id="mercury-text-input">MERCURY</span>
        </p>
      </div>
      {/*
     ___          __  _____     __
    |_  |___  ___/ / / ___/__  / /_ ____ _  ___
   / __// _ \/ _  / / /__/ _ \/ / // /  ' \/ _ \
  /____/_//_/\_,_/  \___/\___/_/\_,_/_/_/_/_//_/
  */}
      <div className="closeButtonWrapper">
        <Link to="/">
          <button
            className="closeButton"
            // onClick={() => {
            //   alert('CLOSE CLICKED');
            // }}
          >
            CLOSE
          </button>
        </Link>
        <div className="inputContactInfo">
          <p>office@projectmercury.com</p>
          <p>T 646 861 2827</p>
          <p>324 Lafayette Street</p>
          <p>NY, New York 11201</p>
        </div>
      </div>
      {/*
     ____        __  _____     __
    |_  /_______/ / / ___/__  / /_ ____ _  ___
   _/_ </ __/ _  / / /__/ _ \/ / // /  ' \/ _ \
  /____/_/  \_,_/  \___/\___/_/\_,_/_/_/_/_//_/
  */}
      <div className="requiredWrapper">
        <p>* denotes required field</p>
      </div>
      {/*
    ____ __  __     _____     __
   / / // /_/ /    / ___/__  / /_ ____ _  ___
  /_  _/ __/ _ \  / /__/ _ \/ / // /  ' \/ _ \
   /_/ \__/_//_/  \___/\___/_/\_,_/_/_/_/_//_/
  */}
      <div
        style={{
          backgroundColor: 'black',
          color: 'white',
          flex: 7,
          flexDirection: 'column',
          marginRight: '10vh',
          marginBottom: '10vh',
        }}
      >
        <text>THANK YOU!</text>
        <text>WE'LL BE IN TOUCH.</text>
      </div>
    </div>
  );
}
