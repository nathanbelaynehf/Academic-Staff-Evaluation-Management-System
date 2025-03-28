import React, { useState, useEffect } from 'react';

const AssociateTeachers = () => {
  const [departments, setDepartments] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [departmentName, setDepartmentName] = useState("");
    const [totalYear, setTotalYear] = useState("");

    const handleSubmitw = async (e) => {
      e.preventDefault();

  
      if (!departmentName || !totalYear) {
          alert("Please fill in all fields.");
          return;
      }

      const departmentData = {
          departmentName,
          totalYear: parseInt(totalYear, 10),
      };

      try {
          const response = await fetch("http://localhost:8082/ad/department", {
              method: "POST",
              credentials: "include",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(departmentData),
          });

          if (response.ok) {
              alert("Department saved successfully!");
              setDepartmentName("");
              setTotalYear("");
          } else {
              alert("Error saving department.");
          }
      } catch (error) {
          console.error("Error:", error);
          alert("An error occurred.");
      }
  };

  useEffect(() => {
    fetch("http://localhost:8082/ad/department", { credentials: "include" })
      .then(response => response.json())
      .then(data => setDepartments(data))
      .catch(error => console.error("Error fetching departments:", error));
  }, []);

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

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleInstructorChange = (event) => {
    setSelectedInstructor(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedDepartment || !selectedInstructor) {
      alert("Please select both a department and an instructor.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8082/ad/associate", {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          departmentId: selectedDepartment,
          teacherId: selectedInstructor,
        }),
      });

      if (!response.ok) throw new Error("Failed to associate teacher with department");

      alert("Teacher associated with department successfully!");
    } catch (error) {
      console.error("Error associating teacher with department:", error);
      alert("Failed to associate teacher with department.");
    }
  };

  return (
    <div className="row container">
    <div className="col-5">
    <div className="container mt-6 ms-3 mb-5">
            <h3 className='text-secondary'>Add Department</h3>
            <form onSubmit={handleSubmitw}>
                <div className="mb-3">
                    <label className="form-label">Department Name:</label>
                    <input
                        type="text"
                        className="form-control w-75"
                        value={departmentName}
                        onChange={(e) => setDepartmentName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Total Year:</label>
                    <input
                        type="number"
                        className="form-control w-75"
                        value={totalYear}
                        onChange={(e) => setTotalYear(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary text-white">Save Department</button>
            </form>
        </div>
        </div>
        <div className="col-7">
        <div className='container mt-6'>
      <h3 className='text-secondary'>Assign Department to teachers</h3>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor=" mb-3">Department:</label>
          <select className='form-control mt-2' id="department" value={selectedDepartment} onChange={handleDepartmentChange}>
            <option value="">Select a department</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>{dept.departmentName}</option>
            ))}
          </select>
        </div>
        <div>
          <label  htmlFor="instructor mb-3 mt-3">Instructor:</label>
          <select className='form-control mt-2' id="instructor" value={selectedInstructor} onChange={handleInstructorChange}>
            <option value="">Select an instructor</option>
            {instructors.map(instructor => (
              <option key={instructor.id} value={instructor.id}>{instructor.fname} {instructor.lname}</option>
            ))}
          </select>
        </div>
        <button className='btn btn-primary text-white mt-4 mb-3' type="submit">Associate</button>
      </form>
    </div>
  
        </div>
</div>
  );
};

export default AssociateTeachers;