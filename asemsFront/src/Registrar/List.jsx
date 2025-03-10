import React, { useState, useEffect } from 'react';

const List = ({setSelectedStudent}) => {
    const [students, setStudents] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  

    useEffect(() => {
        fetch('http://localhost:8082/reg/students' ,{credentials: "include",})
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch students');
                }
                return response.json();
            })
            .then((data) => {
                setStudents(data);  
                setLoading(false);  
            })
            .catch((err) => {
                setError(err.message);  
                setLoading(false);  
            });
    }, []);  

  
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mt-4">
              <div class="input-group mb-4 ms-5 row">
                    <input type="text" class="form-control col-10" placeholder="Search Student..." aria-label="Search Student"/>
                    <div class="input-group-append col-2">
                        <button class="btn btn-primary text-white" type="button">Search</button>
                    </div>
                </div>
            <h2>List of Students</h2>
            <div className="list-group">
                {students.map((student, index) => (
                    <div className="row border rounded shadow-sm p-3 ms-3 me-3 mt-2 mb-3" key={index}>
                        <div className="col-8">{student.username}</div>
                        <div className="col-4 d-flex justify-content-end">
                     <button 
                   className="btn btn-primary text-white" 
                   data-bs-toggle="modal"
                   data-bs-target="#courses"
                    onClick={() => setSelectedStudent(student)}
                  >Manage Course</button>
            </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default List;
