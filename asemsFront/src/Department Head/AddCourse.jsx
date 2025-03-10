import React, { useRef } from 'react'

function AddCourse() {

  const inputRefs = useRef({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
        courseName: inputRefs.current.courseName.value,
        credits: inputRefs.current.credits.value,
    };
    

    try {
        const response = await fetch('http://localhost:8082/dh/course', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.log(formData);
        console.error('Error posting data:', error);
    }
};

  return (
    <>
    <div className="modal" id="AddCourse">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header text-secondary fs-5 text-center">
           Add Course<button className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                 ref={(el) => (inputRefs.current["courseName"] = el)} 
                name="coursename" 
                type="text" 
                className="form-control" 
                placeholder="Course Name" 
                required/>
              </div>
              <div className="mb-3">
                <input 
                 ref={(el) => (inputRefs.current["credits"] = el)}
                name="credits" 
                type="number" 
                className="form-control" 
                placeholder="Credits" 
                required />
              </div>
              <div className="text-center">
            <button type="submit" className="btn btn-secondary text-white w-50">Add</button>
        </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default AddCourse