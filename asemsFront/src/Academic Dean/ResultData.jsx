import React, { useEffect, useState } from "react";

export default function ResultData() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      // Fetch the list of all instructors
      const instructorResponse = await fetch("http://localhost:8082/ad/teacher", {
        method: "GET",
        credentials: "include",
      });

      if (!instructorResponse.ok) {
        throw new Error(`HTTP error! Status: ${instructorResponse.status}`);
      }

      const instructors = await instructorResponse.json();
      

      // Fetch student evaluation results for all instructors
      const studentEvalResponse = await fetch("http://localhost:8082/ad/evaluation-results/all", {
        method: "GET",
        credentials: "include",
      });

      if (!studentEvalResponse.ok) {
        throw new Error(`HTTP error! Status: ${studentEvalResponse.status}`);
      }

      const studentEvalResults = await studentEvalResponse.json();
     
      // Fetch department head evaluation results for all instructors
      const teachersWithDeptEvals = await Promise.all(
        instructors.map(async (teacher) => {
          const deptEvalResponse = await fetch(`http://localhost:8082/ad/department-evaluations/${teacher.id}`, {
            method: "GET",
            credentials: "include",
          });

          if (!deptEvalResponse.ok) {
            throw new Error(`HTTP error! Status: ${deptEvalResponse.status}`);
          }

          const deptEvalResults = await deptEvalResponse.json();

           // Fetch Academic Dean evaluation for the teacher
           const academicDeanEvalResponse = await fetch(`http://localhost:8082/ad/adeval/${teacher.id}`, {
            method: "GET",
            credentials: "include",
          });

          if (!academicDeanEvalResponse.ok) {
            throw new Error(`HTTP error! Status: ${academicDeanEvalResponse.status}`);
          }

          const academicDeanEval = await academicDeanEvalResponse.json();
          return {
            ...teacher,
            studentEvaluationResults: studentEvalResults[teacher.username] || {},
            deptEvaluationResults: deptEvalResults,
            academicDeanEvaluation: academicDeanEval,
          };
        })
      );
      console.log(teachersWithDeptEvals);

      setTeachers(teachersWithDeptEvals);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container mt-4">
      {teachers.length > 0 ? (
        teachers.map((teacher, index) => {
          // Calculate average scores for student evaluations
          const studentCriteriaScores = {};
          Object.values(teacher.studentEvaluationResults || {}).forEach(criteria => {
            Object.entries(criteria).forEach(([criterion, score]) => {
              if (!studentCriteriaScores[criterion]) {
                studentCriteriaScores[criterion] = [];
              }
              studentCriteriaScores[criterion].push(score);
            });
          });
          

          const studentAvgCriteriaScores = Object.entries(studentCriteriaScores).map(([criterion, scores]) => ({
            criterion,
            avgScore: (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(2),
          }));

          const studentTotalAvgScore = studentAvgCriteriaScores.reduce((sum, { avgScore }) => sum + parseFloat(avgScore), 0).toFixed(2);

          // Calculate average scores for department evaluations
          const deptCriteriaScores = {};
          Object.values(teacher.deptEvaluationResults || {}).forEach(department => {
            Object.entries(department).forEach(([criterion, score]) => {
              if (!deptCriteriaScores[criterion]) {
                deptCriteriaScores[criterion] = [];
              }
              deptCriteriaScores[criterion].push(score);
            });
          });

          const deptAvgCriteriaScores = Object.entries(deptCriteriaScores).map(([criterion, scores]) => ({
            criterion,
            avgScore: (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(2),
          }));

          const deptTotalAvgScore = deptAvgCriteriaScores.reduce((sum, { avgScore }) => sum + parseFloat(avgScore), 0).toFixed(2);

          const academicDeanScore = teacher.academicDeanEvaluation?.[0]?.score || 0;
          const academicDeanRemark=teacher.academicDeanEvaluation?.[0]?.remark || 0;

        
          // Combined total average score for the accordion header
          const combinedTotalAvgScore = (parseFloat(studentTotalAvgScore) + parseFloat(deptTotalAvgScore)+parseFloat(academicDeanScore)).toFixed(2);

          return (
            <div key={index} className="accordion-item border p-3 shadow-sm mb-5">
              <h4 className="accordion-header" id={`heading${index}`}>
                <div className="row">
                  <div className="col-11">
                    <span>{teacher.username} (Combined Total Average: {combinedTotalAvgScore})</span>
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
                        // Calculate total score for each course
                        const totalScore = Object.values(criteria).reduce((sum, score) => sum + score, 0);

                        return (
                          <div key={courseName} className="card shadow-sm mb-3">
                            <div className="card-header bg-primary text-white">
                              <h6 className="mb-0 d-flex justify-content-between align-items-center">
                                {courseName}
                                <span className="badge bg-secondary">Total Score: {totalScore}</span>
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
                   {studentAvgCriteriaScores.length > 0 && (
                    <div className="mt-3 card shadow-sm mb-3">
                      <div className="card-header bg-info text-white">
                        <h5 className="mb-0 d-flex justify-content-between align-items-center">
                          Student Evaluation Averages
                          <span className="badge bg-secondary">Total Average: {studentTotalAvgScore}</span>
                        </h5>
                      </div>
                      <div className="card-body">
                        <ul className="list-unstyled">
                          {studentAvgCriteriaScores.map(({ criterion, avgScore }) => (
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
                        // Calculate total score for each department
                        const totalScore = Object.values(criteria).reduce((sum, score) => sum + score, 0);

                        return (
                          <div key={department} className="card shadow-sm mb-3">
                            <div className="card-header bg-success text-white">
                              <h6 className="mb-0 d-flex justify-content-between align-items-center">
                                {department}
                                <span className="badge bg-secondary">Total Score: {totalScore}</span>
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
                  {deptAvgCriteriaScores.length > 0 && (
                    <div className="mt-3 card shadow-sm mb-3">
                      <div className="card-header bg-warning text-white">
                        <h5 className="mb-0 d-flex justify-content-between align-items-center">
                          Department Evaluation Averages
                          <span className="badge bg-secondary">Total Average: {deptTotalAvgScore}</span>
                        </h5>
                      </div>
                      <div className="card-body">
                        <ul className="list-unstyled">
                          {deptAvgCriteriaScores.map(({ criterion, avgScore }) => (
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
                      <div className="card-header bg-danger text-white">
                        <h5 className="mb-0">Academic Dean Evaluation</h5>
                      </div>
                      <div className="card-body">
                        <ul className="list-unstyled">
                          <li className="d-flex justify-content-between py-2">
                            <span className="fw-bold fs-4">Score {academicDeanScore}</span>
                            <br />
                            <p> {academicDeanRemark}</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center mt-3">No instructors found.</p>
      )}
    </div>
  );
}