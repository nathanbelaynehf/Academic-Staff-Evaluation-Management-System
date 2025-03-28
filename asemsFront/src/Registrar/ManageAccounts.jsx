import React, { useEffect, useState } from 'react'
import TeacherUpdateModal from './TeacherUpdateModal';
import StudentUpdateModal from "./StudentUpdateModal";


function ManageAccounts() {

    const [students, setStudents] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  
    const [teacher, setTeacher] = useState([]);  
    const [selectedId, setSelectedId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchQueryT, setSearchQueryT] = useState('');
   
    const handleIdUpdate = (id) => {
      setSelectedId(id);
    }; 
    console.log(searchQuery);


    useEffect(() => {
        fetch('http://localhost:8082/reg/allstudents' ,{credentials: "include",})
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

            fetch('http://localhost:8082/reg/teacher' ,{credentials: "include",})
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch teachers');
                }
                return response.json();
            })
            .then((data) => {
                setTeacher(data);  
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

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await fetch(`http://localhost:8082/reg/teacher/search?username=${searchQueryT}`,{credentials: "include",});
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setTeacher(data); // Update the students state with the fetched data
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        fetchTeachers();
    }, [searchQueryT]);

   
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); // Update the search query state
    };
      
    const handleTSearchChange = (e) => {
        setSearchQueryT(e.target.value); // Update the search query state
    };
   
  
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
  return (
    <>
   <h3 class="text-center text-primary fw-bold mb-4 py-3 bg-light border rounded shadow-sm">
      Students
</h3>
    <div className="mt-3 mb-3 pe-7 ps-7">
             <input
                    type="text"
                    className="form-control text-center"
                    placeholder='Search by Username'
                    value={searchQuery}
                    onChange={handleSearchChange} // Call handleSearchChange on input change
                />
        </div>
        <div  className="row p-2 m-3 bg-success text-white">
                    <div className="col-5">Full Name</div>
                    <div className="col-5">User Name</div>
    
                </div> 
     <div className="overflow-auto" style={{maxHeight:300}}>
     {students.map((student, index) => (
                <div  className="row p-2 m-3 bg-light">
                    <div className="col-5">{student.fname} {student.lname}</div>
                    <div className="col-5">{student.username}</div>
                    <div className="col-2 text-secondary">   
                    <button 
                         className="btn text-primary" 
                         data-bs-toggle="modal" 
                         data-bs-target="#studentUpdateModal"
                         onClick={() => handleIdUpdate(student.id)} // Change ID dynamically
                        >
                  Update
                  </button>
                  <StudentUpdateModal id={selectedId} />
                  </div>
                   
                </div>      
                 ))}      
    </div>


    <h3 class="text-center text-primary fw-bold mb-4 py-3 bg-light border rounded shadow-sm">
      Teachers
</h3>
    <div className="mt-3 mb-3 pe-7 ps-7">
            <input
                    type="text"
                    className="form-control text-center"
                    placeholder='Search by Username'
                    value={searchQueryT}
                    onChange={handleTSearchChange} // Call handleSearchChange on input change
                />  
        </div>
        <div  className="row p-2 m-3 bg-success text-white">
                    <div className="col-5">Full Name</div>
                    <div className="col-5">User Name</div>
    
                </div> 
     <div className="overflow-auto mb-4" style={{maxHeight:300}}>
     {teacher.map((teach, index) => (
                <div  className="row p-2 m-3 bg-light">
                    <div className="col-5">{teach.fname} {teach.lname}</div>
                    <div className="col-5">{teach.username}</div>
                    <div className="col-2 text-secondary">
                    <button 
                         className="btn text-primary" 
                         data-bs-toggle="modal" 
                         data-bs-target="#teacherUpdateModal"
                         onClick={() => handleIdUpdate(teach.id)} // Change ID dynamically
                        >
                  Update
                  </button>
                  <TeacherUpdateModal id={selectedId} />
                    </div>
                </div>      
                 ))}      
    </div>

         
    

    </>
  )
}

export default ManageAccounts