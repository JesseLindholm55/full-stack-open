import React, { useState } from "react";
import SingleCountry from "../SingleCountry/SingleCountry";
import "./Country.css";

const Country = (props) => {
  const [showAdditional, setShowAdditional] = useState(false);

  return (
    <div className="Country">
      {props.country.name.common}
      <button onClick={() => setShowAdditional(!showAdditional)}>
        show/hide
      </button>
      {showAdditional ? <SingleCountry country={props.country} /> : null}
    </div>
  );
};

export default Country;
