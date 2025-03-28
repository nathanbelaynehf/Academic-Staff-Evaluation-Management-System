import React, { useEffect, useState } from "react";

function AssignInstructor() {
  const [classRows, setClassRows] = useState([]); // Rows for the selected class
  const [courses, setCourses] = useState([]); // List of all courses
  const [teachers, setTeachers] = useState([]); // List of all teachers
  const [classes, setClasses] = useState([]); // List of all classes
  const [selectedClass, setSelectedClass] = useState(""); // Currently selected class

  // Fetch data on component mount
  useEffect(() => {
    fetchClasses();
    fetchCourses();
    fetchTeachers();
  }, []);

  // Fetch classes from the backend
  const fetchClasses = async () => {
    try {
      const response = await fetch("http://localhost:8082/dh/class", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        setClasses(data);
      } else {
        console.error("Failed to fetch classes");
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  // Fetch courses from the backend
  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:8082/dh/course", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch courses");
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Fetch teachers from the backend
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
      setTeachers(data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  // Handle class selection
  const handleClassChange = (e) => {
    const classId = e.target.value;
    setSelectedClass(classId);
    // Initialize rows for the selected class
    setClassRows([{ id: Date.now(), instructor: "", course: "" }]);
  };

  // Handle instructor selection for a row
  const handleInstructorChange = (rowId, value) => {
    setClassRows((prev) =>
      prev.map((row) =>
        row.id === rowId ? { ...row, instructor: value } : row
      )
    );
  };

  // Handle course selection for a row
  const handleCourseChange = (rowId, value) => {
    setClassRows((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, course: value } : row))
    );
  };

  // Add a new row
  const addRow = () => {
    setClassRows((prev) => [
      ...prev,
      { id: Date.now(), instructor: "", course: "" },
    ]);
  };

  // Remove a row
  const removeRow = (rowId) => {
    setClassRows((prev) => prev.filter((row) => row.id !== rowId));
  };

  // Handle form submission
  const handleSetInstructor = async (e) => {
    e.preventDefault();

    // Validate that all rows have an instructor and course selected
    const isValid = classRows.every((row) => row.instructor && row.course);
    if (!isValid) {
      alert("Please select both an instructor and a course for all rows.");
      return;
    }

    // Prepare assignment data
    const assignments = classRows.map((row) => ({
      teacherId: row.instructor,
      courseId: row.course,
      classId: selectedClass,
    }));

    try {
      const response = await fetch("http://localhost:8082/dh/assign", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assignments),
      });

      if (response.ok) {
        alert("Teachers assigned to courses successfully!");
        // Reset rows after successful submission
        setClassRows([{ id: Date.now(), instructor: "", course: "" }]);
      } else {
        alert("Error assigning teachers to courses.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };

  return (
    <>
      <h2 className="text-center text-secondary mt-3">Assign Instructor</h2>

      {/* Class Dropdown */}
      <div className="row justify-content-center mt-3">
        <div className="col-6">
          <select
            className="form-control mb-4"
            value={selectedClass}
            onChange={handleClassChange}
            required
          >
            <option value="" disabled>
              Select Class
            </option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.className} - {cls.program}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dynamic Rows for Assignments */}
      {selectedClass && (
        <form>
          {classRows.map((row) => (
            <div key={row.id} className="row justify-content-center">
              {/* Instructor Dropdown */}
              <div className="col-4">
                <select
                  className="form-control mb-4"
                  required
                  value={row.instructor}
                  onChange={(e) =>
                    handleInstructorChange(row.id, e.target.value)
                  }
                >
                  <option value="" disabled>
                    Select Instructor
                  </option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.fname} {teacher.lname}
                    </option>
                  ))}
                </select>
              </div>

              {/* Course Dropdown */}
              <div className="col-4">
                <select
                  className="form-control mb-4"
                  required
                  value={row.course}
                  onChange={(e) => handleCourseChange(row.id, e.target.value)}
                >
                  <option value="" disabled>
                    Select Course
                  </option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.courseName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Remove Row Button */}
              <div className="col-1">
                <button
                  className="btn btn-danger"
                  onClick={() => removeRow(row.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Add Row Button */}
          <div className="text-center">
            <button
              type="button"
              className="btn btn-success mb-3"
              onClick={addRow}
            >
              + Add Assignment
            </button>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              className="btn btn-primary text-white w-50 mb-3"
              onClick={handleSetInstructor}
            >
              Set Assignments
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default AssignInstructor;