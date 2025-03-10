import React from 'react';

const AverageEvaluation = ({ score }) => {
    const min = 0;
    const max = 100;
    const value = Math.min(Math.max(score, min), max); // Ensure score is within range

    const radius = 80; // Radius of the circle
    const strokeWidth = 10; // Thickness of the progress bar
    const circumference = 2 * Math.PI * radius; // Circumference of the circle
    const progress = ((value - min) / (max - min)) * circumference; // Progress length

    // Function to get the message based on the score
    const getMessage = (value) => {
        if (value < 40) return 'We are sorry you did\'t like the teaching style of our Staff. ';
        if (value < 70) return 'We will to improve our staff\'s effort.';
        return 'We are glad you are appreciating out staff\'s effort to teach you';
    };

    return (
        <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
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
                {/* Score text */}
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
            <p style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '15px', color: '#333' }}>
                Your Average Evaluation Score
            </p>
            {/* Dynamic message based on the score */}
            <p style={{ fontSize: '16px', marginTop: '10px', color: getColor(value) }}>
                {getMessage(value)}
            </p>
        </div>
    );
};

// Helper function to determine the color based on the score
const getColor = (value) => {
    if (value < 40) return '#ef5350'; // Red
    if (value < 70) return '#ffb300'; // Yellow
    return '#66bb6a'; // Green
};

export default AverageEvaluation;