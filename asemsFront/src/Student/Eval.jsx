import React, { useEffect, useState } from "react";

function Eval() {
  const [criteria, setCriteria] = useState([]);
  const [evaluations, setEvaluations] = useState({});
  

  // Fetch evaluation criteria
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

  // Handle input changes
  const handleChange = (id, field, value) => {
    setEvaluations((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };
   console.log(evaluations);
  // Submit evaluation
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const evaluationData = Object.keys(evaluations).map((id) => ({
      id: parseInt(id), // Ensure the ID is a number
      score: parseInt(evaluations[id].score), // Ensure the score is a number
      remark: evaluations[id].remark,
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
    <form onSubmit={handleSubmit}>
      {criteria.map((criterion) => (
        <div key={criterion.id}>
          <label>{criterion.name}</label>
          <input
            type="number"
            min="1"
            max="5"
            value={evaluations[criterion.id]?.score || ""}
            onChange={(e) => handleChange(criterion.id, "score", e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Remark"
            value={evaluations[criterion.id]?.remark || ""}
            onChange={(e) => handleChange(criterion.id, "remark", e.target.value)}
          />
        </div>
      ))}
      <button type="submit">Submit Evaluation</button>
    </form>
  );
}

export default Eval;