import React from 'react'
import TeacherEvaluationScore from './TeacherEvaluationScore'
import TeacherData from './TeacherData'

function TeacherMain() {
  // Sample improvement data
  const suggestedImprovements = [
    { area: "Lecture Organization", score: 3.8, suggestion: "Provide clearer structure for complex topics" },
    { area: "Student Engagement", score: 4.2, suggestion: "Incorporate more interactive activities" },
    { area: "Feedback Quality", score: 3.5, suggestion: "Offer more detailed assignment feedback" },
    { area: "Pacing", score: 4.0, suggestion: "Adjust speed for difficult concepts" }
  ]

  return (
    <>
      <div className="row ms-lg-6 ms-3">
        <div className="col-lg-6">
         <TeacherData/>
              
      <div className="row ms-lg-6 ms-3 mt-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0">
              <h4 className="text-primary">
                <i className="bi bi-lightbulb me-2"></i>
                Suggested Improvements
              </h4>
              <p className="text-muted mb-0">Based on student Evaluation</p>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="bg-light">
                    <tr>
                      <th>Area</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {suggestedImprovements.map((item, index) => (
                      <tr key={index}>
                        <td className="fw-medium">{item.area}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="progress me-2" style={{height: "8px", width: "80px"}}>
                              <div 
                                className="progress-bar" 
                                role="progressbar" 
                                style={{
                                  width: `${(item.score/5)*100}%`,
                                  backgroundColor: getScoreColor((item.score/5)*100)
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
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0">
              <p className="text-muted mb-0">Based on Department Evaluation</p>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="bg-light">
                    <tr>
                      <th>Area</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {suggestedImprovements.map((item, index) => (
                      <tr key={index}>
                        <td className="fw-medium">{item.area}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="progress me-2" style={{height: "8px", width: "80px"}}>
                              <div 
                                className="progress-bar" 
                                role="progressbar" 
                                style={{
                                  width: `${(item.score/5)*100}%`,
                                  backgroundColor: getScoreColor((item.score/5)*100)
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
            </div>
          </div>
        </div>
      </div>
        </div>
        <div className="col-lg-6">
          <TeacherEvaluationScore score={85} />
        </div>
      </div>


    </>
  )
}

// Helper function for score colors
const getScoreColor = (percentage) => {
  if (percentage < 40) return "#ef5350";
  if (percentage < 70) return "#ffb300";
  return "#66bb6a";
}

export default TeacherMain