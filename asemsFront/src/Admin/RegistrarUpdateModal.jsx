import React, { useState, useEffect } from "react";

const RegistrarUpdateModal = ({ id }) => {
  const [registrar, setRegistrar] = useState({
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
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (!id) return;

    const fetchRegistrar = async () => {
      try {
        const response = await fetch(`http://localhost:8082/admin/registrar/${id}`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch registrar data");
        }
        const data = await response.json();
        setRegistrar(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrar();
  }, [id]);

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    const nameRegex = /^[A-Za-z\s]{4,}$/;

    // Name validations
    if (!registrar.fname.trim()) {
      errors.fname = "First name is required";
    } else if (!nameRegex.test(registrar.fname)) {
      errors.fname = "First name should contain at least 4 letters";
    }

    if (!registrar.lname.trim()) {
      errors.lname = "Last name is required";
    } else if (!nameRegex.test(registrar.lname)) {
      errors.lname = "Last name should contain at least 4 letters";
    }

    if (!registrar.gname.trim()) {
      errors.gname = "Grandfather name is required";
    } else if (!nameRegex.test(registrar.gname)) {
      errors.gname = "Grandfather name should contain at least 4 letters";
    }

    // Professional fields
    if (!registrar.qualification.trim()) {
      errors.qualification = "Qualification is required";
    } else if (registrar.qualification.trim().length < 4) {
      errors.qualification = "Qualification should be at least 4 characters";
    }

    if (!registrar.specialization.trim()) {
      errors.specialization = "Specialization is required";
    } else if (registrar.specialization.trim().length < 4) {
      errors.specialization = "Specialization should be at least 4 characters";
    }

    if (!registrar.yearsOfExperience) {
      errors.yearsOfExperience = "Years of experience is required";
    } else if (isNaN(registrar.yearsOfExperience)) {
      errors.yearsOfExperience = "Must be a number";
    } else if (registrar.yearsOfExperience < 0 || registrar.yearsOfExperience > 50) {
      errors.yearsOfExperience = "Please enter valid years (0-50)";
    }

    // Location validations
    if (!registrar.nationality.trim()) {
      errors.nationality = "Nationality is required";
    } else if (registrar.nationality.trim().length < 4) {
      errors.nationality = "Nationality should be at least 4 characters";
    }

    if (!registrar.city.trim()) {
      errors.city = "City is required";
    } else if (registrar.city.trim().length < 4) {
      errors.city = "City name should be at least 4 characters";
    }

    if (!registrar.subCity.trim()) {
      errors.subCity = "Sub-city is required";
    } else if (registrar.subCity.trim().length < 4) {
      errors.subCity = "Sub-city name should be at least 4 characters";
    }

    if (!registrar.kebele.trim()) {
      errors.kebele = "Kebele is required";
    }

    // Contact info validations
    if (!registrar.pnum) {
      errors.pnum = "Phone number is required";
    } else if (!phoneRegex.test(registrar.pnum.toString())) {
      errors.pnum = "Phone number must be 10-15 digits";
    }

    if (!registrar.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(registrar.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Date validations
    if (!registrar.dob) {
      errors.dob = "Date of birth is required";
    } else {
      const dobDate = new Date(registrar.dob);
      const currentDate = new Date();
      if (dobDate >= currentDate) {
        errors.dob = "Date of birth must be in the past";
      }
    }

    if (!registrar.dateOfReg) {
      errors.dateOfReg = "Date of registration is required";
    }

    // Gender validation
    if (!registrar.sex) {
      errors.sex = "Gender is required";
    }

    // Username validation
    if (!registrar.username.trim()) {
      errors.username = "Username is required";
    } else if (registrar.username.length < 4) {
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
      const response = await fetch(`http://localhost:8082/admin/registrar/${id}`, {
        credentials: "include",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrar),
      });

      if (!response.ok) {
        throw new Error("Failed to update registrar data");
      }

      const modalElement = document.getElementById("registrarUpdateModal");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="modal fade" id="registrarUpdateModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-body text-center p-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading registrar data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal fade" id="registrarUpdateModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Registrar</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <form>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className={`form-control ${validationErrors.fname ? "is-invalid" : ""}`}
                  value={registrar.fname}
                  onChange={(e) => setRegistrar({ ...registrar, fname: e.target.value })}
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
                  value={registrar.lname}
                  onChange={(e) => setRegistrar({ ...registrar, lname: e.target.value })}
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
                  value={registrar.gname}
                  onChange={(e) => setRegistrar({ ...registrar, gname: e.target.value })}
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
                  value={registrar.username}
                  onChange={(e) => setRegistrar({ ...registrar, username: e.target.value })}
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
                  value={registrar.role}
                  onChange={(e) => setRegistrar({ ...registrar, role: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Qualification</label>
                <input
                  type="text"
                  className={`form-control ${validationErrors.qualification ? "is-invalid" : ""}`}
                  value={registrar.qualification}
                  onChange={(e) => setRegistrar({ ...registrar, qualification: e.target.value })}
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
                  value={registrar.dob}
                  onChange={(e) => setRegistrar({ ...registrar, dob: e.target.value })}
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
                  value={registrar.dateOfReg}
                  onChange={(e) => setRegistrar({ ...registrar, dateOfReg: e.target.value })}
                />
                {validationErrors.dateOfReg && (
                  <div className="invalid-feedback">{validationErrors.dateOfReg}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Sex</label>
                <select
                  className={`form-control ${validationErrors.sex ? "is-invalid" : ""}`}
                  value={registrar.sex}
                  onChange={(e) => setRegistrar({ ...registrar, sex: e.target.value })}
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
                  value={registrar.nationality}
                  onChange={(e) => setRegistrar({ ...registrar, nationality: e.target.value })}
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
                  value={registrar.city}
                  onChange={(e) => setRegistrar({ ...registrar, city: e.target.value })}
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
                  value={registrar.subCity}
                  onChange={(e) => setRegistrar({ ...registrar, subCity: e.target.value })}
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
                  value={registrar.kebele}
                  onChange={(e) => setRegistrar({ ...registrar, kebele: e.target.value })}
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
                  value={registrar.pnum}
                  onChange={(e) => setRegistrar({ ...registrar, pnum: e.target.value })}
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
                  value={registrar.email}
                  onChange={(e) => setRegistrar({ ...registrar, email: e.target.value })}
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
                  value={registrar.specialization}
                  onChange={(e) => setRegistrar({ ...registrar, specialization: e.target.value })}
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
                  value={registrar.yearsOfExperience}
                  onChange={(e) => setRegistrar({ ...registrar, yearsOfExperience: e.target.value })}
                />
                {validationErrors.yearsOfExperience && (
                  <div className="invalid-feedback">{validationErrors.yearsOfExperience}</div>
                )}
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={registrar.status}
                  onChange={(e) => setRegistrar({ ...registrar, status: e.target.checked })}
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

export default RegistrarUpdateModal;