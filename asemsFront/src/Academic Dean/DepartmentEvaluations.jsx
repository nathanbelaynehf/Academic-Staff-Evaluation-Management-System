import React from 'react';
import { useEvaluation } from './EvaluationProvider';


function DepartmentEvaluations() {
  const { teachers } = useEvaluation();

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-success';
    if (score >= 70) return 'text-primary';
    return 'text-warning';
  };

  // Calculate department averages from the teachers data
  const calculateDepartmentAverages = () => {
    const departmentStats = {};
    
    teachers.forEach(teacher => {
      if (!departmentStats[teacher.department]) {
        departmentStats[teacher.department] = {
          totalScore: 0,
          count: 0
        };
      }
      
      departmentStats[teacher.department].totalScore += 
        parseFloat(teacher.combinedTotalAvgScore || 0);
      departmentStats[teacher.department].count += 1;
    });

    return Object.entries(departmentStats).map(([department, stats]) => ({
      name: department,
      averageResult: Math.round(stats.totalScore / stats.count)
    })).sort((a, b) => b.averageResult - a.averageResult);
  };

  const departments = calculateDepartmentAverages();

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