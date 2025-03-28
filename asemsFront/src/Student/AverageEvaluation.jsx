import React from 'react';

const AverageEvaluation = ({ score }) => {
    const min = 0;
    const max = 100;
    const value = Math.min(Math.max(score, min), max); // Ensure score is within range

    // Enhanced color scheme with status messages
    const getColorScheme = (value) => {
        if (value < 40) return {
            main: "#ef5350",
            light: "#ffebee",
            dark: "#c62828",
            icon: "bi-emoji-frown",
            title: "Needs Improvement",
            message: "We're sorry you didn't like the teaching style of our staff.",
            suggestion: "Your feedback will help us make improvements."
        };
        if (value < 70) return {
            main: "#ffb300",
            light: "#fff8e1",
            dark: "#ff8f00",
            icon: "bi-emoji-neutral",
            title: "Good Effort",
            message: "We'll work to improve our staff's teaching methods.",
            suggestion: "Thank you for your constructive feedback."
        };
        return {
            main: "#66bb6a",
            light: "#e8f5e9",
            dark: "#2e7d32",
            icon: "bi-emoji-smile",
            title: "Excellent!",
            message: "We're glad you're appreciating our staff's teaching efforts!",
            suggestion: "Your positive feedback motivates our team."
        };
    };

    const colorScheme = getColorScheme(value);
    const radius = 100; // Larger radius
    const strokeWidth = 12; // Thicker stroke
    const circumference = 2 * Math.PI * radius;
    const progress = ((value - min) / (max - min)) * circumference;

    return (
        <div className="card p-5" style={{ 
            maxWidth: "610px", 
            margin: "0 auto",
            borderRadius: "16px"
        }}>
            <div className="text-center">
                <h3 className="text-primary mb-4" style={{ fontSize: "1.8rem" }}>
                    <i className={`bi ${colorScheme.icon} me-3`} style={{ fontSize: "1.5rem" }}></i>
                    Your Evaluation Score
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
                        {/* Score text - larger */}
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
                        {/* Status title */}
                        <text
                            x="125"
                            y="160"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="18"
                            fill={colorScheme.dark}
                            fontWeight="600"
                        >
                            {colorScheme.title}
                        </text>
                    </svg>
                </div>

                {/* Main message - larger */}
                <div className="mt-4 mb-3">
                    <p className="mb-0" style={{ 
                        fontSize: "1.1rem",
                        color: colorScheme.dark,
                        fontWeight: "500"
                    }}>
                        {colorScheme.message}
                    </p>
                </div>

                {/* Suggestion - new element */}
                <div className="mt-3 pt-3 border-top">
                    <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
                        <i className="bi bi-lightbulb me-2"></i>
                        {colorScheme.suggestion}
                    </p>
                </div>

                {/* Score range indicator - new element */}
                <div className="mt-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">0%</small>
                        <div className="progress mx-2" style={{height: "6px", width: "100%"}}>
                            <div 
                                className="progress-bar" 
                                role="progressbar" 
                                style={{
                                    width: `${value}%`,
                                    backgroundColor: colorScheme.main
                                }}
                            ></div>
                        </div>
                        <small className="text-muted">100%</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AverageEvaluation;