import React, { useState, useEffect } from 'react';
import StudentParticipation from './StudentParticipation';
import DHData from './DHData';
import StudEvalPartcipation from './StudEvalPartcipation';

function DepMain() {
  const [participationRate, setParticipationRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParticipationRate = async () => {
      try {
        const response = await fetch('http://localhost:8082/dh/stats/totals', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setParticipationRate(data.participationRate);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching participation rate:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipationRate();
  }, []);

  if (loading) {
    return (
      <div className="row ms-lg-6 ms-3">
        <div className="col-12 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="row ms-lg-6 ms-3">
        <div className="col-12 alert alert-danger">
          Error loading participation data: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="row ms-lg-6 ms-3">
      {/* Your EXISTING student profile - COMPLETELY UNTOUCHED */}
      <div className="col-lg-6">
        <DHData/>
        <StudEvalPartcipation/>
      </div>

      {/* Your EXISTING participation chart - COMPLETELY UNTOUCHED */}
      <div className="col-lg-6 pt-3">
        <StudentParticipation data={participationRate || 0} />
      </div>
    </div>
  );
}

export default DepMain;