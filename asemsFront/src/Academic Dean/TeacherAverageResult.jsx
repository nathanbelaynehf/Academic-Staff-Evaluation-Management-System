import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useEvaluation } from './EvaluationProvider';

const TeacherAverageResult = () => {

  const { overallAverage, teachers } = useEvaluation();

  // Color logic
  const getColor = (score) => {
    if (score >= 85) return '#4CAF50';  // Green
    if (score >= 70) return '#2196F3';  // Blue
    return '#FF9800';                   // Orange
  };

  return (
    <div className="card p-3" style={{ maxWidth: '600px' }}>
      <div className="card-body text-center">
        <h5 className="text-muted mb-4">
          <i className="bi bi-people-fill me-2"></i>
          Teachers Average Result
        </h5>
        
        <div style={{ width: '180px', margin: '0 auto 20px' }}>
          <CircularProgressbar
            value={overallAverage}
            text={`${overallAverage}`}
            styles={buildStyles({
              pathColor: getColor(overallAverage),
              textColor: '#333',
              textSize: '32px',
              trailColor: '#f0f0f0',
              pathTransitionDuration: 0.8
            })}
          />
        </div>

        <div className="d-flex justify-content-center align-items-center">
          <span className="badge bg-light text-dark me-2">
            <span className="d-inline-block rounded-circle me-1" 
                  style={{ width: '10px', height: '10px', backgroundColor: getColor(overallAverage) }}></span>
            Overall Score
          </span>
          <span className="text-muted">out of 100</span>
        </div>

        <div className="mt-3 text-center">
          <p className={`mb-0 fw-bold ${overallAverage >= 70 ? 'text-success' : 'text-warning'}`}>
            {overallAverage >= 85 ? 'Excellent Performance' : 
             overallAverage >= 70 ? 'Good Performance' : 'Needs Improvement'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherAverageResult;