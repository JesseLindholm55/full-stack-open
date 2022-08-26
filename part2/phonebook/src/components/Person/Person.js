import React from "react";
import "./Person.css";

const Person = (props) => {
  return (
    <span>
      {props.person.name} {props.person.phone}
    </span>
  );
};

export default Person;
