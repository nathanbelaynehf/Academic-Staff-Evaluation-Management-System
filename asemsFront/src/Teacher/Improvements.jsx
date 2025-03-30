import React from 'react';
import { useEvaluation } from './EvaluationContext';

function Improvements() {
  const { 
    studentLowScores,
    departmentLowScores,
    activeRound,
    loading,
    error
  } = useEvaluation();

  // Helper function for score colors
  const getScoreColor = (percentage) => {
    if (percentage < 40) return "#ef5350";
    if (percentage < 70) return "#ffb300";
    return "#66bb6a";
  };

  if (loading) {
    return <div className="text-center py-4">Loading evaluation data...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="row ms-lg-6 ms-3 mt-4">
      <div className="col-12">
        {/* Student Low Scores */}
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0">
            <h4 className="text-primary">
              <i className="bi bi-lightbulb me-2"></i>
              Areas Needing Improvement (Round {activeRound})
            </h4>
            <p className="text-muted mb-0">
              Student Evaluation Criteria Below Medium
            </p>
          </div>
          <div className="card-body">
            {studentLowScores.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="bg-light">
                    <tr>
                      <th>Course</th>
                      <th>Criteria</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentLowScores.map((item, index) => (
                      <tr key={`student-${index}`}>
                        <td className="fw-medium">{item.source}</td>
                        <td>{item.criteria}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="progress me-2" style={{height: "8px", width: "80px"}}>
                              <div 
                                className="progress-bar" 
                                role="progressbar" 
                                style={{
                                  width: `${(item.score/(activeRound === 1 ? 4 : 2))*100}%`,
                                  backgroundColor: getScoreColor((item.score/(activeRound === 1 ? 4 : 2))*100)
                                }}
                              ></div>
                            </div>
                            <span className="fw-bold">{item.score.toFixed(1)}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="alert alert-success">
                No student evaluation criteria below threshold for this round.
              </div>
            )}
          </div>
        </div>

        {/* Department Low Scores */}
        <div className="card border-0 shadow-sm mt-4">
          <div className="card-header bg-white border-0">
            <h4 className="text-primary">
              <i className="bi bi-lightbulb me-2"></i>
              Areas Needing Improvement (Round {activeRound})
            </h4>
            <p className="text-muted mb-0">
              Department Evaluation Criteria Below Medium
            </p>
          </div>
          <div className="card-body">
            {departmentLowScores.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="bg-light">
                    <tr>
                      <th>Department</th>
                      <th>Criteria</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentLowScores.map((item, index) => (
                      <tr key={`dept-${index}`}>
                        <td className="fw-medium">{item.source}</td>
                        <td>{item.criteria}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="progress me-2" style={{height: "8px", width: "80px"}}>
                              <div 
                                className="progress-bar" 
                                role="progressbar" 
                                style={{
                                    width: `${(item.score / (activeRound === 1 ? 3 : 1.579)) * 100}%`,
                                  backgroundColor: getScoreColor((item.score/(activeRound === 1 ? 3 : 1.579))*100)
                                }}
                              ></div>
                            </div>
                            <span className="fw-bold">{item.score.toFixed(1)}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="alert alert-success">
                No department evaluation criteria below threshold for this round.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Improvements;