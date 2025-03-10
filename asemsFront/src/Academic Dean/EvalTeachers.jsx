import React, { useEffect, useState } from 'react'

function EvalTeachers({ setSelectedTeacher }) {

    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetchInstructors();
      }, []);

    const fetchInstructors = async () => {
        try {
          const response = await fetch("http://localhost:8082/ad/teacher", { credentials: "include" });
          if (!response.ok) throw new Error("Failed to fetch instructors");
          const data = await response.json();
          setInstructors(data);
        } catch (error) {
          console.error("Error fetching instructors:", error);
        }
      };

  return (
    <>

    <h1 className='text-center'>List of All Instructors</h1>
     {instructors.length > 0 ? (
        instructors.map((teacher, index) => (
          <div
            key={index}
            className="row border rounded shadow-sm p-3 ms-3 me-3 mt-4 mb-3"
          >
            <div className="col-8">
              <h3>{teacher.username}</h3> {/* Adjust key name based on API response */}
            </div>
            <div className="col-4 d-flex justify-content-end">
              <button 
              className="btn btn-primary text-white" 
              data-bs-toggle="modal"
              data-bs-target="#evalTeach"  
              onClick={() => setSelectedTeacher(teacher)} >Evaluate</button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center mt-3">No instructors found.</p>
      )}
    </>
  )
}

export default EvalTeachers