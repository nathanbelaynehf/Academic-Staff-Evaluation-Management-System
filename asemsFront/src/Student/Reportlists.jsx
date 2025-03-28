import React, { useEffect, useState } from 'react';

function Reportlist() {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEnrollment, setSelectedEnrollment] = useState([]);
    const [latestReport, setLatestReport] = useState([]);
    const [evaluations, setEvaluations] = useState([]);

    useEffect(() => {
        // Fetch student enrollments
        fetch('http://localhost:8082/stud/enrollments', { credentials: "include" })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch enrollments');
                }
                return response.json();
            })
            .then(data => {
                setEnrollments(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const submitEvaluation = async () => {
        if (!selectedEnrollment || latestReport.length === 0) return;

        const response = await fetch(
            `http://localhost:8082/stud/evaluate/${selectedEnrollment.teacherCourseId}`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(evaluations),
            }
        );

        if (response.ok) {
            alert("Evaluation submitted successfully!");
            console.log(evaluations);
        } else {
            console.log(evaluations);
            alert("Failed to submit evaluation.");
        }
    };

    const fetchLatestReport = async (teacherCourseId) => {
        try {
            const response = await fetch(`http://localhost:8082/stud/report/${teacherCourseId}`, {
                credentials: "include",
            });
    
            const text = await response.text(); // Read response as text
    
            let data;
            try {
                data = JSON.parse(text); // Try parsing as JSON
            } catch (e) {
                data = text; // If not JSON, keep it as text
            }
    
            if (response.ok) {
                if (Array.isArray(data)) {
                    setLatestReport(data);
    
                    const initialEvaluations = data.map(report => ({
                        reportId: report.id,
                        score: 0,
                        remark: '',
                    }));
                    setEvaluations(initialEvaluations);
                    setError(null); // Clear any previous error
                } else {
                    setLatestReport([]);
                    setError(typeof data === "object" ? data.message || "No reports found." : data);
                }
            } else {
                setLatestReport([]);
                setError(typeof data === "object" ? data.message || "Failed to fetch the latest report." : data);
            }
        } catch (err) {
            setError(err.message);
        }
    };
    
    

    const handleEvaluationChange = (index, field, value) => {
        const updatedEvaluations = [...evaluations];
        updatedEvaluations[index][field] = value;
        setEvaluations(updatedEvaluations);
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }


    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Student Enrollments</h2>
            {enrollments.map((enrollment, index) => (
                <div className="p-4 border rounded shadow-sm row mb-5" key={index}>
                    <h5 className="mb-3 col-5">Teacher: {enrollment.fname} {enrollment.lname}</h5>
                    <p className="mb-0 col-5">Course: {enrollment.courseName}</p>
                    <button
                        data-bs-toggle="modal"
                        data-bs-target="#evalInst"
                        onClick={() => {
                            setSelectedEnrollment(enrollment);
                            fetchLatestReport(enrollment.teacherCourseId);
                        }}
                        className="col-2 btn btn-primary text-white"
                    >
                        Evaluate
                    </button>
                </div>
            ))}

            {/* Modal for Evaluation */}
            <div className="modal fade" id="evalInst" tabIndex="-1" aria-labelledby="evalInstLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="evalInstLabel">Evaluate Report</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {error ? (
                                <div className="alert alert-danger">{error}</div> // Show error inside the modal
                            ) : latestReport.length > 0 ? (
                                latestReport.map((report, index) => (
                                    <div key={index} className="mb-4">
                                        <h6>{report.topicCovered} was covered to you using {report.styleOfTeaching}</h6>
                                        <div className="mb-3">
                                            <label htmlFor={`remark-${index}`} className="form-label">Remark</label>
                                            <textarea
                                                className="form-control"
                                                id={`remark-${index}`}
                                                value={evaluations[index]?.remark || ''}
                                                onChange={(e) => handleEvaluationChange(index, 'remark', e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3 d-flex">
                                            <label htmlFor={`score-${index}`} className="form-label mt-2 me-3">Score</label>
                                            <input
                                                type="number"
                                                className="form-control w-25"
                                                id={`score-${index}`}
                                                value={evaluations[index]?.score || 0}
                                                onChange={(e) => handleEvaluationChange(index, 'score', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No reports found within the last week.</p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={submitEvaluation}
                            >
                                Submit Evaluation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reportlist;
