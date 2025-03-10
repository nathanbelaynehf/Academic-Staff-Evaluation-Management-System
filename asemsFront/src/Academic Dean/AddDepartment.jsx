import { useEffect, useState } from "react";

const AddDepartment = () => {
    
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8082/ad/departments",{ credentials: "include"})
            .then(response => response.json()) // Convert response to JSON
            .then(data => {
                console.log("Fetched departments:", data); // 🔍 Debug log
                const departmentsArray = Object.values(data);
            
            setDepartments(departmentsArray);
            })
            .catch(error => console.error("Error fetching departments:", error));
    }, []);

   console.log(departments);

   

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <>
     
        <div className="container mt-4">
      <h2 className="text-center mb-4">Departments</h2>
      <div className="accordion" id="departmentsAccordion">
        {departments.map((dept, index) => (
          <div key={dept.id} className="accordion-item">
            {/* Accordion Header */}
            <h2 className="accordion-header" id={`heading${index}`}>
              <button
                className={`accordion-button ${activeIndex === index ? "" : "collapsed"}`}
                type="button"
                onClick={() => toggleAccordion(index)}
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded={activeIndex === index}
                aria-controls={`collapse${index}`}
              >
                <strong>{dept.departmentName}</strong> 
                <span className="ms-2 text-muted">(Total Years: {dept.totalYear})</span>
              </button>
            </h2>

            {/* Accordion Body */}
            <div
              id={`collapse${index}`}
              className={`accordion-collapse collapse ${activeIndex === index ? "show" : ""}`}
              aria-labelledby={`heading${index}`}
              data-bs-parent="#departmentsAccordion"
            >
              <div className="accordion-body">
                <h6 className="fw-bold">Teachers:</h6>
                {dept.teachers.length > 0 ? (
                  <ul className="list-group">
                    {dept.teachers.map((teacher, i) => (
                      <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                       {teacher.username}  <i className="bi bi-person-circle me-2"></i>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted">No teachers available</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>


        </>
    );
};

export default AddDepartment;
