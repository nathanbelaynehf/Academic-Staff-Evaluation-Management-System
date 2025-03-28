import React, { useEffect, useState } from "react";

function CriteriaEval({ selectedTeacher }) {
  const [criteria, setCriteria] = useState([]);
  const [evaluations, setEvaluations] = useState({});
  const [activeRound, setActiveRound] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8082/stud/criteria", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setCriteria(data);
        const initialEvaluations = {};
        data.forEach((criterion) => {
          initialEvaluations[criterion.id] = { score: "", remark: "" };
        });
        setEvaluations(initialEvaluations);
      })
      .catch((error) => console.error("Error fetching criteria:", error));

    const fetchActiveRound = async () => {
      try {
        const response = await fetch("http://localhost:8082/stud/round", {
          credentials: "include", // Include credentials (cookies)
        });
        if (!response.ok) {
          throw new Error("Failed to fetch active round");
        }
        const round = await response.json();
        setActiveRound(round);
      } catch (error) {
        console.error("Error fetching active round:", error);
      }
    };

    fetchActiveRound();
  }, []);

  const getOptions = () => {
    switch (activeRound) {
      case 1: // First round
        return [
          { value: "1", label: "Low" },
          { value: "2", label: "Medium" },
          { value: "3", label: "High" },
          { value: "4", label: "Very High" },
        ];
      case 2: // Second round
        return [
          { value: "0.4", label: "Very Low" },
          { value: "0.8", label: "Low" },
          { value: "1.2", label: "Medium" },
          { value: "1.6", label: "High" },
          { value: "2", label: "Very High" },
        ];
      default: // No active round or invalid round
        return [];
    }
  };

  const handleChange = (id, field, value) => {
    setEvaluations((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
      teacherId: selectedTeacher?.id,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Evaluations:", evaluations);

    const evaluationData = Object.keys(evaluations)
      .map((id) => {
        const evaluation = evaluations[id];
        if (!evaluation) {
          console.error(`Evaluation for criterion ID ${id} is undefined.`);
          return null;
        }
        return {
          id: parseInt(id), // Ensure the ID is a number
          score: parseFloat(evaluation.score), // Use parseFloat to preserve decimal values
          remark: evaluation.remark,
          teacherId: selectedTeacher.teacherCourseId,
        };
      })
      .filter(Boolean); // Filter out null entries

    console.log("Evaluation Data:", evaluationData);

    try {
      const response = await fetch("http://localhost:8082/stud/evalsubmit", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(evaluationData),
      });

      if (response.ok) {
        alert("Evaluation submitted successfully!");
        console.log(evaluationData);
      } else {
        const errorData = await response.json();
        alert("Failed to submit evaluation: " + errorData);
      }
    } catch (error) {
      console.error("Error submitting evaluation:", error);
      alert("An error occurred while submitting the evaluation.");
    }
  };

  return (
    <>
      <div className="modal fade" id="evalInst" tabIndex="-1">
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h5 className="modal-title text-secondary">
                Evaluate {selectedTeacher ? selectedTeacher.teacherUsername : "Instructor"}
              </h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {criteria.map((criterion) => (
                  <div key={criterion.id} className="mb-4 row">
                    <label className="col-7 col-form-label">
                      {criterion.name}
                    </label>
                    <div className="col-2">
                      <select
                        id={`score-${criterion.id}`}
                        value={evaluations[criterion.id]?.score || ""}
                        onChange={(e) => handleChange(criterion.id, "score", e.target.value)}
                        required
                        className="form-control"
                      >
                        <option value="" disabled>
                          Score
                        </option>
                        {getOptions().map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-3">
                      <input
                        type="text"
                        placeholder="Remark"
                        className="form-control"
                        value={evaluations[criterion.id]?.remark || ""}
                        onChange={(e) => handleChange(criterion.id, "remark", e.target.value)}
                      />
                    </div>
                  </div>
                ))}

                {/* Submit Button */}
                <div className="text-center">
                  <button type="submit" className="btn btn-primary text-white w-50">
                    Submit Evaluation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CriteriaEval;