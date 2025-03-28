import React, { useEffect, useState } from 'react'
import StudentUpdateModal from './StudentUpdateModal';
import TeacherUpdateModal from './TeacherUpdateModal';
import DepartmentHeadUpdateModal from './DepartmentHeadUpdateModal';
import RegistrarUpdateModal from './RegistrarUpdateModal';
import AcademicDeanUpdateModal from './AcademicDeanUpdateModal';

function ManageAccounts() {

    const [students, setStudents] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  
    const [teacher, setTeacher] = useState([]);  
    const [dhs, setDhs] = useState([]);  
    const [registrars, setRegistrars] = useState([]);
    const [ad, setAd] = useState([]); 
    const [selectedId, setSelectedId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchQueryT, setSearchQueryT] = useState('');
    const [searchQueryD, setSearchQueryD] = useState('');

    const handleIdUpdate = (id) => {
      setSelectedId(id);
    }; 
    console.log(searchQuery);


    useEffect(() => {
        fetch('http://localhost:8082/admin/students' ,{credentials: "include",})
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

            fetch('http://localhost:8082/admin/teacher' ,{credentials: "include",})
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

            fetch('http://localhost:8082/admin/dh' ,{credentials: "include",})
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch Department Heads');
                }
                return response.json();
            })
            .then((data) => {
                setDhs(data);  
                setLoading(false);  
            })
            .catch((err) => {
                setError(err.message);  
                setLoading(false);  
            });

            fetch('http://localhost:8082/admin/registerars' ,{credentials: "include",})
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch Registrars');
                }
                return response.json();
            })
            .then((data) => {
                setRegistrars(data);  
                setLoading(false);  
            })
            .catch((err) => {
                setError(err.message);  
                setLoading(false);  
            });

            fetch('http://localhost:8082/admin/ad' ,{credentials: "include",})
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch Registrars');
                }
                return response.json();
            })
            .then((data) => {
                setAd(data);  
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
                const response = await fetch(`http://localhost:8082/admin/students/search?username=${searchQuery}`,{credentials: "include",});
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
                const response = await fetch(`http://localhost:8082/admin/teacher/search?username=${searchQueryT}`,{credentials: "include",});
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

    useEffect(() => {
        const fetchDhs = async () => {
            try {
                const response = await fetch(`http://localhost:8082/admin/dh/search?username=${searchQueryD}`,{credentials: "include",});
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setDhs(data); // Update the students state with the fetched data
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        fetchDhs();
    }, [searchQueryD]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); // Update the search query state
    };
      
    const handleTSearchChange = (e) => {
        setSearchQueryT(e.target.value); // Update the search query state
    };
    const handleDSearchChange = (e) => {
        setSearchQueryD(e.target.value); // Update the search query state
    };

  
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
  return (
    <>
    <h2 className='text-center'>Students</h2>
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


    <h2 className='text-center mt-4'>Teachers</h2>
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
     <div className="overflow-auto" style={{maxHeight:300}}>
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

    <h2 className='text-center mt-4'>Department Heads</h2>
    <div className="mt-3 mb-3 pe-7 ps-7">
    <input
                    type="text"
                    className="form-control text-center"
                    placeholder='Search by Username'
                    value={searchQueryD}
                    onChange={handleDSearchChange} // Call handleSearchChange on input change
                />  
        </div>
        <div  className="row p-2 m-3 bg-success text-white">
                    <div className="col-3">Full Name</div>
                    <div className="col-3">User Name</div>
                    <div className="col-3">Department</div>
    
                </div> 
     <div className="overflow-auto" style={{maxHeight:300}}>
        {console.log(dhs)}
     {dhs.map((dh, index) => (
                <div  className="row p-2 m-3 bg-light">
                    <div className="col-3">{dh.fname} {dh.lname} </div>
                    <div className="col-3">{dh.username}</div>
                    <div className="col-3">{dh.departmentName}</div>
                    <div className="col-2 text-secondary"> 
                    <button 
                         className="btn text-primary" 
                         data-bs-toggle="modal" 
                         data-bs-target="#departmentHeadUpdateModal"
                         onClick={() => handleIdUpdate(dh.id)} // Change ID dynamically
                        >
                  Update
                  </button>
                  <DepartmentHeadUpdateModal id={selectedId} /></div>
                </div>      
                 ))}      
    </div>

    
    <h2 className='text-center mt-4'>Registerars</h2>
        <div  className="row p-2 m-3 bg-success text-white">
                    <div className="col-5">Full Name</div>
                    <div className="col-5">User Name</div>
    
                </div> 
     <div className="overflow-auto" style={{maxHeight:300}}>
     {registrars.map((registrar, index) => (
                <div  className="row p-2 m-3 bg-light">
                    <div className="col-5">{registrar.fname} {registrar.lname}</div>
                    <div className="col-5">{registrar.username}</div>
                    <div className="col-2 text-secondary">
                    <button 
                         className="btn text-primary" 
                         data-bs-toggle="modal" 
                         data-bs-target="#registrarUpdateModal"
                         onClick={() => handleIdUpdate(registrar.id)} 
                        >
                  Update
                  </button>
                  <RegistrarUpdateModal id={selectedId} />

                    </div>
                </div>      
                 ))}      
    </div>

    <h2 className='text-center mt-4'>Academic Dean</h2>
        <div  className="row p-2 m-3 bg-success text-white">
                    <div className="col-5">Full Name</div>
                    <div className="col-5">User Name</div>
    
                </div> 
     <div className="overflow-auto" style={{maxHeight:300}}>
     {ad.map((academic, index) => (
                <div  className="row p-2 m-3 bg-light">
                    <div className="col-5">{academic.fname} {academic.lname}</div>
                    <div className="col-5">{academic.username}</div>
                    <div className="col-2 text-secondary">
                    <button 
                         className="btn text-primary" 
                         data-bs-toggle="modal" 
                         data-bs-target="#academicDeanUpdateModal"
                         onClick={() => handleIdUpdate(academic.id)} 
                        >
                  Update
                  </button>
                  <AcademicDeanUpdateModal id={selectedId} />

                    </div>
                </div>      
                 ))}      
    </div>

    </>
  )
}

export default ManageAccounts