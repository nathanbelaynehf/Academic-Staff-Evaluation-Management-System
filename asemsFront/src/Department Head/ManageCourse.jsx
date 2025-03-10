import React, { useEffect, useState } from 'react'

function ManageCourse() {

    const [courses, setCourses] = useState([]);

    
    useEffect(() => {
        fetch("http://localhost:8082/dh/course",{  credentials: "include",}) 
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch courses");
                }
                return response.json();
            })
            .then(data => setCourses(data))
            .catch(error => console.error("Error fetching courses:", error));
    }, []);

  return (
    <>    <div className="row justify-content-center">
        <div className="col-9 col-lg-6 mt-4">
            <input type="text" className="form-control text-center" placeholder='Search Course'/>
        </div>
        <div className="col-2">
           <button className='btn fs-1' data-bs-toggle="modal"
          data-bs-target="#AddCourse">+</button>
        </div>
    </div>
    <div className="border overflow-auto" style={{maxHeight:300}}>
    {courses.map((course, index) => (
                <div key={index} className="row justify-content-center p-2 m-3 bg-light">
                    <div className="col-5 ms-1">{course.courseName}</div>
                    <div className="col-3">{course.credits} Credit Hour</div>
                    <div className="col-1 text-primary" style={{ cursor: "pointer" }}>Edit</div>
                    <div className="col-1 text-primary" style={{ cursor: "pointer" }}>Remove</div>
                </div>
            ))}
    </div>
    </>
  )
}

export default ManageCourse