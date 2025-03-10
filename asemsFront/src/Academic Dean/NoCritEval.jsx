import React, { useState } from 'react';

function NoCritEval({ selectedTeacher }) {
  const [remark, setRemark] = useState('');
  const [score, setScore] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate score and remark
    if (score === 0 || remark.trim() === '') {
      alert('Please provide a valid score and remark.');
      return;
    }

    const evaluationData = {
      score: score,
      remark: remark,
      teacherId: selectedTeacher.id,
    };
  console.log(evaluationData);
    try {
      const response = await fetch('http://localhost:8082/ad/evalsubmit', {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
      
        body: JSON.stringify(evaluationData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit evaluation');
      }

      const responseData = await response.json();
      alert('Evaluation submitted successfully');
      console.log('Response:', responseData);
    } catch (error) {
      console.error('Error submitting evaluation:', error);
      alert('There was an error submitting the evaluation.');
    }
  };

  return (
    <>
      <div className="modal fade" id="evalTeach" tabIndex="-1">
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <div className="d-flex justify-content-center w-100">
                <h5 className="modal-title text-secondary">
                  Evaluate {selectedTeacher ? selectedTeacher.username : 'Instructor'}
                </h5>
              </div>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            {/* Modal Body (Centered Content) */}
            <div className="modal-body d-flex flex-column align-items-center text-center">
              <form className="w-75" onSubmit={handleSubmit}>
                {/* Remark Input */}
                <div className="mb-3">
                  <label className="form-label">Evaluation</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Write your message here..."
                    required
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                  />
                </div>

                {/* Score Input */}
                <div className="mb-3">
                  <label className="form-label">Enter Score out of 30</label>
                  <div className="d-flex justify-content-center">
                    <input
                      type="number"
                      min="0"
                      max="30"
                      className="form-control text-center w-25"
                      required
                      value={score}
                      onChange={(e) => setScore(parseInt(e.target.value))}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button type="submit" className="text-white btn btn-primary">
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

export default NoCritEval;
