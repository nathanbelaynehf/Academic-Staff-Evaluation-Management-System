import React, { useState, useEffect } from 'react';
import AverageEvaluation from './AverageEvaluation';
import StudentData from './StudentData';
import CourseEvaluationdata from './CourseEvaluationdata';

function SMain() {
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvaluationScore = async () => {
      try {
        const response = await fetch('http://localhost:8082/stud/averageevaluation', {
          method: 'GET',
          credentials: 'include', // For session cookies
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setScore(data.overallScore);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching evaluation score:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluationScore();
  }, []);

  return (
    <div>
      <div className="row ms-lg-6 ms-3">
        <div className="col-lg-6">
          <StudentData/>
          <CourseEvaluationdata/>
        </div>
        <div className="col-lg-6 mt-3">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger">Error: {error}</div>
          ) : (
            <AverageEvaluation score={score} />
          )}
        </div>
      </div>
    </div>
  );
}

export default SMain;