import React from "react";
import { Cards } from "./styled.js";
// icons
import classPic from '../../images/icons/classes.png'
import studentsPic from '../../images/icons/students.png'
import tutorsPic from '../../images/icons/tutors.png'
import subjectsPic from '../../images/icons/subjects.png'
import graphPic from '../../images/icons/graph.svg'

function selectIcon(name){
  switch(name){
    case 'classes':
      return classPic
    case 'students':
      return studentsPic
    case 'tutors':
      return tutorsPic
    default:
      return subjectsPic
  }
}

export default function CardInfo({x}) {
  return (
    <Cards>
      <div className="wrap-icon">
        <div className="icon">
          <img src={selectIcon(x.name)} alt={x.name} />
        </div>
      </div>
      <div className="wrap-content">
        <h1>{x.name[0].toUpperCase() + x.name.slice(1)}</h1>
        <span>{x.count}</span>
        <img className="graph" src={graphPic} alt="graph" />
      </div>
    </Cards>
  );
}
