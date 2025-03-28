// components/ResultData.js
import React from 'react';
import { useEvaluation } from './EvaluationProvider';


export default function ResultData() {
  const { teachers, error, isLoading } = useEvaluation();

  console.log("Teachers "+teachers);

  if (isLoading) {
    return <div className="text-center mt-4">Loading evaluation data...</div>;
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container-xl mt-1">
      <h3 className="text-center text-primary fw-bold mb-4 py-3 bg-light border rounded shadow-sm">
        Result of Academic Staff Evaluation
      </h3>

      {teachers.length > 0 ? (
        teachers.map((teacher, index) => (
          <div key={index} className="accordion-item border p-3 shadow-sm mb-4 rounded">
            {/* Teacher header */}
            <h4 className="accordion-header" id={`heading${index}`}>
              <div className="row">
                <div className="col-lg-8 col-5">
                  <span className="text-secondary fs-4">{teacher.fname} {teacher.lname}</span>
                </div>
                <div className="col-lg-3 col-6">
                  <span className="text-primary">Total Score: {teacher.combinedTotalAvgScore}</span>
                </div>
                <div className="col-1 text-center">
                  <button
                    className="accordion-button btn"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${index}`}
                    aria-expanded="false"
                    aria-controls={`collapse${index}`}
                    style={{ borderRadius: "8px", fontSize: "18px", fontWeight: "bold", transition: "0.3s" }}
                  >
                    <i className="bi bi-chevron-down"></i>
                  </button>
                </div>
              </div>
            </h4>

            {/* Collapsible content */}
            <div
              id={`collapse${index}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading${index}`}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                {/* Student Evaluations */}
                {teacher.studentEvaluationResults && Object.keys(teacher.studentEvaluationResults).length > 0 ? (
                  <div>
                    <h5 className="mt-3 mb-3">Student Evaluations</h5>
                    {Object.entries(teacher.studentEvaluationResults).map(([courseName, criteria]) => {
                      const totalScore = Object.values(criteria).reduce((sum, score) => sum + score, 0);
                      return (
                        <div key={courseName} className="card shadow-sm mb-3">
                          <div className="card-header bg-primary text-white">
                            <h6 className="mb-0 d-flex justify-content-between align-items-center">
                              {courseName}
                              <span className="badge bg-secondary">Total Score: {totalScore.toFixed(2)}</span>
                            </h6>
                          </div>
                          <div className="card-body">
                            <ul className="list-unstyled">
                              {Object.entries(criteria).map(([criterion, score]) => (
                                <li key={criterion} className="d-flex justify-content-between py-2">
                                  <span className="fw-bold">{criterion}</span>
                                  <span className="text-muted">{score}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p>No student evaluations found.</p>
                )}

                {/* Student Evaluation Averages */}
                {teacher.studentAvgCriteriaScores.length > 0 && (
                  <div className="mt-3 card shadow-sm mb-3">
                    <div className="card-header bg-primary text-white">
                      <h5 className="mb-0 d-flex justify-content-between align-items-center">
                        Student Evaluation Averages
                        <span className="badge bg-secondary">Total Average: {teacher.studentTotalAvgScore}</span>
                      </h5>
                    </div>
                    <div className="card-body">
                      <ul className="list-unstyled">
                        {teacher.studentAvgCriteriaScores.map(({ criterion, avgScore }) => (
                          <li key={criterion} className="d-flex justify-content-between py-2">
                            <span className="fw-bold">{criterion}</span>
                            <span className="text-muted">{avgScore}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Department Evaluations */}
                {teacher.deptEvaluationResults && Object.keys(teacher.deptEvaluationResults).length > 0 ? (
                  <div>
                    <h5>Department Evaluations</h5>
                    {Object.entries(teacher.deptEvaluationResults).map(([department, criteria]) => {
                      const totalScore = Object.values(criteria).reduce((sum, score) => sum + score, 0);
                      return (
                        <div key={department} className="card shadow-sm mb-3">
                          <div className="card-header bg-primary text-white">
                            <h6 className="mb-0 d-flex justify-content-between align-items-center">
                              {department}
                              <span className="badge bg-secondary">Total Score: {totalScore.toFixed(2)}</span>
                            </h6>
                          </div>
                          <div className="card-body">
                            <ul className="list-unstyled">
                              {Object.entries(criteria).map(([criterion, score]) => (
                                <li key={criterion} className="d-flex justify-content-between py-2">
                                  <span className="fw-bold">{criterion}</span>
                                  <span className="text-muted">{score}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p>No department evaluations found.</p>
                )}

                {/* Department Evaluation Averages */}
                {teacher.deptAvgCriteriaScores.length > 0 && (
                  <div className="mt-3 card shadow-sm mb-3">
                    <div className="card-header bg-primary text-white">
                      <h5 className="mb-0 d-flex justify-content-between align-items-center">
                        Department Evaluation Averages
                        <span className="badge bg-secondary">Total Average: {teacher.deptTotalAvgScore}</span>
                      </h5>
                    </div>
                    <div className="card-body">
                      <ul className="list-unstyled">
                        {teacher.deptAvgCriteriaScores.map(({ criterion, avgScore }) => (
                          <li key={criterion} className="d-flex justify-content-between py-2">
                            <span className="fw-bold">{criterion}</span>
                            <span className="text-muted">{avgScore}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Academic Dean Evaluation */}
                {teacher.academicDeanEvaluation && (
                  <div className="card shadow-sm mb-3">
                    <div className="card-header bg-primary text-white">
                      <h5 className="mb-0">Academic Dean Evaluation</h5>
                    </div>
                    <div className="card-body">
                      <p className="fw-bold fs-4">Score: {teacher.academicDeanScore}</p>
                      <p><span className="fw-bold">Comment:</span> {teacher.academicDeanRemark}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center mt-3">No instructors found.</p>
      )}
    </div>
  );
}