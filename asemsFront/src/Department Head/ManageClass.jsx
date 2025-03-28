import React, { useEffect, useState } from 'react';

function ManageClass() {
    const [className, setClassName] = useState("");
    const [program, setProgram] = useState("");
    const [departmentid, setDepartmentId] = useState("");
    const [classes, setClasses] = useState([]);

    
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const classData = {
            className,
            program,
            departmentid
        };

        try {
            const response = await fetch("http://localhost:8082/dh/class", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(classData)
            });

            if (response.ok) {
                alert("Class added successfully!");
                setClassName("");
                setProgram("");
                setDepartmentId("");
                fetchClasses(); // Refresh class list after adding
            } else {
                alert("Failed to add class!");
            }
        } catch (error) {
            console.error("Error adding class:", error);
            alert("An error occurred while adding the class.");
        }
    };

    const handleDeleteCourse = async (classId, courseId) => {
        const deleteCourseDto = {
            classId: classId,
            courseId: courseId
        };
    
        try {
            const response = await fetch(`http://localhost:8082/dh/deleteCourse`, {
                method: 'DELETE',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                   
                },
                body: JSON.stringify(deleteCourseDto),
            });
    
            if (response.ok) {
                alert('Course deleted successfully');
            } else {
                const errorData = await response.json();
                alert(`Failed to delete the course: ${errorData.message || response.statusText}`);
            }
        } catch (error) {
            console.error('Error deleting course:', error);
            alert('An error occurred while deleting the course');
        }
    };

    // Fetch classes
    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await fetch("http://localhost:8082/dh/class", {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" }
            });

            if (response.ok) {
                const data = await response.json();

                // Fetch courses for each class
                const classesWithCourses = await Promise.all(
                    data.map(async (cls) => {
                        const coursesResponse = await fetch(`http://localhost:8082/dh/class/${cls.id}/courses`, {
                            method: "GET",
                            credentials: "include",
                            headers: { "Content-Type": "application/json" }
                        });

                        if (coursesResponse.ok) {
                            const courses = await coursesResponse.json();
                            console.log(cls.id);
                            return { ...cls, courses };
                        } else {
                            console.error(`Failed to fetch courses for class ${cls.id}`);
                            return { ...cls, courses: [] };
                        }
                    })
                );

                setClasses(classesWithCourses);
            } else {
                console.error("Failed to fetch classes");
            }
        } catch (error) {
            console.error("Error fetching classes:", error);
        }
    };

    return (
        <>
          
            {/* Display Classes */}
            <div className="ms-6 row ">
                 <h3 class="me-5 text-center text-primary fw-bold mb-4 py-3 bg-light border rounded shadow-sm">
  Classes
</h3>
               
              {classes.map((cls) => (
  <div key={cls.id} className="col-lg-5 col-sm-8 m-4 p-4 border rounded shadow-sm bg-light">
    {/* Class Name */}
    <h4 className="text-primary mb-3">
      <i className="bi bi-building me-2"></i>
      {cls.className}
    </h4>

    {/* Program */}
    <p className="text-secondary">
      <strong>
        <i className="bi bi-book me-2"></i>
        Program:
      </strong>{" "}
      {cls.program}
    </p>

    {/* Courses Section */}
    <h5 className="mt-4 text-success">
      <i className="bi bi-list-task me-2"></i>
      Courses:
    </h5>

    {/* Courses List */}
    {cls.courses && cls.courses.length > 0 ? (
      <ul className="list-group">
        {cls.courses.map((course) => (
          <li
            key={course.id}
            className="list-group-item d-flex justify-content-between align-items-center mb-2 border rounded shadow-sm"
          >
            
            {/* Course Name and Instructor */}
            <span>
              <i className="bi bi-journal-text me-2"></i>
              {course.courseName} - {course.fname} {course.lname}
            </span>

            {/* Delete Button */}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDeleteCourse(cls.id, course.teacherCourseId)}
              title="Delete Course"
            >
              {console.log(course)}
              <i className="bi bi-trash"></i>
            </button>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-muted fst-italic">
        <i className="bi bi-exclamation-circle me-2"></i>
        No courses found for this class.
      </p>
    )}
  </div>
))}
                
            </div>

            <div className="container ">
                <h2 className='text-secondary'>Add Class</h2>
                <form onSubmit={handleSubmit}>
                    {/* Class Name Input */}
                    <div className="mb-3">
                        <label className="form-label">Class Name</label>
                        <input
                            type="text"
                            className="form-control w-50"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Program Selection */}
                    <div className="mb-3">
                        <label className="form-label">Program</label>
                        <select
                            className="form-control w-50"
                            value={program}
                            onChange={(e) => setProgram(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select Program</option>
                            <option value="Regular">Regular</option>
                            <option value="Weekend">Weekend</option>
                            <option value="Night">Night</option>
                        </select>
                    </div>


                    <button type="submit" className="btn btn-primary text-white mb-5">Add Class</button>
                </form>
            </div>

        </>
    );
}

export default ManageClass;
