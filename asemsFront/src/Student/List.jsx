import React, { useEffect, useState } from 'react';

function List({ setSelectedTeacher }) {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch student enrollments
        fetch('http://localhost:8082/stud/enrollments' ,{credentials: "include",})
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

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-danger">Error: {error}</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Student Enrollments</h2>
                {enrollments.map((enrollment, index) => (
                    <div className="p-4 border rounded shadow-sm row mb-5" key={index}>
                            <h5 className="mb-3 col-5">Teacher:{enrollment.fname} {enrollment.lname}</h5>
                            <p className="mb-0 col-5">Course: {enrollment.courseName}</p>
                            <button 
                             data-bs-toggle="modal"
                             data-bs-target="#evalInst"
                             onClick={() => setSelectedTeacher(enrollment)}
                            className="col-2 btn btn-primary text-white">Evaluate</button>
                    </div>
                ))}
        </div>
    );
}

export default List;
