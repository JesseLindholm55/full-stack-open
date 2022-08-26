import React from "react";
import "./Person.css";

const Person = (props) => {
  return (
    <span>
      {props.person.name} {props.person.number}
    </span>
  );
};

export default Person;
