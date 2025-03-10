import React, { useEffect, useState } from "react";

function CriteriaEval({ selectedTeacher }) {
  const [criteria, setCriteria] = useState([]);
  const [evaluations, setEvaluations] = useState({});

  useEffect(() => {
    fetch("http://localhost:8082/dh/criteria", { credentials: "include" })
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
  }, []);

  const handleChange = (id, field, value) => {
    setEvaluations((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
      teacherId: selectedTeacher?.id
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const evaluationData = Object.keys(evaluations).map((id) => ({
      id: parseInt(id), // Ensure the ID is a number
      score: parseInt(evaluations[id].score), // Ensure the score is a number
      remark: evaluations[id].remark,
      teacherId: selectedTeacher?.id || null,
    }));
    console.log(evaluationData);

    try {
      const response = await fetch("http://localhost:8082/dh/evalsubmit", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(evaluationData),
      });

      if (response.ok) {
        alert("Evaluation submitted successfully!");
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
              Evaluate {selectedTeacher ? selectedTeacher.username : "Instructor"}</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {criteria.map((criterion) => (
                  <div key={criterion.id} className="mb-4 row">
                    <label className="col-8 col-form-label">
                      {criterion.name}
                    </label>
                    <div className="col-1">
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={evaluations[criterion.id]?.score || ""}
                        onChange={(e) => handleChange(criterion.id, "score", e.target.value)}
                        required
                        className="form-control"
                      />
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
                    {/* <input
                        type="hidden"
                        placeholder="Remark"
                        className="form-control"
                        value={evaluations[criterion.id]?.teacherId || ""}
                        onChange={(e) => handleChange(criterion.id, "teacherId", selectedTeacher.id)}
                      /> */}
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
