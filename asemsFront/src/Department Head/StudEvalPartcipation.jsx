import React, { useState, useEffect } from 'react';

function StudEvalPartcipation() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassStats = async () => {
      try {
        const response = await fetch('http://localhost:8082/dh/stats/evaluations', {
          method: 'GET',
          credentials: 'include', // Include cookies for authentication
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setClasses(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching class statistics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClassStats();
  }, []);

  if (loading) {
    return (
      <div className="mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading class statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-5 alert alert-danger">
        Error loading class statistics: {error}
      </div>
    );
  }

  return (
    <div className="mt-5">
      <h5 className="text-primary mb-3 ms-4 mb-2">
        <i className="bi bi-journal-bookmark-fill me-2"></i>
        Class Evaluation Summary
      </h5>
      <div className="table-responsive mt-4">
        {classes.length > 0 ? (
          <table className="table table-hover table-bordered">
            <thead className="table-primary">
              <tr>
                <th className="text-secondary">Class Name</th>
                <th className="text-center text-secondary">Students</th>
                <th className="text-center text-secondary">Evaluated</th>
                <th className="text-center text-secondary">Participation Rate</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls, index) => {
                const participationRate = cls.totalStudents > 0 
                  ? Math.round((cls.evaluatedStudents / cls.totalStudents) * 100)
                  : 0;
                
                return (
                  <tr key={index}>
                    <td className="text-secondary">{cls.className} ({cls.program})</td>
                    <td className="text-center fw-bold">{cls.totalStudents}</td>
                    <td className="text-center text-success fw-bold">{cls.evaluatedStudents}</td>
                    <td className="text-center">
                      <div className="progress" style={{ height: '20px' }}>
                        <div 
                          className="progress-bar bg-success" 
                          role="progressbar" 
                          style={{ width: `${participationRate}%` }}
                          aria-valuenow={participationRate}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {participationRate}%
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="alert alert-info">
            No class evaluation data available.
          </div>
        )}
      </div>
    </div>
  );
}

export default StudEvalPartcipation;