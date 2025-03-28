import React, { useState, useEffect } from "react";



const StudentUpdateModal = ({ id }) => {

    const [classes, setClasses] = useState([]);

  const [student, setStudent] = useState({
    id: 0, batchYear: 0, fname: "", lname: "", gname: "", username: "", 
    role: "", dob: "", sex: "", status: false, dateOfReg: "", nationality: "",
    city: "", subCity: "", kebele: "", pnum: 0, batchYear:0,email: "",className:"",classid:0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

  useEffect(() => {
    if (!id) return;

    const fetchStudent = async () => {
      try {
        const response = await fetch(`http://localhost:8082/admin/students/${id}`,{credentials: "include",});
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

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8082/admin/students/${id}`, {
        credentials: "include",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      if (!response.ok) {
        throw new Error("Failed to update student data");
      }

      // Close modal using Bootstrap's JS method
      const modalElement = document.getElementById("studentUpdateModal");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();

    } catch (err) {
      setError(err.message);
    }
  };

  const fetchClasses = async () => {
    try {
        const response = await fetch("http://localhost:8082/admin/class", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setClasses(data); // Assuming the API returns an array of classes
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
                  className="form-control"
                  value={student.fname}
                  onChange={(e) => setStudent({ ...student, fname: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={student.lname}
                  onChange={(e) => setStudent({ ...student, lname: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Grandfather Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={student.gname}
                  onChange={(e) => setStudent({ ...student, gname: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={student.username}
                  onChange={(e) => setStudent({ ...student, username: e.target.value })}
                />
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
                  className="form-control"
                  value={student.batchYear}
                  onChange={(e) => setStudent({ ...student, batchYear: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  value={student.dob}
                  onChange={(e) => setStudent({ ...student, dob: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date of Registration</label>
                <input
                  type="date"
                  className="form-control"
                  value={student.dateOfReg}
                  onChange={(e) => setStudent({ ...student, dateOfReg: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Sex</label>
                <select
                  className="form-control"
                  value={student.sex}
                  onChange={(e) => setStudent({ ...student, sex: e.target.value })}
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
                  value={student.nationality}
                  onChange={(e) => setStudent({ ...student, nationality: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  value={student.city}
                  onChange={(e) => setStudent({ ...student, city: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Sub City</label>
                <input
                  type="text"
                  className="form-control"
                  value={student.subCity}
                  onChange={(e) => setStudent({ ...student, subCity: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Kebele</label>
                <input
                  type="text"
                  className="form-control"
                  value={student.kebele}
                  onChange={(e) => setStudent({ ...student, kebele: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  value={student.pnum}
                  onChange={(e) => setStudent({ ...student, pnum: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={student.email}
                  onChange={(e) => setStudent({ ...student, email: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Class</label>
                <select
                className="form-control w-100 mb-3"
                id="class"
            name="class"
            value={student.classid || ""} // Use value instead of defaultValue
               onChange={(e) => setStudent({ ...student, classid: e.target.value })}
            required
          >
             {/* Default Option */}
            <option value="" disabled>
                   {student.className} {/* Display the student's current class name */}
                 </option>
                   {/* Dynamic Options */}
                  {classes.map((cls) => (
                     <option key={cls.id} value={cls.id}>
                        {cls.className} {cls.program}
                    </option>
                   ))}
               </select>
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
