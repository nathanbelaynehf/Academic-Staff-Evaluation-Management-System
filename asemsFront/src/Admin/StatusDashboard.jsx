import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

const StatusDashboard = () => {
    const [systemStatus, setSystemStatus] = useState(null);
    const [performanceMetrics, setPerformanceMetrics] = useState(null);
    const [databaseHealth, setDatabaseHealth] = useState(null);

    useEffect(() => {
        // Fetch system status
        fetch('http://localhost:8082/admin/status/overview', {
            credentials: 'include' // Include credentials (cookies)
        })
            .then(response => response.json())
            .then(data => setSystemStatus(data))
            .catch(error => console.error("Error fetching system status:", error));

        // Fetch performance metrics
        fetch('http://localhost:8082/admin/status/performance', {
            credentials: 'include' // Include credentials (cookies)
        })
            .then(response => response.json())
            .then(data => setPerformanceMetrics(data))
            .catch(error => console.error("Error fetching performance metrics:", error));

        // Fetch database health
        fetch('http://localhost:8082/admin/status/database-health', {
            credentials: 'include' // Include credentials (cookies)
        })
            .then(response => response.json())
            .then(data => setDatabaseHealth(data))
            .catch(error => console.error("Error fetching database health:", error));
    }, []);

    return (
        <div className="container mt-5">
            <h1>System Status Dashboard</h1>

            {/* System Status */}
            <div className="card mb-3">
                <div className="card-header">
                    System Status
                </div>
                <div className="card-body">
                    {systemStatus ? (
                        <>
                            <p><strong>Uptime:</strong> {systemStatus.uptime}</p>
                            <p><strong>Load:</strong> {systemStatus.load}</p>
                        </>
                    ) : (
                        <ClipLoader size={20} color="#007bff" />
                    )}
                </div>
            </div>

            {/* Performance Metrics */}
            <div className="card mb-3">
                <div className="card-header">
                    Performance Metrics
                </div>
                <div className="card-body">
                    {performanceMetrics ? (
                        <>
                            <p><strong>CPU Usage:</strong> {performanceMetrics.cpuUsage}%</p>
                            <p><strong>Memory Usage:</strong> {performanceMetrics.memoryUsage}%</p>
                        </>
                    ) : (
                        <ClipLoader size={20} color="#007bff" />
                    )}
                </div>
            </div>

            {/* Database Health */}
            <div className="card mb-3">
                <div className="card-header">
                    Database Health
                </div>
                <div className="card-body">
                    {databaseHealth ? (
                        <>
                            <p><strong>Active Connections:</strong> {databaseHealth.activeConnections}</p>
                            <p><strong>Query Performance:</strong> {databaseHealth.queryPerformance} ms</p>
                        </>
                    ) : (
                        <ClipLoader size={20} color="#007bff" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatusDashboard;