import React, { useEffect, useState } from 'react';

function AssignInstructor() {
    const [classRows, setClassRows] = useState({});
    const [courses, setCourses] = useState([]);
    const [Instructor, setInstructor] = useState([]);
    const [classes, setClasses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    


    const fetchTeachers = async () => {
        try {
          const response = await fetch("http://localhost:8082/dh/Instructor", {
            method: "GET",
            credentials: "include", // Sends session cookie automatically
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
      
      

    useEffect(() => {
        fetchClasses();
        fetchCourses();
        fetchInstructors();
        fetchTeachers();
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
                setClasses(data);

                // Initialize rows for each class
                const initialRows = {};
                data.forEach(cls => {
                    initialRows[cls.id] = [{ id: Date.now(), instructor: "", course: "" }];
                });
                setClassRows(initialRows);
            } else {
                console.error("Failed to fetch classes");
            }
        } catch (error) {
            console.error("Error fetching classes:", error);
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await fetch("http://localhost:8082/dh/course", { credentials: "include" });
            if (!response.ok) throw new Error("Failed to fetch courses");
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const fetchInstructors = async () => {
        try {
            const response = await fetch("http://localhost:8082/dh/teacher", { credentials: "include" });
            if (!response.ok) throw new Error("Failed to fetch instructors");
            const data = await response.json();
            setInstructor(data);
        } catch (error) {
            console.error("Error fetching instructors:", error);
        }
    };

    const handleInstructorChange = (classId, rowId, value) => {
        setClassRows(prev => ({
            ...prev,
            [classId]: prev[classId].map(row =>
                row.id === rowId ? { ...row, instructor: value } : row
            ),
        }));
    };

    const handleCourseChange = (classId, rowId, value) => {
        setClassRows(prev => ({
            ...prev,
            [classId]: prev[classId].map(row =>
                row.id === rowId ? { ...row, course: value } : row
            ),
        }));
    };

    const addRow = (classId) => {
        setClassRows(prev => ({
            ...prev,
            [classId]: [...prev[classId], { id: Date.now(), instructor: "", course: "" }],
        }));
    };

    const removeRow = (classId, rowId) => {
        setClassRows(prev => ({
            ...prev,
            [classId]: prev[classId].filter(row => row.id !== rowId),
        }));
    };

    const handleSetInstructor = async (e, classId) => {
        e.preventDefault();

        const rowsForClass = classRows[classId];
        const isValid = rowsForClass.every(row => row.instructor && row.course);
        if (!isValid) {
            alert("Please select both an instructor and a course for all rows.");
            return;
        }

        const assignments = rowsForClass.map(row => ({
            teacherId: row.instructor,
            courseId: row.course,
            classId: classId,
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
                // Reset rows for this class
                setClassRows(prev => ({
                    ...prev,
                    [classId]: [{ id: Date.now(), instructor: "", course: "" }],
                }));
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
            <h1 className="text-center text-primary mt-3">Assign Instructor</h1>
            {classes.map((cls) => (
                <div key={cls.id} className="row mt-3">
                    <h2 className='text-center mt-3 text-secondary'>{cls.className}</h2>
                    <h4 className='text-center m-3'>{cls.program}</h4>
                    <form>
                        {classRows[cls.id]?.map((row) => (
                            <div key={row.id} className="row justify-content-center">
                                <div className="col-4">
                                    <select
                                        className="form-control mb-4"
                                        required
                                        value={row.instructor}
                                        onChange={(e) => handleInstructorChange(cls.id, row.id, e.target.value)}
                                    >
                                        <option value="" disabled>Select Instructor</option>
                                        {teachers.map((instructor, index) => (
                                            <option key={index} value={instructor.id}>{instructor.username}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-4">
                                    <select
                                        className="form-control mb-4"
                                        required
                                        value={row.course}
                                        onChange={(e) => handleCourseChange(cls.id, row.id, e.target.value)}
                                    >
                                        <option value="" disabled>Select Course</option>
                                        {courses.map((course, index) => (
                                            <option key={index} value={course.id}>{course.courseName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-1">
                                    <button className="btn btn-danger" onClick={() => removeRow(cls.id, row.id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                        <div className='text-center'>
                            <h2 onClick={() => addRow(cls.id)} style={{ cursor: 'pointer' }}>+</h2>
                            <button className="btn btn-primary text-white w-50" onClick={(e) => handleSetInstructor(e, cls.id)}>Set</button>
                        </div>
                    </form>
                </div>
            ))}
        </>
    );
}

export default AssignInstructor;