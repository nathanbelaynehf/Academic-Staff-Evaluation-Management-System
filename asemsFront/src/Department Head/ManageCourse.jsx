import React, { useEffect, useState } from 'react'
import AddCourse from './AddCourse'

function ManageCourse() {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingCourse, setEditingCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    // Fetch courses on component mount
    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:8082/dh/course", { 
                credentials: "include",
            });
            
            if (!response.ok) {
                throw new Error("Failed to fetch courses");
            }
            
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredCourses = courses.filter(course =>
        course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (course) => {
        setEditingCourse(course);
    };

    const handleDelete = async (courseId) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            try {
                const response = await fetch(`http://localhost:8082/dh/course/${courseId}`, {
                    method: 'DELETE',
                    credentials: "include",
                });
                
                if (!response.ok) {
                    throw new Error("Failed to delete course");
                }
                
                // Refresh the course list
                fetchCourses();
            } catch (error) {
                console.error("Error deleting course:", error);
            }
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`http://localhost:8082/dh/course/${editingCourse.id}`, {
                method: 'PUT',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingCourse),
            });
            
            if (!response.ok) {
                throw new Error("Failed to update course");
            }
            
            // Close modal and refresh data
            document.getElementById('editModal').querySelector('.btn-close').click();
            fetchCourses();
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingCourse(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <div className="row justify-content-center">
                <h3 className="text-center text-primary fw-bold mb-4 py-3 bg-light border rounded shadow-sm">
                    Course and Instructor Assignment Management
                </h3>
                <div className="col-9 col-lg-6 mt-4">
                    <input 
                        type="text" 
                        className="form-control text-center" 
                        placeholder='Search Course'
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <div className="col-2">
                    <button className='btn fs-1' data-bs-toggle="modal" data-bs-target="#AddCourse">
                        +
                    </button>
                </div>
            </div>
            
            <div className="border overflow-auto" style={{maxHeight: 300}}>
                {isLoading ? (
                    <div className="text-center p-4">Loading courses...</div>
                ) : filteredCourses.length === 0 ? (
                    <div className="text-center p-4">No courses found</div>
                ) : (
                    filteredCourses.map((course, index) => (
                        <div key={index} className="row justify-content-center p-2 m-3 bg-light">
                            <div className="col-5 ms-1">{course.courseName}</div>
                            <div className="col-3">{course.credits} Credit Hour</div>
                            <div 
                                className="col-1 text-primary" 
                                style={{ cursor: "pointer" }}
                                onClick={() => handleEdit(course)}
                                data-bs-toggle="modal"
                                data-bs-target="#editModal"
                            >
                                Edit
                            </div>
                            <div 
                                className="col-1 text-danger" 
                                style={{ cursor: "pointer" }}
                                onClick={() => handleDelete(course.id)}
                            >
                                Remove
                            </div>
                        </div>
                    ))
                )}
            </div>
            
            {/* Edit Course Modal */}
            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editModalLabel">Edit Course</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {editingCourse && (
                                <form onSubmit={handleSave}>
                                    <div className="mb-3">
                                        <label htmlFor="courseName" className="form-label">Course Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="courseName" 
                                            name="courseName"
                                            value={editingCourse.courseName || ''}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="credits" className="form-label">Credit Hours</label>
                                        <input 
                                            type="number" 
                                            className="form-control" 
                                            id="credits" 
                                            name="credits"
                                            value={editingCourse.credits || ''}
                                            onChange={handleInputChange}
                                            required
                                            min="1"
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary">Save changes</button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
           <AddCourse/>
        </>
    );
}

export default ManageCourse;