import React, { useState } from 'react'
import DepNav from './DepNav'
import Instructors from './Instructors'
import CriteriaEval from './CriteriaEval'

function Evaluation() {

    const [selectedTeacher, setSelectedTeacher] = useState("");
    console.log("Selected Teacher:", selectedTeacher);

  return (
    <>
    
    <DepNav/>
    <Instructors setSelectedTeacher={setSelectedTeacher}/>
    <CriteriaEval selectedTeacher={selectedTeacher}/>
    </>
  )
}

export default Evaluation