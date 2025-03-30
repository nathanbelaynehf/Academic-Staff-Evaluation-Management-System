import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const TeacherUpdateModal = ({ id, onUpdateSuccess }) => {
  const [teacher, setTeacher] = useState({
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
    pnum: "",
    email: "",
    qualification: "",
    specialization: "",
    yearsOfExperience: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const inputRefs = useRef({});
  const [originalUsername, setOriginalUsername] = useState('');
  

  useEffect(() => {
    if (!id) return;

    const fetchTeacher = async () => {
      try {
        const response = await fetch(`http://localhost:8082/admin/teacher/${id}`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch teacher data");
        }
        const data = await response.json();
        setTeacher(data);
        setOriginalUsername(data.username);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [id]);

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    const nameRegex = /^[A-Za-z\s]{4,}$/;
    const currentYear = new Date().getFullYear();

    // Name validations
    if (!teacher.fname.trim()) {
      errors.fname = "First name is required";
    } else if (!nameRegex.test(teacher.fname)) {
      errors.fname = "First name should contain at least 4 letters";
    }

    if (!teacher.lname.trim()) {
      errors.lname = "Last name is required";
    } else if (!nameRegex.test(teacher.lname)) {
      errors.lname = "Last name should contain at least 4 letters";
    }

    if (!teacher.gname.trim()) {
      errors.gname = "Grandfather name is required";
    } else if (!nameRegex.test(teacher.gname)) {
      errors.gname = "Grandfather name should contain at least 4 letters";
    }

    // Professional fields
    if (!teacher.qualification.trim()) {
      errors.qualification = "Qualification is required";
    } else if (teacher.qualification.trim().length < 4) {
      errors.qualification = "Qualification should be at least 4 characters";
    }

    if (!teacher.specialization.trim()) {
      errors.specialization = "Specialization is required";
    } else if (teacher.specialization.trim().length < 4) {
      errors.specialization = "Specialization should be at least 4 characters";
    }

    if (!teacher.yearsOfExperience) {
      errors.yearsOfExperience = "Years of experience is required";
    } else if (teacher.yearsOfExperience < 0 || teacher.yearsOfExperience > 50) {
      errors.yearsOfExperience = "Please enter valid years (0-50)";
    }

    // Location validations
    if (!teacher.nationality.trim()) {
      errors.nationality = "Nationality is required";
    } else if (teacher.nationality.trim().length < 4) {
      errors.nationality = "Nationality should be at least 4 characters";
    }

    if (!teacher.city.trim()) {
      errors.city = "City is required";
    } else if (teacher.city.trim().length < 4) {
      errors.city = "City name should be at least 4 characters";
    }

    if (!teacher.subCity.trim()) {
      errors.subCity = "Sub-city is required";
    } else if (teacher.subCity.trim().length < 4) {
      errors.subCity = "Sub-city name should be at least 4 characters";
    }

    if (!teacher.kebele.trim()) {
      errors.kebele = "Kebele is required";
    }

    // Contact info validations
    if (!teacher.pnum) {
      errors.pnum = "Phone number is required";
    } else if (!phoneRegex.test(teacher.pnum.toString())) {
      errors.pnum = "Phone number must be 10-15 digits";
    }

    if (!teacher.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(teacher.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Date validations
    if (!teacher.dob) {
      errors.dob = "Date of birth is required";
    } else {
      const dobDate = new Date(teacher.dob);
      const currentDate = new Date();
      if (dobDate >= currentDate) {
        errors.dob = "Date of birth must be in the past";
      }
    }

    if (!teacher.dateOfReg) {
      errors.dateOfReg = "Date of registration is required";
    }

    // Gender validation
    if (!teacher.sex) {
      errors.sex = "Gender is required";
    }

    // Username validation
    if (!teacher.username.trim()) {
      errors.username = "Username is required";
    } else if (teacher.username.length < 4) {
      errors.username = "Username must be at least 4 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
  //   if (!validateForm()) {
  //     console.log('Validation failed', validationErrors);
  //     return;
  //   }
  
  //   try {
  //     // Debug log
  //     console.log('Checking username availability...', {
  //       current: teacher.username,
  //       original: originalUsername
  //     });
  
  //     if (teacher.username && teacher.username !== originalUsername) {
  //       const checkUrl = `http://localhost:8082/admin/check-username?username=${encodeURIComponent(teacher.username)}&currentId=${id}`;
  //       console.log('Checking username at:', checkUrl);
        
  //       const checkResponse = await fetch(checkUrl, {
  //         credentials: "include"
  //       });
        
  //       if (!checkResponse.ok) {
  //         throw new Error(`Username check failed with status ${checkResponse.status}`);
  //       }
        
  //       const data = await checkResponse.json();
  //       console.log('Username check response:', data);
        
  //       if (!data.available) {
  //         setValidationErrors(prev => ({
  //           ...prev,
  //           username: "This username is already taken by another user"
  //         }));
  //         inputRefs.current.username?.focus();
  //         return;
  //       }
  //     }
  
  //     console.log('Proceeding with teacher update...');
  //     const response = await fetch(`http://localhost:8082/admin/teacher/${id}`, {
  //       credentials: "include",
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(teacher),
  //     });
  
  //     if (!response.ok) {
  //       const errorData = await response.json().catch(() => ({}));
  //       throw new Error(errorData.message || `Update failed with status ${response.status}`);
  //     }
  
  //     console.log('Update successful');
  //     const modalElement = document.getElementById("teacherUpdateModal");
  //     if (modalElement) {
  //       const modal = bootstrap.Modal.getInstance(modalElement);
  //       if (modal) {
  //         modal.hide();
  //       } else {
  //         new bootstrap.Modal(modalElement).hide();
  //       }
  //     }
  
  //     if (onUpdateSuccess) {
  //       onUpdateSuccess();
  //     }
  //   } catch (err) {
  //     console.error('Update error:', {
  //       message: err.message,
  //       stack: err.stack,
  //       teacherData: teacher
  //     });
  //     setError(err.message || "An unknown error occurred");
  //   }
  };
  if (loading) {
    return (
      <div className="modal fade" id="teacherUpdateModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-body text-center p-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading teacher data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal fade" id="teacherUpdateModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Teacher</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className={`form-control ${validationErrors.fname ? "is-invalid" : ""}`}
                  value={teacher.fname}
                  onChange={(e) => setTeacher({ ...teacher, fname: e.target.value })}
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
                  value={teacher.lname}
                  onChange={(e) => setTeacher({ ...teacher, lname: e.target.value })}
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
                  value={teacher.gname}
                  onChange={(e) => setTeacher({ ...teacher, gname: e.target.value })}
                />
                {validationErrors.gname && (
                  <div className="invalid-feedback">{validationErrors.gname}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  ref={(el) => (inputRefs.current["username"] = el)}
                  className={`form-control ${validationErrors.username ? "is-invalid" : ""}`}
                  value={teacher.username}
                  onChange={(e) => setTeacher({ ...teacher, username: e.target.value })}
                />
                {validationErrors.username && (
                  <div className="invalid-feedback">{validationErrors.username}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Qualification</label>
                <input
                  type="text"
                  className={`form-control ${validationErrors.qualification ? "is-invalid" : ""}`}
                  value={teacher.qualification}
                  onChange={(e) => setTeacher({ ...teacher, qualification: e.target.value })}
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
                  value={teacher.dob}
                  onChange={(e) => setTeacher({ ...teacher, dob: e.target.value })}
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
                  value={teacher.dateOfReg}
                  onChange={(e) => setTeacher({ ...teacher, dateOfReg: e.target.value })}
                />
                {validationErrors.dateOfReg && (
                  <div className="invalid-feedback">{validationErrors.dateOfReg}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Sex</label>
                <select
                  className={`form-control ${validationErrors.sex ? "is-invalid" : ""}`}
                  value={teacher.sex}
                  onChange={(e) => setTeacher({ ...teacher, sex: e.target.value })}
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
                  value={teacher.nationality}
                  onChange={(e) => setTeacher({ ...teacher, nationality: e.target.value })}
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
                  value={teacher.city}
                  onChange={(e) => setTeacher({ ...teacher, city: e.target.value })}
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
                  value={teacher.subCity}
                  onChange={(e) => setTeacher({ ...teacher, subCity: e.target.value })}
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
                  value={teacher.kebele}
                  onChange={(e) => setTeacher({ ...teacher, kebele: e.target.value })}
                />
                {validationErrors.kebele && (
                  <div className="invalid-feedback">{validationErrors.kebele}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className={`form-control ${validationErrors.pnum ? "is-invalid" : ""}`}
                  value={teacher.pnum}
                  onChange={(e) => setTeacher({ ...teacher, pnum: e.target.value })}
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
                  value={teacher.email}
                  onChange={(e) => setTeacher({ ...teacher, email: e.target.value })}
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
                  value={teacher.specialization}
                  onChange={(e) => setTeacher({ ...teacher, specialization: e.target.value })}
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
                  value={teacher.yearsOfExperience}
                  onChange={(e) => setTeacher({ ...teacher, yearsOfExperience: parseInt(e.target.value) || 0 })}
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
                  checked={teacher.status}
                  onChange={(e) => setTeacher({ ...teacher, status: e.target.checked })}
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
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherUpdateModal;