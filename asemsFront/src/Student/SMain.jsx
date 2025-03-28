import React from 'react'
import AverageEvaluation from './AverageEvaluation'
import StudentData from './StudentData'

function SMain() {
  // Sample course data - replace with your actual data
  const courses = [
    { id: 1, code: 'CS101', name: 'Introduction to Programming', instructor: 'Dr. Smith' },
    { id: 2, code: 'MATH201', name: 'Calculus II', instructor: 'Prof. Johnson' },
    { id: 3, code: 'PHYS101', name: 'Physics Fundamentals', instructor: 'Dr. Williams' },
    { id: 4, code: 'ENG102', name: 'Academic Writing', instructor: 'Prof. Brown' }
  ]

  // Sample evaluated courses - replace with your actual data
  const evaluatedCourses = [1, 3] // IDs of evaluated courses

  // Calculate unevaluated courses
  const unevaluatedCourses = courses.filter(
    course => !evaluatedCourses.includes(course.id)
  )

  return (
    <div>
      <div className="row ms-lg-6 ms-3">
        <div className="col-lg-6">
         <StudentData/>
           {/* Course Evaluation Section */}
      <div className="row ms-lg-6 ms-3 mt-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h4 className="text-primary mb-4">
                <i className="bi bi-journal-bookmark me-2"></i>
                Course Evaluation Status
              </h4>
              
              {/* Summary Cards */}
              <div className="row mb-4">
                <div className="col-md-4 mb-3 mb-md-0">
                  <div className="card bg-light border-0 p-3">
                    <h5 className="text-muted mb-2">Total Courses</h5>
                    <h3 className="text-primary">{courses.length}</h3>
                  </div>
                </div>
                <div className="col-md-4 mb-3 mb-md-0">
                  <div className="card bg-light border-0 p-3">
                    <h5 className="text-muted mb-2">Evaluated</h5>
                    <h3 className="text-success">{evaluatedCourses.length}</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card bg-light border-0 p-3">
                    <h5 className="text-muted mb-2">Pending</h5>
                    <h3 className="text-warning">{unevaluatedCourses.length}</h3>
                  </div>
                </div>
              </div>

              {/* Unevaluated Courses Table */}
              {unevaluatedCourses.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-danger mb-3">
                    <i className="bi bi-exclamation-circle me-2"></i>
                    Courses Pending Evaluation
                  </h5>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Course Code</th>
                          <th>Course Name</th>
                          <th>Instructor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {unevaluatedCourses.map((course) => (
                          <tr key={course.id}>
                            <td className="fw-medium">{course.code}</td>
                            <td>{course.name}</td>
                            <td>
                              <span className="badge bg-primary bg-opacity-10 text-primary">
                                <i className="bi bi-person-fill me-1"></i>
                                {course.instructor}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
        </div>
        <div className="col-lg-6 mt-3">
          <AverageEvaluation score={20} />
        </div>
      </div>

     
    </div>
  )
}

export default SMain