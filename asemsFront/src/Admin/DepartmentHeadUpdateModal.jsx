import React, { useState, useEffect, useRef } from "react";

const DepartmentHeadUpdateModal = ({ id }) => {
  const [departments, setDepartments] = useState([]);
  const [departmentHead, setDepartmentHead] = useState({
    id: 0,
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
    email: "",
    qualification: "",
    specialization: "",
    yearsOfExperience: "",
    dhId: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const inputRefs = useRef({});
  const [originalUsername, setOriginalUsername] = useState('');
  

  const fetchDepartment = async () => {
    try {
      const response = await fetch("http://localhost:8082/admin/department", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setDepartments(data);
      setOriginalUsername(data.username);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchDepartmentHead = async () => {
      try {
        const response = await fetch(`http://localhost:8082/admin/dh/${id}`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch department head data");
        }
        const data = await response.json();
        setDepartmentHead(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartmentHead();
    fetchDepartment();
  }, [id]);

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    const nameRegex = /^[A-Za-z\s]{4,}$/;

    // Name validations
    if (!departmentHead.fname.trim()) {
      errors.fname = "First name is required";
    } else if (!nameRegex.test(departmentHead.fname)) {
      errors.fname = "First name should contain at least 4 letters";
    }

    if (!departmentHead.lname.trim()) {
      errors.lname = "Last name is required";
    } else if (!nameRegex.test(departmentHead.lname)) {
      errors.lname = "Last name should contain at least 4 letters";
    }

    if (!departmentHead.gname.trim()) {
      errors.gname = "Grandfather name is required";
    } else if (!nameRegex.test(departmentHead.gname)) {
      errors.gname = "Grandfather name should contain at least 4 letters";
    }

    // Professional fields
    if (!departmentHead.qualification.trim()) {
      errors.qualification = "Qualification is required";
    } else if (departmentHead.qualification.trim().length < 4) {
      errors.qualification = "Qualification should be at least 4 characters";
    }

    if (!departmentHead.specialization.trim()) {
      errors.specialization = "Specialization is required";
    } else if (departmentHead.specialization.trim().length < 4) {
      errors.specialization = "Specialization should be at least 4 characters";
    }

    if (!departmentHead.yearsOfExperience) {
      errors.yearsOfExperience = "Years of experience is required";
    } else if (isNaN(departmentHead.yearsOfExperience)) {
      errors.yearsOfExperience = "Must be a number";
    } else if (departmentHead.yearsOfExperience < 0 || departmentHead.yearsOfExperience > 50) {
      errors.yearsOfExperience = "Please enter valid years (0-50)";
    }

    // Location validations
    if (!departmentHead.nationality.trim()) {
      errors.nationality = "Nationality is required";
    } else if (departmentHead.nationality.trim().length < 4) {
      errors.nationality = "Nationality should be at least 4 characters";
    }

    if (!departmentHead.city.trim()) {
      errors.city = "City is required";
    } else if (departmentHead.city.trim().length < 4) {
      errors.city = "City name should be at least 4 characters";
    }

    if (!departmentHead.subCity.trim()) {
      errors.subCity = "Sub-city is required";
    } else if (departmentHead.subCity.trim().length < 4) {
      errors.subCity = "Sub-city name should be at least 4 characters";
    }

    if (!departmentHead.kebele.trim()) {
      errors.kebele = "Kebele is required";
    }

    // Contact info validations
    if (!departmentHead.pnum) {
      errors.pnum = "Phone number is required";
    } else if (!phoneRegex.test(departmentHead.pnum.toString())) {
      errors.pnum = "Phone number must be 10-15 digits";
    }

    if (!departmentHead.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(departmentHead.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Date validations
    if (!departmentHead.dob) {
      errors.dob = "Date of birth is required";
    } else {
      const dobDate = new Date(departmentHead.dob);
      const currentDate = new Date();
      if (dobDate >= currentDate) {
        errors.dob = "Date of birth must be in the past";
      }
    }

    if (!departmentHead.dateOfReg) {
      errors.dateOfReg = "Date of registration is required";
    }

    // Gender validation
    if (!departmentHead.sex) {
      errors.sex = "Gender is required";
    }

    // Username validation
    if (!departmentHead.username.trim()) {
      errors.username = "Username is required";
    } else if (departmentHead.username.length < 4) {
      errors.username = "Username must be at least 4 characters";
    }

    // Department validation
    if (!departmentHead.dhId) {
      errors.department = "Department is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
  //   // Client-side validation
  //   if (!validateForm()) {
  //     return;
  //   }
  
  //   try {
  //     // Check for username changes and availability
  //     if (departmentHead.username && departmentHead.username !== originalUsername) {
  //       const checkResponse = await fetch(
  //         `http://localhost:8082/admin/check-username?username=${encodeURIComponent(departmentHead.username)}&currentId=${id}`,
  //         {
  //           credentials: "include"
  //         }
  //       );
  
  //       if (!checkResponse.ok) {
  //         throw new Error('Username availability check failed');
  //       }
  
  //       const { available } = await checkResponse.json();
        
  //       if (!available) {
  //         setValidationErrors(prev => ({
  //           ...prev,
  //           username: "Username is already taken by another user"
  //         }));
  //         inputRefs.current.username.focus();
  //         return;
  //       }
  //     }
  
  //     // Proceed with update
  //     const response = await fetch(`http://localhost:8082/admin/dh/${id}`, {
  //       credentials: "include",
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(departmentHead),
  //     });
  
  //     const responseData = await response.json();
  
  //     if (!response.ok) {
  //       throw new Error(responseData.message || "Update failed");
  //     }
  
  //     // Close modal
  //     const modalElement = document.getElementById("departmentHeadUpdateModal");
  //     const modal = bootstrap.Modal.getInstance(modalElement);
  //     if (modal) {
  //       modal.hide();
  //     } else {
  //       new bootstrap.Modal(modalElement).hide();
  //     }
  
  //     // Optional: Refresh data or show success message
  //     if (onUpdateSuccess) {
  //       onUpdateSuccess();
  //     }
  
  //   } catch (err) {
  //     console.error('Update error:', err);
  //     setError(err.message || "An error occurred during update");
  //   }
  };
  if (loading) {
    return (
      <div className="modal fade" id="departmentHeadUpdateModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-body text-center p-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading department head data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal fade" id="departmentHeadUpdateModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Department Head</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            {/* {error && <div className="alert alert-danger">{error}</div>} */}
            <form>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className={`form-control ${validationErrors.fname ? "is-invalid" : ""}`}
                  value={departmentHead.fname}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, fname: e.target.value })}
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
                  value={departmentHead.lname}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, lname: e.target.value })}
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
                  value={departmentHead.gname}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, gname: e.target.value })}
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
                  value={departmentHead.username}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, username: e.target.value })}
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
                  value={departmentHead.role}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, role: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Qualification</label>
                <input
                  type="text"
                  className={`form-control ${validationErrors.qualification ? "is-invalid" : ""}`}
                  value={departmentHead.qualification}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, qualification: e.target.value })}
                />
                {validationErrors.qualification && (
                  <div className="invalid-feedback">{validationErrors.qualification}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className={`form-control ${validationErrors.dob ? "is-invalid" : ""}`}
                  value={departmentHead.dob}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, dob: e.target.value })}
                  max={new Date().toISOString().split('T')[0]}
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
                  value={departmentHead.dateOfReg}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, dateOfReg: e.target.value })}
                />
                {validationErrors.dateOfReg && (
                  <div className="invalid-feedback">{validationErrors.dateOfReg}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Sex</label>
                <select
                  className={`form-control ${validationErrors.sex ? "is-invalid" : ""}`}
                  value={departmentHead.sex}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, sex: e.target.value })}
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
                  value={departmentHead.nationality}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, nationality: e.target.value })}
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
                  value={departmentHead.city}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, city: e.target.value })}
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
                  value={departmentHead.subCity}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, subCity: e.target.value })}
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
                  value={departmentHead.kebele}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, kebele: e.target.value })}
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
                  value={departmentHead.pnum}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, pnum: e.target.value })}
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
                  value={departmentHead.email}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, email: e.target.value })}
                />
                {validationErrors.email && (
                  <div className="invalid-feedback">{validationErrors.email}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Specialization</label>
                <input
                  type="text"
                  className={`form-control ${validationErrors.specialization ? "is-invalid" : ""}`}
                  value={departmentHead.specialization}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, specialization: e.target.value })}
                />
                {validationErrors.specialization && (
                  <div className="invalid-feedback">{validationErrors.specialization}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Years of Experience</label>
                <input
                  type="number"
                  className={`form-control ${validationErrors.yearsOfExperience ? "is-invalid" : ""}`}
                  value={departmentHead.yearsOfExperience}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, yearsOfExperience: e.target.value })}
                  min="0"
                  max="50"
                />
                {validationErrors.yearsOfExperience && (
                  <div className="invalid-feedback">{validationErrors.yearsOfExperience}</div>
                )}
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={departmentHead.status}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, status: e.target.checked })}
                />
                <label className="form-check-label">Active Status</label>
              </div>

              <div className="mb-3">
                <label className="form-label">Department</label>
                <select
                  className={`form-control w-100 mb-3 ${validationErrors.department ? "is-invalid" : ""}`}
                  id="department"
                  name="department"
                  value={departmentHead.dhId || ""}
                  onChange={(e) => {
                    setDepartmentHead({ ...departmentHead, dhId: e.target.value });
                  }}
                >
                  <option value="" disabled>
                    {departmentHead.dhName || "Select a department"}
                  </option>
                  {departments.map((dep) => (
                    <option key={dep.id} value={dep.id}>
                      {dep.departmentName}
                    </option>
                  ))}
                </select>
                {validationErrors.department && (
                  <div className="invalid-feedback">{validationErrors.department}</div>
                )}
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

export default DepartmentHeadUpdateModal;