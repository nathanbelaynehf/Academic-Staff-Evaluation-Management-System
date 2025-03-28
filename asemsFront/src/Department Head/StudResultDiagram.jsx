import React, { useEffect, useState } from "react";

export default function Instructors({ setSelectedTeacher }) {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);
  const [deptHeadEvaluations, setDeptHeadEvaluations] = useState({});

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      // Fetch instructors (your existing code)
      const instructorResponse = await fetch("http://localhost:8082/dh/Instructor", {
        method: "GET",
        credentials: "include",
      });

      if (!instructorResponse.ok) {
        const errorText = await instructorResponse.text();
        throw new Error(`Failed to fetch instructors: ${errorText || instructorResponse.status}`);
      }

      const instructors = await instructorResponse.json();
      if (!Array.isArray(instructors) || instructors.length === 0) {
        throw new Error("No instructors found.");
      }

      const teacherIds = instructors.map((teacher) => teacher.id);
      if (teacherIds.length === 0) {
        throw new Error("No valid teacher IDs found.");
      }

      // Fetch evaluation results (your existing code)
      const evaluationResponse = await fetch(
        `http://localhost:8082/dh/evaluation-results?teacherIds=${teacherIds.join(",")}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!evaluationResponse.ok) {
        const errorText = await evaluationResponse.text();
        const errorData = JSON.parse(errorText);
        if (errorData.error === "No active evaluation round.") {
          throw new Error(errorData.error);
        } else {
          throw new Error(`Failed to fetch evaluation results: ${errorData.error || evaluationResponse.status}`);
        }
      }

      const evaluationData = await evaluationResponse.json();

      // NEW: Fetch department head evaluations
      const deptHeadEvals = {};
      for (const teacher of instructors) {
        const deptEvalResponse = await fetch(
          `http://localhost:8082/dh/teachers/${teacher.id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        
        if (deptEvalResponse.ok) {
          deptHeadEvals[teacher.id] = await deptEvalResponse.json();
        }
      }
      setDeptHeadEvaluations(deptHeadEvals);

      // Combine instructors with their evaluation results and names (your existing code)
      const teachersWithResults = instructors.map((teacher) => ({
        ...teacher,
        fullName: evaluationData.teacherNames[teacher.username] || teacher.username,
        evaluationResults: evaluationData.evaluationResults[teacher.username] || {},
        deptHeadEvaluation: deptHeadEvals[teacher.id] || {}, // Added department head evaluation
      }));

      setTeachers(teachersWithResults);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="container mt-2">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <h3 className="text-center text-primary fw-bold mb-4 py-3 bg-light border rounded shadow-sm">
        Result of Academic Staff Evaluation
      </h3>

      {teachers.length > 0 ? (
        teachers.map((teacher, index) => {
          // Calculate total score (your existing code)
          const totalScores = Object.values(teacher.evaluationResults || {}).map((criteria) =>
            Object.values(criteria).reduce((sum, score) => sum + score, 0)
          );

          const avgScore =
            totalScores.length > 0
              ? (totalScores.reduce((sum, score) => sum + score, 0) / totalScores.length).toFixed(2)
              : "N/A";

          // Calculate department head evaluation average
          const deptHeadScores = Object.values(teacher.deptHeadEvaluation || {});
          const deptHeadAvg = deptHeadScores.length > 0
            ? (deptHeadScores.reduce((sum, score) => sum + score, 0) ).toFixed(2)
            : "N/A";

          // Calculate combined average
          const combinedAvg = avgScore !== "N/A" && deptHeadAvg !== "N/A"
            ? ((parseFloat(avgScore) + parseFloat(deptHeadAvg)) ).toFixed(2)
            : avgScore !== "N/A" ? avgScore : deptHeadAvg;

          return (
            <div key={index} className="accordion-item border p-3 shadow-sm mb-4">
              <h4 className="accordion-header" id={`heading${index}`}>
                <div className="row">
                  <div className="col-lg-8 col-5">
                    <span className="text-secondary fs-4">{teacher.fullName}</span>
                  </div>
                  <div className="col-lg-3 col-6 text-primary">
                    Total Score: {combinedAvg}
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
                  {/* Your existing student evaluation display */}
                  {teacher.evaluationResults && Object.keys(teacher.evaluationResults).length > 0 ? (
                    <div>
                      {Object.entries(teacher.evaluationResults).map(([courseName, criteria]) => {
                        const totalScore = Object.values(criteria).reduce((sum, score) => sum + score, 0);

                        return (
                          <div key={courseName} className="card shadow-sm mb-3">
                            <div className="card-header bg-primary text-white mt-2">
                              <h5 className="mb-0 d-flex justify-content-between align-items-center">
                                {courseName}
                                <span className="badge bg-secondary">Total Score: {totalScore.toFixed(2)}</span>
                              </h5>
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
                    <p>No evaluation found yet.</p>
                  )}
{/* Average Evaluation for Each Criterion */}
<div className="mt-3 card shadow-sm mb-3">
  <div className="card-header bg-primary text-white mt-2">
    <h5 className="mb-0 d-flex justify-content-between align-items-center">
      Average Student Evaluation
      <span className="badge bg-secondary">Total Average: {avgScore}</span>
    </h5>
  </div>
  <div className="card-body">
    <ul className="list-unstyled">
      {Object.entries(
        Object.values(teacher.evaluationResults || {})
          .flatMap(criteria => Object.entries(criteria))
          .reduce((acc, [criterion, score]) => {
            acc[criterion] = acc[criterion] || [];
            acc[criterion].push(score);
            return acc;
          }, {})
      ).map(([criterion, scores]) => (
        <li key={criterion} className="d-flex justify-content-between py-2">
          <span className="fw-bold">{criterion}</span>
          <span className="text-muted">
            {(scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(2)}
          </span>
        </li>
      ))}
    </ul>
  </div>
</div>

                  {/* NEW: Department Head Evaluation Section */}
                  {teacher.deptHeadEvaluation && Object.keys(teacher.deptHeadEvaluation).length > 0 && (
                    <div className="card shadow-sm mb-3 mt-4">
                      <div className="card-header bg-success text-white">
                        <h5 className="mb-0 d-flex justify-content-between align-items-center">
                          Department Head Evaluation
                          <span className="badge bg-light text-dark">Average: {deptHeadAvg}</span>
                        </h5>
                      </div>
                      <div className="card-body">
                        <ul className="list-unstyled">
                          {Object.entries(teacher.deptHeadEvaluation).map(([criteria, score]) => (
                            <li key={criteria} className="d-flex justify-content-between py-2">
                              <span className="fw-bold">{criteria}</span>
                              <span className="text-muted">{score}</span>
                            </li>
                          ))}
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