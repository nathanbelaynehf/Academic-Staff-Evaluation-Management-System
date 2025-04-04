import React, { useEffect, useState } from "react";

const EnrollmentModal = ({ student, onClose }) => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Fetch all courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:8082/reg/teacherCourse", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Fetch enrollments for the selected student
  useEffect(() => {
    if (!student) return;

    setLoading(true);
    setError(null);

    fetch(`http://localhost:8082/reg/course/${student.id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setEnrollments(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [student]);

  // Handle course selection
  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter courses based on search query
  const filteredCourses = courses.filter((course) =>
    course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add a new enrollment
  const addEnrollment = async () => {
    if (!selectedCourse) {
      setError("Please select a course.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8082/reg/enrollment/${student.id}/add`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedCourse),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add course");
      }

      // Update enrollments state with the new course
      const newCourse = courses.find((c) => c.teacherCourseId === parseInt(selectedCourse));
      setEnrollments([...enrollments, { id: selectedCourse, courseName: newCourse.courseName }]);
      setSelectedCourse("");
    } catch (error) {
      setError(error.message);
    }
  };

  // Remove an enrollment
  const removeEnrollment = async (courseId) => {
    try {
      const response = await fetch(
        `http://localhost:8082/reg/enrollment/${student.id}/drop/${courseId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to drop course");
      }

      // Update enrollments state by removing the dropped course
      setEnrollments(enrollments.filter((e) => e.id !== courseId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="modal fade" id="courses" tabIndex="-1" aria-labelledby="coursesLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Manage Courses for {student?.username}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            {loading && <div className="text-center">Loading...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <h6>Enrolled Courses:</h6>
            {enrollments.length > 0 ? (
              <ul className="list-group">
                {enrollments.map((enrollment) => (
                  <li key={enrollment.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>
                      <strong>{enrollment.courseName}</strong> - {enrollment.teacherUsername}
                    </span>
                    <button className="btn btn-danger btn-sm" onClick={() => removeEnrollment(enrollment.teacherCourseId)}>
                      Drop
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No enrollments found.</p>
            )}

            <div className="mt-3">
              <h6>Add Course:</h6>

              {/* Search Input */}
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={handleSearchChange}
              />

              {/* Course Dropdown */}
              <select className="form-control" value={selectedCourse} onChange={handleCourseChange}>
                <option value="" disabled>Select a course</option>
                {filteredCourses.map((course, index) => (
                  <option key={index} value={course.teacherCourseId}>
                    {course.courseName} (by {course.teacherUsername})
                  </option>
                ))}
              </select>

              <button className="btn btn-success mt-2" onClick={addEnrollment}>
                Add Course
              </button>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentModal;