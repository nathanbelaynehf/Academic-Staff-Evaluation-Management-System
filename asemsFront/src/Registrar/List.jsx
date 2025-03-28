import React, { useState, useEffect } from 'react';

const List = ({setSelectedStudent}) => {
    const [students, setStudents] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('http://localhost:8082/reg/students' ,{credentials: "include",})
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch students');
                }
                return response.json();
            })
            .then((data) => {
                setStudents(data);  
                setLoading(false);  
            })
            .catch((err) => {
                setError(err.message);  
                setLoading(false);  
            });
    }, []);  

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch(`http://localhost:8082/reg/students/search?username=${searchQuery}`,{credentials: "include",});
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log("Student "+ data)
                setStudents(data); // Update the students state with the fetched data
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        fetchStudents();
    }, [searchQuery]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); // Update the search query state
    };

  
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mt-4">
             <h3 class="text-center text-primary fw-bold mb-4 py-3 bg-light border rounded shadow-sm">
      Student Course Management
</h3>
        <div className='text-center w-100'>
            <input 
            type="text" 
            className="form-control w-50 mx-auto text-center" 
            placeholder="Search Student..." 
            aria-label="Search Student"
            value={searchQuery}
            onChange={handleSearchChange}
            />
        </div>
    
            <h2 className='text-center text-secondary mt-3'>List of Students</h2>
            <div className="list-group">
                {students.map((student, index) => (
                    <div className="row border rounded shadow-sm p-3 ms-3 me-3 mt-2 mb-3" key={index}>
                        <div className="col-8">{student.fname} {student.lname}</div>
                        <div className="col-4 d-flex justify-content-end">
                     <button 
                   className="btn btn-primary text-white" 
                   data-bs-toggle="modal"
                   data-bs-target="#courses"
                    onClick={() => setSelectedStudent(student)}
                  >Manage Course</button>
            </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default List;
