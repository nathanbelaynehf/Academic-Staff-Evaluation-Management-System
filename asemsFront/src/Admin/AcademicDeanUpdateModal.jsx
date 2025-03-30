import React, { useState, useEffect } from "react";

const AcademicDeanUpdateModal = ({ id }) => {
  const [academicDean, setAcademicDean] = useState({
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
    highestDegree: "",
    academicRank: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (!id) return;

    const fetchAcademicDean = async () => {
      try {
        const response = await fetch(`http://localhost:8082/admin/ad/${id}`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch Academic Dean data");
        }
        const data = await response.json();
        setAcademicDean(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAcademicDean();
  }, [id]);

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    const nameRegex = /^[A-Za-z\s]{4,}$/;

    // Name validations
    if (!academicDean.fname.trim()) {
      errors.fname = "First name is required";
    } else if (!nameRegex.test(academicDean.fname)) {
      errors.fname = "First name should contain at least 4 letters";
    }

    if (!academicDean.lname.trim()) {
      errors.lname = "Last name is required";
    } else if (!nameRegex.test(academicDean.lname)) {
      errors.lname = "Last name should contain at least 4 letters";
    }

    if (!academicDean.gname.trim()) {
      errors.gname = "Grandfather name is required";
    } else if (!nameRegex.test(academicDean.gname)) {
      errors.gname = "Grandfather name should contain at least 4 letters";
    }

    // Professional fields
    if (!academicDean.highestDegree.trim()) {
      errors.highestDegree = "Highest degree is required";
    } else if (academicDean.highestDegree.trim().length < 4) {
      errors.highestDegree = "Highest degree should be at least 4 characters";
    }

    if (!academicDean.academicRank.trim()) {
      errors.academicRank = "Academic rank is required";
    } else if (academicDean.academicRank.trim().length < 4) {
      errors.academicRank = "Academic rank should be at least 4 characters";
    }

    // Location validations
    if (!academicDean.nationality.trim()) {
      errors.nationality = "Nationality is required";
    } else if (academicDean.nationality.trim().length < 4) {
      errors.nationality = "Nationality should be at least 4 characters";
    }

    if (!academicDean.city.trim()) {
      errors.city = "City is required";
    } else if (academicDean.city.trim().length < 4) {
      errors.city = "City name should be at least 4 characters";
    }

    if (!academicDean.subCity.trim()) {
      errors.subCity = "Sub-city is required";
    } else if (academicDean.subCity.trim().length < 4) {
      errors.subCity = "Sub-city name should be at least 4 characters";
    }

    if (!academicDean.kebele.trim()) {
      errors.kebele = "Kebele is required";
    }

    // Contact info validations
    if (!academicDean.pnum) {
      errors.pnum = "Phone number is required";
    } else if (!phoneRegex.test(academicDean.pnum.toString())) {
      errors.pnum = "Phone number must be 10-15 digits";
    }

    if (!academicDean.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(academicDean.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Date validations
    if (!academicDean.dob) {
      errors.dob = "Date of birth is required";
    } else {
      const dobDate = new Date(academicDean.dob);
      const currentDate = new Date();
      if (dobDate >= currentDate) {
        errors.dob = "Date of birth must be in the past";
      }
    }

    if (!academicDean.dateOfReg) {
      errors.dateOfReg = "Date of registration is required";
    }

    // Gender validation
    if (!academicDean.sex) {
      errors.sex = "Gender is required";
    }

    // Username validation
    if (!academicDean.username.trim()) {
      errors.username = "Username is required";
    } else if (academicDean.username.length < 4) {
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
      const response = await fetch(`http://localhost:8082/admin/ad/${id}`, {
        credentials: "include",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(academicDean),
      });

      if (!response.ok) {
        throw new Error("Failed to update Academic Dean data");
      }

      const modalElement = document.getElementById("academicDeanUpdateModal");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="modal fade" id="academicDeanUpdateModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-body text-center p-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading academic dean data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal fade" id="academicDeanUpdateModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Academic Dean</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
          
            <form>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  required
                  className={`form-control ${validationErrors.fname ? "is-invalid" : ""}`}
                  value={academicDean.fname}
                  onChange={(e) => setAcademicDean({ ...academicDean, fname: e.target.value })}
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
                  value={academicDean.lname}
                  onChange={(e) => setAcademicDean({ ...academicDean, lname: e.target.value })}
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
                  value={academicDean.gname}
                  onChange={(e) => setAcademicDean({ ...academicDean, gname: e.target.value })}
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
                  value={academicDean.username}
                  onChange={(e) => setAcademicDean({ ...academicDean, username: e.target.value })}
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
                  value={academicDean.role}
                  onChange={(e) => setAcademicDean({ ...academicDean, role: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Highest Degree</label>
                <input
                  type="text"
                  className={`form-control ${validationErrors.highestDegree ? "is-invalid" : ""}`}
                  value={academicDean.highestDegree}
                  onChange={(e) => setAcademicDean({ ...academicDean, highestDegree: e.target.value })}
                />
                {validationErrors.highestDegree && (
                  <div className="invalid-feedback">{validationErrors.highestDegree}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Academic Rank</label>
                <input
                  type="text"
                  className={`form-control ${validationErrors.academicRank ? "is-invalid" : ""}`}
                  value={academicDean.academicRank}
                  onChange={(e) => setAcademicDean({ ...academicDean, academicRank: e.target.value })}
                />
                {validationErrors.academicRank && (
                  <div className="invalid-feedback">{validationErrors.academicRank}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className={`form-control ${validationErrors.dob ? "is-invalid" : ""}`}
                  value={academicDean.dob}
                  onChange={(e) => setAcademicDean({ ...academicDean, dob: e.target.value })}
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
                  value={academicDean.dateOfReg}
                  onChange={(e) => setAcademicDean({ ...academicDean, dateOfReg: e.target.value })}
                />
                {validationErrors.dateOfReg && (
                  <div className="invalid-feedback">{validationErrors.dateOfReg}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Sex</label>
                <select
                  className={`form-control ${validationErrors.sex ? "is-invalid" : ""}`}
                  value={academicDean.sex}
                  onChange={(e) => setAcademicDean({ ...academicDean, sex: e.target.value })}
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
                  value={academicDean.nationality}
                  onChange={(e) => setAcademicDean({ ...academicDean, nationality: e.target.value })}
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
                  value={academicDean.city}
                  onChange={(e) => setAcademicDean({ ...academicDean, city: e.target.value })}
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
                  value={academicDean.subCity}
                  onChange={(e) => setAcademicDean({ ...academicDean, subCity: e.target.value })}
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
                  value={academicDean.kebele}
                  onChange={(e) => setAcademicDean({ ...academicDean, kebele: e.target.value })}
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
                  value={academicDean.pnum}
                  onChange={(e) => setAcademicDean({ ...academicDean, pnum: e.target.value })}
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
                  value={academicDean.email}
                  onChange={(e) => setAcademicDean({ ...academicDean, email: e.target.value })}
                />
                {validationErrors.email && (
                  <div className="invalid-feedback">{validationErrors.email}</div>
                )}
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={academicDean.status}
                  onChange={(e) => setAcademicDean({ ...academicDean, status: e.target.checked })}
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

export default AcademicDeanUpdateModal;