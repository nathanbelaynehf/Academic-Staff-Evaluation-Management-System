import React, { useState, useEffect } from "react";

const TeacherUpdateModal = ({ id }) => {


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
    pnum: 0,
    email: "",
    qualification: "", // Added qualification field for teachers
    specialization:"",
    yearsOfExperience:""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [id]);

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8082/admin/teacher/${id}`, {
        credentials: "include",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teacher),
      });

      if (!response.ok) {
        throw new Error("Failed to update teacher data");
      }

      // Close modal using Bootstrap's JS method
      const modalElement = document.getElementById("teacherUpdateModal");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
    } catch (err) {
      setError(err.message);
    }
  };


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
                  className="form-control"
                  value={teacher.fname}
                  onChange={(e) => setTeacher({ ...teacher, fname: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={teacher.lname}
                  onChange={(e) => setTeacher({ ...teacher, lname: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Grandfather Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={teacher.gname}
                  onChange={(e) => setTeacher({ ...teacher, gname: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={teacher.username}
                  onChange={(e) => setTeacher({ ...teacher, username: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Role</label>
                <input
                  type="text"
                  className="form-control"
                  value={teacher.role}
                  onChange={(e) => setTeacher({ ...teacher, role: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Qualification</label>
                <input
                  type="text"
                  className="form-control"
                  value={teacher.qualification}
                  onChange={(e) => setTeacher({ ...teacher, qualification: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  value={teacher.dob}
                  onChange={(e) => setTeacher({ ...teacher, dob: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date of Registration</label>
                <input
                  type="date"
                  className="form-control"
                  value={teacher.dateOfReg}
                  onChange={(e) => setTeacher({ ...teacher, dateOfReg: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Sex</label>
                <select
                  className="form-control"
                  value={teacher.sex}
                  onChange={(e) => setTeacher({ ...teacher, sex: e.target.value })}
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
                  value={teacher.nationality}
                  onChange={(e) => setTeacher({ ...teacher, nationality: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  value={teacher.city}
                  onChange={(e) => setTeacher({ ...teacher, city: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Sub City</label>
                <input
                  type="text"
                  className="form-control"
                  value={teacher.subCity}
                  onChange={(e) => setTeacher({ ...teacher, subCity: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Kebele</label>
                <input
                  type="text"
                  className="form-control"
                  value={teacher.kebele}
                  onChange={(e) => setTeacher({ ...teacher, kebele: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  value={teacher.pnum}
                  onChange={(e) => setTeacher({ ...teacher, pnum: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={teacher.email}
                  onChange={(e) => setTeacher({ ...teacher, email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Specialization</label>
                <input
                  type="text"
                  className="form-control"
                  value={teacher.specialization}
                  onChange={(e) => setTeacher({ ...teacher, specialization: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Years of Experience</label>
                <input
                  type="text"
                  className="form-control"
                  value={teacher.yearsOfExperience}
                  onChange={(e) => setTeacher({ ...teacher, yearsOfExperience: e.target.value })}
                />
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
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherUpdateModal;