import React, { useEffect, useState } from "react";

export default function Instructors({ setSelectedTeacher }) {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
        // Fetch instructors
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

        // Fetch evaluation results
        const evaluationResponse = await fetch(`http://localhost:8082/dh/evaluation-results?teacherIds=${teacherIds.join(",")}`, {
            method: "GET",
            credentials: "include",
        });

        if (!evaluationResponse.ok) {
            const errorText = await evaluationResponse.text();
            const errorData = JSON.parse(errorText);

            // Check if the backend returned a specific error message like "No active evaluation round"
            if (errorData.error === "No active evaluation round.") {
                throw new Error(errorData.error);  // Throw only the specific error message
            } else {
                throw new Error(`Failed to fetch evaluation results: ${errorData.error || evaluationResponse.status}`);
            }
        }

        const evaluationResults = await evaluationResponse.json();

        // Combine instructors with their evaluation results
        const teachersWithResults = instructors.map((teacher) => ({
            ...teacher,
            evaluationResults: evaluationResults[teacher.username] || {},
        }));

        setTeachers(teachersWithResults);

    } catch (error) {
        console.error("Error fetching data:", error.message);
        alert(error.message); // Show error in an alert or display on UI
    }
};

  return (
    <div className="container mt-4">
      {teachers.length > 0 ? (
        teachers.map((teacher, index) => {
          // Extract all total scores from course evaluations
          const totalScores = Object.values(teacher.evaluationResults || {}).map(criteria =>
            Object.values(criteria).reduce((sum, score) => sum + score, 0)
          );

          // Calculate the overall average score for the instructor
          const avgScore = totalScores.length > 0
            ? (totalScores.reduce((sum, score) => sum + score, 0) / totalScores.length).toFixed(2)
            : "N/A";

          // Store all criteria scores in a map { "Punctuality": [90, 85, ...], "Teaching Skill": [80, 75, ...] }
          const criteriaScores = {};

          Object.values(teacher.evaluationResults || {}).forEach(criteria => {
            Object.entries(criteria).forEach(([criterion, score]) => {
              if (!criteriaScores[criterion]) {
                criteriaScores[criterion] = [];
              }
              criteriaScores[criterion].push(score);
            });
          });

          // Calculate the average score for each criterion
          const avgCriteriaScores = Object.entries(criteriaScores).map(([criterion, scores]) => ({
            criterion,
            avgScore: (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(2)
          }));

          return (
            <div key={index} className="accordion-item border p-3 shadow-sm mb-4">
              <h4 className="accordion-header" id={`heading${index}`}>
                <div className="row">
              <div className="col-11">
                    <span>{teacher.username} (Total Score: {avgScore})</span>
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
                  {/* Course Evaluations */}
                  {teacher.evaluationResults && Object.keys(teacher.evaluationResults).length > 0 ? (
                    <div>
                      {Object.entries(teacher.evaluationResults).map(([courseName, criteria]) => {
                        // Calculate total score for each course
                        const totalScore = Object.values(criteria).reduce((sum, score) => sum + score, 0);

                        return (
                          <div key={courseName} className="card shadow-sm mb-3">
                          <div className="card-header bg-primary text-white mt-2">
                            <h5 className="mb-0 d-flex justify-content-between align-items-center">
                              {courseName}
                              <span className="badge bg-secondary">Total Score: {totalScore}</span>
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

                      {/* Average Evaluation for Each Criterion */}
                      <div className="mt-3 card shadow-sm mb-3">
                        <div className="card-header bg-primary text-white mt-2">
                        <h5 className="mb-0 d-flex justify-content-between align-items-center">Average Evaluation</h5>
                        </div>
                        <div className="card-body">
                            <ul className="list-unstyled">
                          {avgCriteriaScores.map(({ criterion, avgScore }) => (
                            <li key={criterion}  className="d-flex justify-content-between py-2">
                             <span className="fw-bold"> {criterion}</span> 
                             <span className="text-muted"> {avgScore}</span>
                            </li>
                          ))}
                        </ul>
                  
                          </div>
                      </div>
                    </div>
                  ) : (
                    <p>No evaluation found yet.</p>
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
