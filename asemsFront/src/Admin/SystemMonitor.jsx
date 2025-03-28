import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const SystemMonitor = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:8082/admin/status/performance", {
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch system stats");
          return response.json();
        })
        .then((data) => {
          setStats({
            cpu: data.cpuUsage.toFixed(2),
            memory: Math.round(data.memoryUsage / (1024 * 1024)), // Convert to MB
            timestamp: new Date(data.timestamp)
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setError(error.message);
          setLoading(false);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const getUsageColor = (percentage) => {
    if (percentage > 80) return "#ef5350"; // Red
    if (percentage > 60) return "#ffb300"; // Yellow
    return "#66bb6a"; // Green
  };

  if (loading) {
    return (
      <div className="card p-4 text-center">
        <ClipLoader size={30} color="#007bff" />
        <p className="mt-3">Loading system stats...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-4">
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="mb-0">
          <i className="bi bi-speedometer2 me-2 text-primary"></i>
          System Performance
        </h5>
        <small className="text-muted">
          <i className="bi bi-clock-history me-1"></i>
          {stats.timestamp.toLocaleTimeString()}
        </small>
      </div>

      <div className="row">
        {/* CPU Usage */}
        <div className="col-md-6 mb-4 mb-md-0">
          <div className="card h-100 border-0 bg-light">
            <div className="card-body">
              <h6 className="text-muted mb-3">
                <i className="bi bi-cpu me-2"></i>
                CPU Usage
              </h6>
              <div className="d-flex align-items-center mb-2">
                <h2 className="mb-0">{stats.cpu}%</h2>
                <div className="ms-auto">
                  <span 
                    className="badge rounded-pill py-1 px-2"
                    style={{ 
                      backgroundColor: `${getUsageColor(stats.cpu)}20`,
                      color: getUsageColor(stats.cpu)
                    }}
                  >
                    {stats.cpu > 80 ? 'High' : stats.cpu > 60 ? 'Moderate' : 'Normal'}
                  </span>
                </div>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div 
                  className="progress-bar" 
                  role="progressbar" 
                  style={{ 
                    width: `${stats.cpu}%`,
                    backgroundColor: getUsageColor(stats.cpu)
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Memory Usage */}
        <div className="col-md-6">
          <div className="card h-100 border-0 bg-light">
            <div className="card-body">
              <h6 className="text-muted mb-3">
                <i className="bi bi-memory me-2"></i>
                Memory Usage
              </h6>
              <div className="d-flex align-items-center mb-2">
                <h2 className="mb-0">{stats.memory} MB</h2>
                <div className="ms-auto">
                  <span 
                    className="badge rounded-pill py-1 px-2"
                    style={{ 
                      backgroundColor: `${getUsageColor(stats.memory/256)}20`,
                      color: getUsageColor(stats.memory/256)
                    }}
                  >
                    {stats.memory > 204800 ? 'High' : stats.memory > 153600 ? 'Moderate' : 'Normal'}
                  </span>
                </div>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div 
                  className="progress-bar" 
                  role="progressbar" 
                  style={{ 
                    width: `${(stats.memory/256)}%`, // Assuming 256GB max memory
                    backgroundColor: getUsageColor(stats.memory/256)
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitor;