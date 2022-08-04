import React from 'react';
import Content from '../Content/Content.js';
import Header from '../Header/Header.js';

const Course = (props) => {
  let courses = []
  for (let i = 0; i < props.course.length; i++) {
    let key = "courses " + i
    const element = props.course[i];
    courses.push(
    <div key={key}>
      <Header name={element.name}/>
      <Content parts={element.parts}/>
    </div>)
    
  }
  return (
    <div>
      {courses}
    </div>
  )
}

export default Course;
