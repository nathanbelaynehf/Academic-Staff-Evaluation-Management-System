import React, { useState } from 'react'
import StudNav from './StudNav'
import List from './List'
import CriteriaEval from './CriteriaEval'

function Instrctors() {
  const [selectedTeacher, setSelectedTeacher] = useState("");
  return (
    <>
    <StudNav/>
    <List setSelectedTeacher={setSelectedTeacher}/>
    <CriteriaEval selectedTeacher={selectedTeacher}/>
    </>
  )
}

export default Instrctors