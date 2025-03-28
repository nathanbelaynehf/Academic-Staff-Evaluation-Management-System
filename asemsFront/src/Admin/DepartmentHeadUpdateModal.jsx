import React, { useState, useEffect } from "react";

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
    qualification: "", // Qualification field for department heads
    specialization: "", // Specialization field for department heads
    yearsOfExperience: "", // Years of experience field for department heads
  });

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
        setDepartments(data); // Assuming the API returns an array of classes
    } catch (error) {
        console.error("Error fetching classes:", error);
    }
};

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

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

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8082/admin/dh/${id}`, {
        credentials: "include",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(departmentHead),
      });

      if (!response.ok) {
        throw new Error("Failed to update department head data");
      }

      // Close modal using Bootstrap's JS method
      const modalElement = document.getElementById("departmentHeadUpdateModal");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal fade" id="departmentHeadUpdateModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Department Head</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={departmentHead.fname}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, fname: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={departmentHead.lname}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, lname: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Grandfather Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={departmentHead.gname}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, gname: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={departmentHead.username}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, username: e.target.value })}
                />
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
                  className="form-control"
                  value={departmentHead.qualification}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, qualification: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  value={departmentHead.dob}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, dob: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date of Registration</label>
                <input
                  type="date"
                  className="form-control"
                  value={departmentHead.dateOfReg}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, dateOfReg: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Sex</label>
                <select
                  className="form-control"
                  value={departmentHead.sex}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, sex: e.target.value })}
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
                  value={departmentHead.nationality}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, nationality: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  value={departmentHead.city}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, city: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Sub City</label>
                <input
                  type="text"
                  className="form-control"
                  value={departmentHead.subCity}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, subCity: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Kebele</label>
                <input
                  type="text"
                  className="form-control"
                  value={departmentHead.kebele}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, kebele: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  value={departmentHead.pnum}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, pnum: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={departmentHead.email}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Specialization</label>
                <input
                  type="text"
                  className="form-control"
                  value={departmentHead.specialization}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, specialization: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Years of Experience</label>
                <input
                  type="text"
                  className="form-control"
                  value={departmentHead.yearsOfExperience}
                  onChange={(e) => setDepartmentHead({ ...departmentHead, yearsOfExperience: e.target.value })}
                />
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
  className="form-control w-100 mb-3"
  id="department"
  name="department"
  value={departmentHead.dhId || ""} // Ensure this matches the state
  onChange={(e) => {
    console.log("Selected ID:", e.target.value); // Debugging
    setDepartmentHead({ ...departmentHead, dhId: e.target.value });
  }}
  required
>
  {/* Default Placeholder Option */}
  <option value="" disabled>
    {departmentHead.dhName || "Select a department"}
  </option>

  {/* Dynamic Options */}
  {departments.map((dep) => (
    <option key={dep.id} value={dep.id}>
      {dep.departmentName}
    </option>
  ))}
</select>

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