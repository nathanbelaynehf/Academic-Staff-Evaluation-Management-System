import React, { useState, useEffect } from "react";

const StudentUpdateModal = ({ id }) => {
  const [classes, setClasses] = useState([]);
  const [student, setStudent] = useState({
    id: 0,
    batchYear: 0,
    fname: "",
    lname: "",
    gname: "",
    username: "",
    role: "",
    dob: "",
    sex: "",
    status: false,
    dateOfReg: "",
    nationality: "",
    city: "",
    subCity: "",
    kebele: "",
    pnum: 0,
    batchYear: 0,
    email: "",
    className: "",
    classid: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (!id) return;

    const fetchStudent = async () => {
      try {
        const response = await fetch(`http://localhost:8082/reg/students/${id}`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }
        const data = await response.json();
        setStudent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
    fetchClasses();
  }, [id]);

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{8,11}$/;
    const nameRegex = /^[A-Za-z\s]{4,}$/;
    const currentYear = new Date().getFullYear();
  
    // Name validations
    if (!student.fname.trim()) {
      errors.fname = "First name is required";
    } else if (!nameRegex.test(student.fname)) {
      errors.fname = "First name should contain at least 4 letters";
    }
  
    if (!student.lname.trim()) {
      errors.lname = "Last name is required";
    } else if (!nameRegex.test(student.lname)) {
      errors.lname = "Last name should contain at least 4 letters";
    }
  
    if (!student.gname.trim()) {
      errors.gname = "Grandfather name is required";
    } else if (!nameRegex.test(student.gname)) {
      errors.gname = "Grandfather name should contain at least 4 letters";
    }
  
    // Location validations
    if (!student.nationality.trim()) {
      errors.nationality = "Nationality is required";
    } else if (student.nationality.trim().length < 4) {
      errors.nationality = "Nationality should be at least 4 characters";
    }
  
    if (!student.city.trim()) {
      errors.city = "City is required";
    } else if (student.city.trim().length < 4) {
      errors.city = "City name should be at least 4 characters";
    }
  
    if (!student.subCity.trim()) {
      errors.subCity = "Sub-city is required";
    } else if (student.subCity.trim().length < 4) {
      errors.subCity = "Sub-city name should be at least 4 characters";
    }
  
    if (!student.kebele.trim()) {
      errors.kebele = "Kebele is required";
    }
  
    // Contact info validations
    if (!student.pnum) {
      errors.pnum = "Phone number is required";
    } else if (!phoneRegex.test(student.pnum.toString())) {
      errors.pnum = "Phone number must be 10-15 digits";
    }
  
    if (!student.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(student.email)) {
      errors.email = "Please enter a valid email address";
    }
  
    // Academic validations
    if (!student.batchYear) {
      errors.batchYear = "Batch year is required";
    } else if (student.batchYear < 2000 || student.batchYear > currentYear + 5) {
      errors.batchYear = `Please enter a valid batch year (2000-${currentYear + 5})`;
    }
  
  
    // Date validations
    if (!student.dob) {
      errors.dob = "Date of birth is required";
    } else {
      const dobDate = new Date(student.dob);
      const currentDate = new Date();
      if (dobDate >= currentDate) {
        errors.dob = "Date of birth must be in the past";
      }
    }
  
    if (!student.dateOfReg) {
      errors.dateOfReg = "Date of registration is required";
    }
  
    // Gender validation
    if (!student.sex) {
      errors.sex = "Gender is required";
    }
  
    // Username validation
    if (!student.username.trim()) {
      errors.username = "Username is required";
    } else if (student.username.length < 4) {
      errors.username = "Username must be at least 4 characters";
    }
  
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8082/reg/students/${id}`, {
        credentials: "include",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update student data");
      }
  
      // Fix: Use vanilla JS to hide the modal
      const modalElement = document.getElementById('studentUpdateModal');
      const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
      modal.hide();
      
      // Optional: Show success message or refresh data
      alert('Student updated successfully!');
      
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await fetch("http://localhost:8082/reg/classes", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  return (
    <div className="modal fade" id="studentUpdateModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Student</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className={`form-control ${validationErrors.fname ? "is-invalid" : ""}`}
                  value={student.fname}
                  onChange={(e) => setStudent({ ...student, fname: e.target.value })}
                />
                {validationErrors.fname && (
                  <div className="invalid-feedback">{validationErrors.fname}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className={`form-control ${validationErrors.lname ? "is-invalid" : ""}`}
                  value={student.lname}
                  onChange={(e) => setStudent({ ...student, lname: e.target.value })}
                />
                {validationErrors.lname && (
                  <div className="invalid-feedback">{validationErrors.lname}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Grandfather Name</label>
                <input
                  type="text"
                  className={`form-control ${validationErrors.gname ? "is-invalid" : ""}`}
                  value={student.gname}
                  onChange={(e) => setStudent({ ...student, gname: e.target.value })}
                />
                {validationErrors.gname && (
                  <div className="invalid-feedback">{validationErrors.gname}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className={`form-control ${validationErrors.username ? "is-invalid" : ""}`}
                  value={student.username}
                  onChange={(e) => setStudent({ ...student, username: e.target.value })}
                />
                {validationErrors.username && (
                  <div className="invalid-feedback">{validationErrors.username}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Role</label>
                <input
                  type="text"
                  className="form-control"
                  value={student.role}
                  onChange={(e) => setStudent({ ...student, role: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Batch Year</label>
                <input
                  type="number"
                  className={`form-control ${validationErrors.batchYear ? "is-invalid" : ""}`}
                  value={student.batchYear}
                  onChange={(e) => setStudent({ ...student, batchYear: e.target.value })}
                />
                {validationErrors.batchYear && (
                  <div className="invalid-feedback">{validationErrors.batchYear}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className={`form-control ${validationErrors.dob ? "is-invalid" : ""}`}
                  value={student.dob}
                  onChange={(e) => setStudent({ ...student, dob: e.target.value })}
                />
                {validationErrors.dob && (
                  <div className="invalid-feedback">{validationErrors.dob}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Date of Registration</label>
                <input
                  type="date"
                  className={`form-control ${validationErrors.dateOfReg ? "is-invalid" : ""}`}
                  value={student.dateOfReg}
                  onChange={(e) => setStudent({ ...student, dateOfReg: e.target.value })}
                />
                {validationErrors.dateOfReg && (
                  <div className="invalid-feedback">{validationErrors.dateOfReg}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Sex</label>
                <select
                  className={`form-control ${validationErrors.sex ? "is-invalid" : ""}`}
                  value={student.sex}
                  onChange={(e) => setStudent({ ...student, sex: e.target.value })}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {validationErrors.sex && (
                  <div className="invalid-feedback">{validationErrors.sex}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Nationality</label>
                <input
                  type="text"
                  className={`form-control ${validationErrors.nationality ? "is-invalid" : ""}`}
                  value={student.nationality}
                  onChange={(e) => setStudent({ ...student, nationality: e.target.value })}
                />
                {validationErrors.nationality && (
                  <div className="invalid-feedback">{validationErrors.nationality}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className={`form-control ${validationErrors.city ? "is-invalid" : ""}`}
                  value={student.city}
                  onChange={(e) => setStudent({ ...student, city: e.target.value })}
                />
                {validationErrors.city && (
                  <div className="invalid-feedback">{validationErrors.city}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Sub City</label>
                <input
                  type="text"
                  className={`form-control ${validationErrors.subCity ? "is-invalid" : ""}`}
                  value={student.subCity}
                  onChange={(e) => setStudent({ ...student, subCity: e.target.value })}
                />
                {validationErrors.subCity && (
                  <div className="invalid-feedback">{validationErrors.subCity}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Kebele</label>
                <input
                  type="text"
                  className={`form-control ${validationErrors.kebele ? "is-invalid" : ""}`}
                  value={student.kebele}
                  onChange={(e) => setStudent({ ...student, kebele: e.target.value })}
                />
                {validationErrors.kebele && (
                  <div className="invalid-feedback">{validationErrors.kebele}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="number"
                  className={`form-control ${validationErrors.pnum ? "is-invalid" : ""}`}
                  value={student.pnum}
                  onChange={(e) => setStudent({ ...student, pnum: e.target.value })}
                />
                {validationErrors.pnum && (
                  <div className="invalid-feedback">{validationErrors.pnum}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${validationErrors.email ? "is-invalid" : ""}`}
                  value={student.email}
                  onChange={(e) => setStudent({ ...student, email: e.target.value })}
                />
                {validationErrors.email && (
                  <div className="invalid-feedback">{validationErrors.email}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Class</label>
                <select
                  className={`form-control w-100 mb-3 ${validationErrors.classid ? "is-invalid" : ""}`}
                  id="class"
                  name="class"
                  value={student.classid || ""}
                  onChange={(e) => setStudent({ ...student, classid: e.target.value })}
                  required
                >
                  {console.log(student)}
                  <option value="" disabled>
                    {student.className} {student.program}
                  </option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.className} {cls.program}
                    </option>
                  ))}
                </select>
                {validationErrors.classid && (
                  <div className="invalid-feedback">{validationErrors.classid}</div>
                )}
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={student.status}
                  onChange={(e) => setStudent({ ...student, status: e.target.checked })}
                />
                <label className="form-check-label">Active Status</label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentUpdateModal;