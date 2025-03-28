import React, { useEffect, useState } from "react";

export default function Instructors({ setSelectedTeacher }) {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await fetch("http://localhost:8082/dh/Instructor", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Teachers:", data);
      setTeachers(data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  return (
    <>
    <div className="container-xl">
    <h3 class="text-center text-primary fw-bold mb-4 py-3 bg-light border rounded shadow-sm">
      List of Instructors
</h3>
      {teachers.length > 0 ? (
        teachers.map((teacher, index) => (
          <div
            key={index}
            className="row border rounded shadow-sm p-3 ms-3 me-3 mt-2 mb-3"
          >
            <div className="col-8">
              <h3 className='text-secondary fs-4'>{teacher.fname} {teacher.lname}</h3> {/* Adjust key name based on API response */}
            </div>
            <div className="col-4 d-flex justify-content-end">
              <button 
              className="btn btn-primary text-white" 
              data-bs-toggle="modal"
              data-bs-target="#evalInst"
              onClick={() => setSelectedTeacher(teacher)}
          >Evaluate</button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center mt-3">No instructors found.</p>
      )}
      </div>
    </>
  );
}
