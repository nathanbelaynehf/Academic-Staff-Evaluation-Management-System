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
     
        <div className="container mt-3">
        <h3 class="text-center text-primary fw-bold mb-4 py-3 bg-light border rounded shadow-sm">
        Departments
</h3>
<div className="accordion" id="departmentsAccordion">
  {departments.map((dept, index) => (
    <div key={dept.id} className="accordion-item mb-3 border rounded shadow-sm">
      {/* Accordion Header */}
      <h2 className="accordion-header" id={`heading${index}`}>
        <button
          className={`accordion-button ${activeIndex === index ? "" : "collapsed"} d-flex justify-content-between align-items-center p-3`}
          type="button"
          onClick={() => toggleAccordion(index)}
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${index}`}
          aria-expanded={activeIndex === index}
          aria-controls={`collapse${index}`}
        >
          <div>
            <strong className="fs-5 text-secondary">{dept.departmentName}</strong>
            <span className="ms-2 text-muted fs-6">(Total Years: {dept.totalYear})</span>
          </div>

        </button>
      </h2>

      {/* Accordion Body */}
      <div
        id={`collapse${index}`}
        className={`accordion-collapse collapse ${activeIndex === index ? "show" : ""}`}
        aria-labelledby={`heading${index}`}
        data-bs-parent="#departmentsAccordion"
      >
        <div className="accordion-body p-3">
          <h6 className="fw-bold mb-3 text-primary text-center">
            <i className="bi bi-people-fill me-2"></i>
            Teachers
          </h6>
          {dept.teachers.length > 0 ? (
            <div className="list-group">
              {dept.teachers.map((teacher, i) => (
                <div
                  key={i}
                  className="list-group-item d-flex justify-content-between align-items-center p-2 mb-2 border rounded shadow-sm"
                >
                  <span className="fw-medium">
                    <i className="bi bi-person-circle me-2"></i>
                    {teacher.fname} {teacher.lname}
                  </span>
                  <span className="badge bg-primary rounded-pill">UserName: {teacher.username}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted fst-italic">
              <i className="bi bi-exclamation-circle me-2"></i>
              No teachers available
            </p>
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
