import React from "react";

const Part = (props4) => {
  let finalArray = [];
  //let exercisesTotal = 0
  for (let i = 0; i < props4.array.length; i++) {
    const element = props4.array[i];
    finalArray.push(
      <div key={i}>
        {element.name} {element.exercises}
      </div>
    );
    // exercisesTotal = exercisesTotal + element.exercises
  }

  const sum = props4.array.reduce(function (sum, number) {
    const updatedSum = sum + number.exercises;
    return updatedSum;
  }, 0);

  return (
    <div>
      <div>{finalArray}</div>
      <div style={{ fontWeight: "bold" }}>Total of {sum} exercises</div>
    </div>
  );
};

export default Part;
