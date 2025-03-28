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
    highestDegree:"",
    academicRank:""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


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

  const handleSave = async () => {
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

      // Close modal using Bootstrap's JS method
      const modalElement = document.getElementById("academicDeanUpdateModal");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
    } catch (err) {
      setError(err.message);
    }
  };

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
                  className="form-control"
                  value={academicDean.fname}
                  onChange={(e) => setAcademicDean({ ...academicDean, fname: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={academicDean.lname}
                  onChange={(e) => setAcademicDean({ ...academicDean, lname: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Grandfather Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={academicDean.gname}
                  onChange={(e) => setAcademicDean({ ...academicDean, gname: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={academicDean.username}
                  onChange={(e) => setAcademicDean({ ...academicDean, username: e.target.value })}
                />
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
                <label className="form-label">Academic Rank</label>
                <input
                  type="text"
                  className="form-control"
                  value={academicDean.academicRank}
                  onChange={(e) => setAcademicDean({ ...academicDean, academicRank: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  value={academicDean.dob}
                  onChange={(e) => setAcademicDean({ ...academicDean, dob: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date of Registration</label>
                <input
                  type="date"
                  className="form-control"
                  value={academicDean.dateOfReg}
                  onChange={(e) => setAcademicDean({ ...academicDean, dateOfReg: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Sex</label>
                <select
                  className="form-control"
                  value={academicDean.sex}
                  onChange={(e) => setAcademicDean({ ...academicDean, sex: e.target.value })}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Nationality</label>
                <input
                  type="text"
                  className="form-control"
                  value={academicDean.nationality}
                  onChange={(e) => setAcademicDean({ ...academicDean, nationality: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  value={academicDean.city}
                  onChange={(e) => setAcademicDean({ ...academicDean, city: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Sub City</label>
                <input
                  type="text"
                  className="form-control"
                  value={academicDean.subCity}
                  onChange={(e) => setAcademicDean({ ...academicDean, subCity: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Kebele</label>
                <input
                  type="text"
                  className="form-control"
                  value={academicDean.kebele}
                  onChange={(e) => setAcademicDean({ ...academicDean, kebele: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  value={academicDean.pnum}
                  onChange={(e) => setAcademicDean({ ...academicDean, pnum: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={academicDean.email}
                  onChange={(e) => setAcademicDean({ ...academicDean, email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Highest Degree</label>
                <input
                  type="text"
                  className="form-control"
                  value={academicDean.highestDegree}
                  onChange={(e) => setAcademicDean({ ...academicDean, highestDegree: e.target.value })}
                />
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