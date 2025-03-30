import React, { useState, useEffect } from 'react';

function CourseEvaluationdata() {
  const [evaluationStatus, setEvaluationStatus] = useState({
    totalEnrolled: 0,
    totalEvaluated: 0,
    unevaluatedCourses: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvaluationStatus = async () => {
      try {
        const response = await fetch('http://localhost:8082/stud/evaluation-status', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setEvaluationStatus(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching evaluation status:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluationStatus();
  }, []);

  if (loading) {
    return (
      <div className="row ms-lg-6 ms-3 mt-4">
        <div className="col-12 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading evaluation data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="row ms-lg-6 ms-3 mt-4">
        <div className="col-12 alert alert-danger">
          Error loading evaluation data: {error}
        </div>
      </div>
    );
  }

  const completionPercentage = evaluationStatus.totalEnrolled > 0 
    ? Math.round((evaluationStatus.totalEvaluated / evaluationStatus.totalEnrolled) * 100)
    : 0;

  return (
    <div className="row ms-lg-6 ms-3 mt-4">
      <div className="col-12">
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <h4 className="text-primary mb-4">
              <i className="bi bi-journal-bookmark me-2"></i>
              Course Evaluation Status
            </h4>
            
            {/* Summary Cards */}
            <div className="row mb-4">
              <div className="col-md-4 mb-3 mb-md-0">
                <div className="card bg-light border-0 p-3">
                  <h5 className="text-muted mb-2">Total Courses</h5>
                  <h3 className="text-primary">{evaluationStatus.totalEnrolled}</h3>
                </div>
              </div>
              <div className="col-md-4 mb-3 mb-md-0">
                <div className="card bg-light border-0 p-3">
                  <h5 className="text-muted mb-2">Evaluated</h5>
                  <h3 className="text-success">{evaluationStatus.totalEvaluated}</h3>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-light border-0 p-3">
                  <h5 className="text-muted mb-2">Completion</h5>
                  <div className="progress" style={{ height: '24px' }}>
                    <div 
                      className="progress-bar bg-success" 
                      role="progressbar" 
                      style={{ width: `${completionPercentage}%` }}
                      aria-valuenow={completionPercentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {completionPercentage}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Unevaluated Courses Table */}
            {evaluationStatus.unevaluatedCourses.length > 0 && (
              <div className="mt-4">
                <h5 className="text-danger mb-3">
                  <i className="bi bi-exclamation-circle me-2"></i>
                  Courses Pending Evaluation
                </h5>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Course Name</th>
                        <th>Instructor</th>
                       
                      </tr>
                    </thead>
                    <tbody>
                      {evaluationStatus.unevaluatedCourses.map((course, index) => (
                        <tr key={index}>
                          <td className="fw-medium">{course.courseName}</td>
                          <td>
                            <span className="badge bg-primary bg-opacity-10 text-primary">
                              <i className="bi bi-person-fill me-1"></i>
                              {course.teacherName}
                            </span>
                          </td>
                    
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {evaluationStatus.totalEvaluated === evaluationStatus.totalEnrolled && (
              <div className="alert alert-success mt-3">
                <i className="bi bi-check-circle-fill me-2"></i>
                You have completed all your course evaluations for this semester!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseEvaluationdata;