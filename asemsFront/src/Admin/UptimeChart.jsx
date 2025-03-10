import React from "react";

const UptimeChart = ({ uptime }) => {
    const min = 0;
    const max = 24;
    const value = Math.min(Math.max(uptime, min), max); // Ensure uptime is within range

    const radius = 80; // Radius of the circle
    const strokeWidth = 10; // Thickness of the progress bar
    const circumference = 2 * Math.PI * radius; // Circumference of the circle
    const progress = ((value - min) / (max - min)) * circumference; // Progress length

    return (
        <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
            <svg width="200" height="200" viewBox="0 0 200 200">
                {/* Background circle */}
                <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke="#eee"
                    strokeWidth={strokeWidth}
                />
                {/* Progress circle */}
                <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke={getColor(value)}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    strokeLinecap="round"
                    transform="rotate(-90 100 100)" // Start from the top
                />
                {/* Uptime text */}
                <text
                    x="100"
                    y="100"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="24"
                    fontWeight="bold"
                    fill="#333"
                >
                    {value}h
                </text>
            </svg>
            <p style={{ fontSize: "18px", fontWeight: "bold", marginTop: "15px", color: "#333" }}>
                System Uptime
            </p>
        </div>
    );
};

// Helper function to determine the color based on uptime
const getColor = (value) => {
    if (value < 8) return "#ef5350"; // Red
    if (value < 16) return "#ffb300"; // Yellow
    return "#66bb6a"; // Green
};

export default UptimeChart;