import React from 'react';

import TeacherEvaluationScore from './TeacherEvaluationScore';
import TeacherData from './TeacherData';
import { useEvaluation } from './EvaluationContext';
import Improvements from './Improvements';

function TeacherMain() {
  // Get the totalSum from context
  const { totalSum } = useEvaluation();



  return (
    <>
      <div className="row ms-lg-6 ms-3">
        <div className="col-lg-6">
          <TeacherData/>
          <Improvements/> 
          
        </div>
        <div className="col-lg-6">
          <TeacherEvaluationScore score={totalSum.toFixed(2)} />
        </div>
      </div>
    </>
  );
}



export default TeacherMain;