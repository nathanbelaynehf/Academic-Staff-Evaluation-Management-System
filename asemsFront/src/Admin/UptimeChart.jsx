import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const UptimeChart = () => {
    const [uptime, setUptime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8082/admin/status/overview", {
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch uptime data");
                return response.json();
            })
            .then((data) => {
                // Extract milliseconds from the uptime string
                const ms = parseInt(data.uptime.split(' ')[1]);
                if (isNaN(ms)) throw new Error("Invalid uptime format");
                
                const uptimeInHours = Math.floor(ms / (1000 * 60 * 60));
                setUptime(uptimeInHours);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setError(error.message || "Failed to load uptime data");
                setLoading(false);
            });
    }, []);

    const getColorScheme = (hours) => {
        if (hours < 8) return {
            color: "#ef5350",
            status: "Low Uptime",
            message: "System needs attention",
            icon: "bi-exclamation-triangle"
        };
        if (hours < 16) return {
            color: "#ffb300",
            status: "Moderate Uptime",
            message: "Normal operation",
            icon: "bi-check-circle"
        };
        return {
            color: "#66bb6a",
            status: "High Uptime",
            message: "Stable operation",
            icon: "bi-shield-check"
        };
    };

    const colorScheme = uptime !== null ? getColorScheme(uptime) : null;
    const radius = 100;
    const strokeWidth = 12;
    const circumference = 2 * Math.PI * radius;
    const progress = uptime ? (uptime / 24) * circumference : 0;

    return (
        <div className="card border-0 shadow-sm p-4" style={{ maxWidth: '610px' }}>
            <div className="text-center">
                <h5 className="text-primary mb-4">
                    <i className="bi bi-server me-2"></i>
                    System Uptime Status
                </h5>
                
                {loading ? (
                    <div className="py-5">
                        <ClipLoader size={40} color="#007bff" />
                    </div>
                ) : error ? (
                    <div className="alert alert-danger py-3">
                        <i className="bi bi-x-circle-fill me-2"></i>
                        {error}
                    </div>
                ) : (
                    <>
                        <div style={{ width: '220px', height: '220px', margin: '0 auto' }}>
                            <svg width="220" height="220" viewBox="0 0 220 220">
                                <circle
                                    cx="110"
                                    cy="110"
                                    r={radius}
                                    fill="none"
                                    stroke="#f5f5f5"
                                    strokeWidth={strokeWidth}
                                />
                                <circle
                                    cx="110"
                                    cy="110"
                                    r={radius}
                                    fill="none"
                                    stroke={colorScheme.color}
                                    strokeWidth={strokeWidth}
                                    strokeDasharray={circumference}
                                    strokeDashoffset={circumference - progress}
                                    strokeLinecap="round"
                                    transform="rotate(-90 110 110)"
                                />
                                <text
                                    x="110"
                                    y="110"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontSize="36"
                                    fontWeight="700"
                                    fill={colorScheme.color}
                                >
                                    {uptime}h
                                </text>
                                <text
                                    x="110"
                                    y="145"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontSize="16"
                                    fill="#666"
                                >
                                    of 24h
                                </text>
                            </svg>
                        </div>

                        <div className="mt-4">
                            <h5 className="mb-2" style={{ color: colorScheme.color }}>
                                <i className={`bi ${colorScheme.icon} me-2`}></i>
                                {colorScheme.status}
                            </h5>
                            <p className="text-muted mb-0">
                                {colorScheme.message}
                            </p>
                        </div>

                        <div className="mt-3 pt-3 border-top">
                            <p className="small text-muted mb-0">
                                <i className="bi bi-clock-history me-2"></i>
                                Last updated: {new Date().toLocaleTimeString()}
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default UptimeChart;