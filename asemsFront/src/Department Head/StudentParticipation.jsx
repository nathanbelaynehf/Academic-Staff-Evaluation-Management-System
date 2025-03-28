import React from "react";

const StudentParticipation = ({ data }) => {
    const value = Math.min(Math.max(data, 0), 100);

    // Enhanced color scheme
    const getColorScheme = (value) => {
        if (value < 40) return {
            main: "#ef5350",
            light: "#ffebee",
            dark: "#c62828",
            text: "Low Participation",
            message: "Student participation needs immediate attention"
        };
        if (value < 70) return {
            main: "#ffb300",
            light: "#fff8e1",
            dark: "#ff8f00",
            text: "Moderate Participation",
            message: "More than half of students are participating"
        };
        return {
            main: "#66bb6a",
            light: "#e8f5e9",
            dark: "#2e7d32",
            text: "High Participation",
            message: "Excellent student engagement"
        };
    };

    const colorScheme = getColorScheme(value);
    const radius = 100; // Increased radius
    const strokeWidth = 12; // Thicker stroke
    const circumference = 2 * Math.PI * radius;
    const progress = (value / 100) * circumference;

    return (
        <div className="card  p-5" style={{ 
            maxWidth: "610px", 
            margin: "0 auto",
            borderRadius: "16px"
        }}>
            <div className="text-center">
                <h3 className="text-primary mb-4" style={{ fontSize: "1.8rem" }}>
                    <i className="bi bi-people-fill me-3" style={{ fontSize: "1.5rem" }}></i>
                    Student Evaluation Participation
                </h3>
                
                {/* Larger SVG container */}
                <div style={{ 
                    position: "relative", 
                    width: "250px", 
                    height: "250px", 
                    margin: "0 auto 25px"
                }}>
                    <svg width="250" height="250" viewBox="0 0 250 250">
                        {/* Background circle */}
                        <circle
                            cx="125"
                            cy="125"
                            r={radius}
                            fill="none"
                            stroke="#f5f5f5"
                            strokeWidth={strokeWidth}
                        />
                        {/* Progress circle */}
                        <circle
                            cx="125"
                            cy="125"
                            r={radius}
                            fill="none"
                            stroke={colorScheme.main}
                            strokeWidth={strokeWidth}
                            strokeDasharray={circumference}
                            strokeDashoffset={circumference - progress}
                            strokeLinecap="round"
                            transform="rotate(-90 125 125)"
                            style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
                        />
                        {/* Percentage text - much larger */}
                        <text
                            x="125"
                            y="120"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="42"
                            fontWeight="700"
                            fill={colorScheme.main}
                        >
                            {value}%
                        </text>
                        {/* Label text */}
                        <text
                            x="125"
                            y="160"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="18"
                            fill="#666"
                            fontWeight="500"
                        >
                            Participation Rate
                        </text>
                    </svg>
                </div>

                {/* Status indicator - larger */}
                <div className="mt-4 mb-4">
                    <span className="badge rounded-pill py-3 px-4" 
                          style={{ 
                              backgroundColor: colorScheme.light, 
                              color: colorScheme.dark,
                              fontSize: "1.1rem"
                          }}>
                        <span className="d-inline-block rounded-circle me-2" 
                              style={{ 
                                  width: "12px", 
                                  height: "12px", 
                                  backgroundColor: colorScheme.main,
                                  verticalAlign: "middle"
                              }}></span>
                        {colorScheme.text}
                    </span>
                </div>

                {/* Description - larger */}
                <div className="mt-3">
                    <p className="mb-0" style={{ 
                        fontSize: "1.1rem",
                        color: colorScheme.dark,
                        fontWeight: "500"
                    }}>
                        <i className={`bi ${value < 40 ? 'bi-exclamation-triangle' : 
                                      value < 70 ? 'bi-info-circle' : 'bi-check-circle'} me-2`}></i>
                        {colorScheme.message}
                    </p>
                </div>

                {/* Additional context - new element */}
                <div className="mt-4 pt-3 border-top">
                    <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
                        Based on {value} out of 100 expected evaluations
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StudentParticipation;