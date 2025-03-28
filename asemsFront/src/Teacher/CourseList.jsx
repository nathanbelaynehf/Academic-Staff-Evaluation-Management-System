import React, { useEffect, useState } from "react";
import ReportModal from "./ReportModal";

const CourseList = () => {
    const [isSlected, setSelected] = useState(false);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch("http://localhost:8082/teach/courses", {
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch courses");
                }

                const result = await response.json();
                setCourses(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return <div className="text-center mt-4">Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">Error: {error}</div>;
    }

    return (
        <div className="container mt-4">
              <h3 class="text-center text-primary fw-bold mb-4 py-3 bg-light border rounded shadow-sm">
      Your Assigned Courses
</h3>
<div className="card shadow-sm">
  <ul className="list-group list-group-flush">
    {courses.map((course) => (
      <li key={course.id} className="list-group-item d-flex justify-content-between align-items-center py-3 px-4">
        <div>
          <h6 className="mb-1 fw-bold">{course.courseName}</h6>
        </div>
        <button
          onClick={() => {
            setSelectedCourse(course);
            setSelected(true);
          }}
          data-bs-toggle="modal"
          data-bs-target="#evalTeach"
          className="btn btn-primary btn-sm"
        >
          <i className="bi bi-send me-1"></i>
          Submit Report
        </button>
      </li>
    ))}
  </ul>
</div>

         
            <ReportModal course={selectedCourse} isSelected={isSlected}/>
        </div>
    );
};

export default CourseList;
