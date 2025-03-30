import React from 'react'
import TeacherNav from './TeacherNav'
import ResultDiagram from './ResultDiagram'
import { EvaluationProvider } from './EvaluationContext'



function EvalResult() {
  return (
    <>
    <TeacherNav/>
     <EvaluationProvider> 
    <ResultDiagram/>
    </EvaluationProvider> 
    </>
  )
}

export default EvalResult