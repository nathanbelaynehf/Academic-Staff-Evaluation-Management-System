import React from 'react';
import StudentParticipation from './StudentParticipation';
import DHData from './DHData';

function DepMain() {
  // Class data - replace with your actual data
  const classes = [
    { name: "Biology 101", total: 32, evaluated: 28 },
    { name: "Chemistry 201", total: 28, evaluated: 25 },
    { name: "Physics 301", total: 35, evaluated: 30 }
  ];

  return (
    <div className="row ms-lg-6 ms-3">
      {/* Your EXISTING student profile - COMPLETELY UNTOUCHED */}
      <div className="col-lg-6">
      <DHData/>
        {/* NEW: Simple Class List with Evaluation Counts */}
        <div className="mt-5">
          <h5 className="text-primary mb-3 ms-4 mb-2">
            <i className="bi bi-journal-bookmark-fill me-2"></i>
            Class Evaluation Summary
          </h5>
          <div className="table-responsive mt-4">
            <table className="table table-hover table-bordered">
              <thead className="table-primary">
                <tr>
                  <th className=" text-secondary">Class Name</th>
                  <th className="text-center  text-secondary">Total Students</th>
                  <th className="text-center  text-secondary">Evaluated</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((cls, index) => (
                  <tr key={index}>
                    <td className=' text-secondary'>{cls.name}</td>
                    <td className="text-center fw-bold">{cls.total}</td>
                    <td className="text-center text-success fw-bold">{cls.evaluated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Your EXISTING participation chart - COMPLETELY UNTOUCHED */}
      <div className="col-lg-6 pt-3">
        <StudentParticipation data={60} />
      </div>
    </div>
  );
}

export default DepMain;