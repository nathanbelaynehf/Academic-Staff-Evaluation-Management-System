import React, { useEffect, useState } from 'react';

function DepartmentEvaluations() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-success';
    if (score >= 70) return 'text-primary';
    return 'text-warning';
  };

  useEffect(() => {
    const fetchDepartmentEvaluations = async () => {
      try {
        const response = await fetch('http://localhost:8082/ad/summary', {
          credentials: 'include' // Include cookies for authentication
        });

        if (!response.ok) {
          throw new Error('Failed to fetch department evaluations');
        }

        const data = await response.json();
        
        // Transform the data to match the expected format
        const formattedData = data.map(dept => ({
          name: dept.departmentName,
          averageResult: Math.round(dept.totalCombinedAverage ) // Convert 0-10 scale to 0-100
        })).sort((a, b) => b.averageResult - a.averageResult);

        setDepartments(formattedData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching department evaluations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartmentEvaluations();
  }, []);

  if (loading) {
    return (
      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 mb-0">Loading department evaluations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body text-center py-4 text-danger">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm mt-4">
      <div className="card-header bg-white border-0 pb-0">
        <h5 className="text-primary">
          <i className="bi bi-building me-2"></i>
          Department Evaluation Results
        </h5>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="ps-5 text-secondary fs-3 fw-normal">Department</th>
                <th className="text-end pe-6 fs-3 text-secondary fw-normal">Score</th>
              </tr>
            </thead>
            <tbody>
              {departments.length > 0 ? (
                departments.map((dept, index) => (
                  <tr key={index} className="border-top">
                    <td className="ps-4">
                      <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                          <i className="bi bi-journal-text text-primary"></i>
                        </div>
                        <span className="fw-medium text-secondary">{dept.name}</span>
                      </div>
                    </td>
                    <td className="text-end pe-4">
                      <div className="d-flex align-items-center justify-content-end">
                        <div className="progress me-3" style={{width: '80px', height: '6px'}}>
                          <div 
                            className={`progress-bar ${getScoreColor(dept.averageResult)}`}
                            role="progressbar" 
                            style={{width: `${dept.averageResult}%`}}
                          ></div>
                        </div>
                        <span className={`fw-bold ${getScoreColor(dept.averageResult)}`}>
                          {dept.averageResult}
                          <span className="text-muted">/100</span>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-4 text-muted">
                    No department data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DepartmentEvaluations;