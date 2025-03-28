import React, { useState } from "react";

const ReportModal = ({ course,isSelected }) => {
    const [thoughts, setThoughts] = useState([{ topicCovered: "", styleOfTeaching: "" }]); // Array to store multiple thoughts
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:8082/teach/submit/${course.teacherCourseId}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(thoughts),
            });
            

            if (!response.ok) {
                throw new Error("Failed to submit report");
            }

            const result = await response.json();
            console.log(result.body+thoughts);
            alert(result.body);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const addThought = () => {
        setThoughts([...thoughts, { topicCovered: "", styleOfTeaching: "" }]); // Add a new empty thought
    };

    const updateThought = (index, field, value) => {
        const updatedThoughts = [...thoughts];
        updatedThoughts[index][field] = value;
        setThoughts(updatedThoughts);
    };
    const deleteThought = (indexToDelete) => {
        setThoughts(thoughts.filter((_, index) => index !== indexToDelete));
    };
    

    return (
        <div
            className="modal fade"
            id="evalTeach"
            tabIndex="-1"
            aria-labelledby="evalTeachLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-xl modal-dialog-scrollable">
                <div className="modal-content">
                    {/* Modal Header */}
                    <div className="modal-header">
                        <h5 className="modal-title" id="evalTeachLabel">
                        {isSelected? `Submit Report for ${course.courseName}` : "Submit Report"}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>

                    {/* Modal Body */}
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            {thoughts.map((thought, index) => (
                                <div key={index} className="mb-3 row">
                                    <div className="mb-3 col-6">
                                        <label htmlFor={`what-${index}`} className="form-label">
                                            Thought topic?
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={`topicCovered-${index}`}
                                            value={thought.topicCovered}
                                            onChange={(e) => updateThought(index, "topicCovered", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3 col-5">
                                        <label htmlFor={`styleOfTeaching-${index}`} className="form-label">
                                            Style of teaching?
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={`how-${index}`}
                                            value={thought.styleOfTeaching}
                                            onChange={(e) => updateThought(index, "styleOfTeaching", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3 col-1 d-flex align-items-end">
                            <button className="btn btn-danger" onClick={() => deleteThought(index)}>
                                  Delete
                              </button>
        </div>
                                </div>
                            ))}
                            <div className="text-center">
                            <button
                                type="button"
                                className="btn btn-secondary text-center"
                                onClick={addThought}
                                style={{ marginBottom: "10px" }}
                            >
                                + Add Another Thought
                            </button>
                            <br/>
                            <button
                                type="submit"
                                className="btn btn-primary w-50"
                                disabled={loading}
                                style={{ marginRight: "10px" }}
                            >
                                {loading ? "Submitting..." : "Submit Report"}
                            </button>
                            </div>
                          
                            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportModal;