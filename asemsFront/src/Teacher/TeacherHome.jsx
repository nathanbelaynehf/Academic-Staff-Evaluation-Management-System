import React from 'react'
import TeacherNav from './TeacherNav'
import TeacherMain from './TeacherMain'
import { EvaluationProvider } from './EvaluationContext'

function TeacherHome() {
  return (
    <>
    <TeacherNav/>
    <EvaluationProvider>
    <TeacherMain/>
    </EvaluationProvider>
    </>
  )
}

export default TeacherHome