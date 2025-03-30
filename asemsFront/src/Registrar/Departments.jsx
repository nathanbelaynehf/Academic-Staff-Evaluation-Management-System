import React, { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8082/reg/hierarchy', { credentials: 'include' })
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch');
        return response.json();
      })
      .then(data => {
        setDepartments(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-4">Loading departments...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4" style={{ maxWidth: '800px' }}>
      <h2 className="mb-4 text-center text-primary fw-bold">Departments Overview</h2>

      <div className="accordion">
        {departments.map((department, index) => (
          <div key={department.departmentId} className="accordion-item mb-3 border rounded-3 shadow-sm">
            {/* Header with clear toggle button */}
            <div
              className="accordion-header d-flex justify-content-between align-items-center p-3 bg-light-hover cursor-pointer"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              style={{
                backgroundColor: openIndex === index ? '#f8f9fa' : '#fff',
                transition: 'background-color 0.3s ease'
              }}
            >
              <div className="d-flex align-items-center">
                <button 
                  className="btn btn-sm btn-outline-primary me-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenIndex(openIndex === index ? null : index);
                  }}
                >
                  {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                <h5 className="mb-0 fw-semibold">{department.departmentName}</h5>
              </div>
              <span className="badge bg-primary rounded-pill px-3 py-2">
                {department.classes.reduce((sum, cls) => sum + cls.studentCount, 0)} students
              </span>
            </div>

            {/* Body with smooth animation */}
            <div 
              className={`accordion-collapse ${openIndex === index ? 'show' : ''}`}
              style={{
                overflow: 'hidden',
                transition: 'max-height 0.3s ease',
                maxHeight: openIndex === index ? '500px' : '0px'
              }}
            >
              <div className="p-3">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: '70%' }}>Class Name</th>
                      <th style={{ width: '30%' }} className="text-end">Students</th>
                    </tr>
                  </thead>
                  <tbody>
                    {department.classes.map(cls => (
                      <tr key={cls.classId}>
                        <td>
                          <span className="d-inline-block me-2">📚</span>
                          {cls.className}  {cls.program}
                        </td>
                        <td className="text-end">
                          <span className="badge bg-info text-dark rounded-pill px-3">
                            {cls.studentCount}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .bg-light-hover:hover {
          background-color: #f8f9fa !important;
        }
        .cursor-pointer {
          cursor: pointer;
        }
        .accordion-item {
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default Departments;