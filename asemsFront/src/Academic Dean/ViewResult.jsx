import React from 'react'
import AdNav from './AdNav'
import ResultData from './ResultData'
import { EvaluationProvider } from './EvaluationProvider'

function ViewResult() {
  return (
    <>
    <AdNav/>
    <EvaluationProvider>
    <ResultData/>
    </EvaluationProvider>
    </>
  )
}

export default ViewResult