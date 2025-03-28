import React from 'react';

const TeacherEvaluationScore = ({ score }) => {
  const value = Math.min(Math.max(score, 0), 100); // Ensure score is between 0-100

  // Enhanced color scheme
  const getColorScheme = (value) => {
    if (value < 40) return {
      main: "#ef5350",
      light: "#ffebee",
      dark: "#c62828",
      text: "Needs Improvement",
      message: "Feedback indicates areas needing attention",
      icon: "bi-emoji-frown"
    };
    if (value < 70) return {
      main: "#ffb300",
      light: "#fff8e1",
      dark: "#ff8f00",
      text: "Satisfactory",
      message: "Good performance with some areas to enhance",
      icon: "bi-emoji-neutral"
    };
    return {
      main: "#66bb6a",
      light: "#e8f5e9",
      dark: "#2e7d32",
      text: "Excellent",
      message: "Consistently high teaching evaluations",
      icon: "bi-emoji-smile"
    };
  };

  const colorScheme = getColorScheme(value);
  const radius = 100; // Increased radius
  const strokeWidth = 12; // Thicker stroke
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;

  return (
    <div className="card p-5" style={{ 
      maxWidth: '610px',
      borderRadius: '16px',
      margin: '0 auto'
    }}>
      <div className="text-center">
        <h3 className="text-primary mb-4" style={{ fontSize: '1.8rem' }}>
          <i className={`bi ${colorScheme.icon} me-3`} style={{ fontSize: '1.5rem' }}></i>
          Teaching Evaluation Score
        </h3>
        
        {/* Larger SVG container */}
        <div style={{ 
          width: '250px', 
          height: '250px', 
          margin: '0 auto 25px'
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
              style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
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
            {/* Status text - larger */}
            <text
              x="125"
              y="160"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="20"
              fontWeight="600"
              fill={colorScheme.dark}
            >
              {colorScheme.text}
            </text>
          </svg>
        </div>

        {/* Status indicator - larger */}
        <div className="mt-4 mb-4">
          <span className="badge rounded-pill py-3 px-4" 
                style={{ 
                  backgroundColor: colorScheme.light, 
                  color: colorScheme.dark,
                  fontSize: '1.1rem'
                }}>
            <span className="d-inline-block rounded-circle me-2" 
                  style={{ 
                    width: '12px', 
                    height: '12px', 
                    backgroundColor: colorScheme.main,
                    verticalAlign: 'middle'
                  }}></span>
            {colorScheme.message}
          </span>
        </div>

        {/* Additional context */}
        <div className="mt-4 pt-3 border-top">
          <p className="mb-0" style={{ fontSize: '1rem', color: '#666' }}>
            <i className="bi bi-info-circle me-2"></i>
            Based on comprehensive Student, Department and Academic Dean evaluations
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherEvaluationScore;