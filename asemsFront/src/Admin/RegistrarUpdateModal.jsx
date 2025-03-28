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
    qualification: "", // Qualification field for registrars
    specialization: "", // Specialization field for registrars
    yearsOfExperience: "", // Years of experience field for registrars
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

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

  const handleSave = async () => {
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

      // Close modal using Bootstrap's JS method
      const modalElement = document.getElementById("registrarUpdateModal");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal fade" id="registrarUpdateModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Registrar</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={registrar.fname}
                  onChange={(e) => setRegistrar({ ...registrar, fname: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={registrar.lname}
                  onChange={(e) => setRegistrar({ ...registrar, lname: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Grandfather Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={registrar.gname}
                  onChange={(e) => setRegistrar({ ...registrar, gname: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={registrar.username}
                  onChange={(e) => setRegistrar({ ...registrar, username: e.target.value })}
                />
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
                  className="form-control"
                  value={registrar.qualification}
                  onChange={(e) => setRegistrar({ ...registrar, qualification: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  value={registrar.dob}
                  onChange={(e) => setRegistrar({ ...registrar, dob: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date of Registration</label>
                <input
                  type="date"
                  className="form-control"
                  value={registrar.dateOfReg}
                  onChange={(e) => setRegistrar({ ...registrar, dateOfReg: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Sex</label>
                <select
                  className="form-control"
                  value={registrar.sex}
                  onChange={(e) => setRegistrar({ ...registrar, sex: e.target.value })}
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
                  value={registrar.nationality}
                  onChange={(e) => setRegistrar({ ...registrar, nationality: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  value={registrar.city}
                  onChange={(e) => setRegistrar({ ...registrar, city: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Sub City</label>
                <input
                  type="text"
                  className="form-control"
                  value={registrar.subCity}
                  onChange={(e) => setRegistrar({ ...registrar, subCity: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Kebele</label>
                <input
                  type="text"
                  className="form-control"
                  value={registrar.kebele}
                  onChange={(e) => setRegistrar({ ...registrar, kebele: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  value={registrar.pnum}
                  onChange={(e) => setRegistrar({ ...registrar, pnum: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={registrar.email}
                  onChange={(e) => setRegistrar({ ...registrar, email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Years of Experience</label>
                <input
                  type="text"
                  className="form-control"
                  value={registrar.yearsOfExperience}
                  onChange={(e) => setRegistrar({ ...registrar, yearsOfExperience: e.target.value })}
                />
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