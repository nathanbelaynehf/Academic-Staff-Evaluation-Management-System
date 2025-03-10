import React from "react";

const StudentParticipation = ({ data }) => {
    const value = Math.min(Math.max(data, 0), 100); // Ensure value is between 0 and 100

    // Helper function to determine the color based on the percentage
    const getColor = (value) => {
        if (value < 40) return "#ef5350"; // Red
        if (value < 70) return "#ffb300"; // Yellow
        return "#66bb6a"; // Green
    };

    // Circular progress bar calculations
    const radius = 80; // Radius of the circle
    const strokeWidth = 10; // Thickness of the progress bar
    const circumference = 2 * Math.PI * radius; // Circumference of the circle
    const progress = (value / 100) * circumference; // Progress length

    return (
        <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
              <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
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
                    {/* Percentage text */}
                    <text
                        x="100"
                        y="100"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="24"
                        fontWeight="bold"
                        fill="#333"
                    >
                        {value}%
                    </text>
                </svg>
            </div>
            <p style={{ fontSize: "18px", fontWeight: "bold", marginTop: "15px", color: "#333" }}>
            Student Participation in Instructor Evaluation
            </p>
            {/* Dynamic message based on the percentage */}
            <p style={{ fontSize: "16px", marginTop: "10px", color: getColor(value) }}>
                {value < 40
                    ? "Student Participation is lacking."
                    : value < 70
                    ? "More than half students are participating."
                    : "Students are making there voice get heard."}
            </p>
        </div>
    );
};

export default StudentParticipation;