import React from 'react';
import DeanData from './DeanData';
import DepartmentEvaluations from './DepartmentEvaluations';
import TeacherAverageResult from './TeacherAverageResult';
import ResultData from './ResultData';
import { EvaluationProvider } from './EvaluationProvider';

function AdMainContent() {
  // This component doesn't need to use useEvaluation directly
  return (
    <div className="row ms-lg-6 ms-3">
      <div className="col-lg-6">
        <DeanData/>
        <DepartmentEvaluations/>
      </div>
      <div className="col-lg-6 mt-4">
        <TeacherAverageResult />
      </div>
    </div>
  );
}

export default function AdMain() {
  return (
    <EvaluationProvider>
      <AdMainContent />
    </EvaluationProvider>
  );
}