import React, { useEffect, useState } from 'react';

function RegData() {
  const [regData, setRegData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegData = async () => {
      try {
        const response = await fetch('http://localhost:8082/reg/profile', {
          method: 'GET',
           credentials: "include",
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch dean data');
        }

        const data = await response.json();
        setRegData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRegData();
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Loading Registrar data...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-danger">Error: {error}</div>;
  }

  if (!regData) {
    return <div className="text-center mt-4">No Registrar data available</div>;
  }

  return (
    <div className="row text-center text-lg-start align-items-center">
      <div className="ms-4 col-lg-2 me-5 col-md-4 col-sm-4 col-6">
        <img
          src="../public/images.jpeg"
          className="img-fluid rounded-circle shadow"
          alt="Dean"
          style={{ 
            maxWidth: "140px", 
            border: "3px solid #e9ecef",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}
        />
      </div>

      {/* Dean Data */}
      <div className="col-lg-6 col-md-8 col-sm-8 col-12 mt-4 mb-4">
        <div className="card bg-light p-3 rounded shadow-sm" style={{
          background: "linear-gradient(to right, #f8f9fa, #ffffff)"
        }}>
          <div className="row">
            <div className="col-6 col-sm-6">
              <p className="text-primary mb-2">
                <i className="bi bi-person-fill me-2"></i>
                First Name:
              </p>
              <p className="text-primary mb-2">
                <i className="bi bi-person-badge-fill me-2"></i>
                Last Name:
              </p>
              <p className="text-primary mb-2">
                <i className="bi bi-person-circle me-2"></i>
                Username:
              </p>
              <p className="text-primary mb-2">
                <i className="bi bi-gender-ambiguous me-2"></i>
                Gender:
              </p>
            </div>
            <div className="col-6 col-sm-4">
              <p className="mb-2 fw-medium text-secondary">{regData.fname || 'N/A'}</p>
              <p className="mb-2 fw-medium text-secondary">{regData.lname || 'N/A'}</p>
              <p className="mb-2 fw-medium text-secondary">{regData.username || 'N/A'}</p>
              <p className="mb-2 fw-medium text-secondary">{regData.sex || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegData;