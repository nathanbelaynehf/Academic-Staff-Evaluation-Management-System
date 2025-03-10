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
            <div className="ms-6">
                <h2 className='text-center'>Class List</h2>
                {classes.length > 0 ? (
                    <div className="row">
                        {classes.map((cls) => (
                            <div key={cls.id} className="col-5 m-4 p-3 border rounded shadow-sm">
                                <h4>{cls.className}</h4>
                                <p><strong>Program:</strong> {cls.program}</p>
                                <h5>Courses:</h5>
                                {cls.courses && cls.courses.length > 0 ? (
                                    <ul>
                                        {cls.courses.map((course) => (
                                            <li key={course.id}>{course.courseName} - {course.teacherUsername}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No courses found for this class.</p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No classes found</p>
                )}
            </div>

            <div className="container ">
                <h2>Add Class</h2>
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
