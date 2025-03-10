import React, { useEffect } from 'react';

const StudentGraph = () => {
    useEffect(() => {
        // Load the Google Charts library
        const loadGoogleCharts = () => {
            const script = document.createElement('script');
            script.src = 'https://www.gstatic.com/charts/loader.js';
            script.onload = () => {
                // After the script is loaded, execute the chart drawing function
                window.google.charts.load('current', { packages: ['corechart'] });
                window.google.charts.setOnLoadCallback(drawChart);
            };
            document.body.appendChild(script);
        };

        const drawChart = () => {
            // Data for total number of students over 5 years
            const data = window.google.visualization.arrayToDataTable([
                ['Year', 'Total Students'],
                [new Date(2024, 0, 1), 120], // Year 2024
                [new Date(2025, 0, 1), 150], // Year 2025
                [new Date(2026, 0, 1), 180], // Year 2026
                [new Date(2027, 0, 1), 200], // Year 2027
                [new Date(2028, 0, 1), 220]  // Year 2028
            ]);

            const options = {
                title: 'Total Number of Students Over 5 Years',
                curveType: 'function',
                legend: { position: 'bottom' },
                hAxis: {
                    title: 'Year',
                    format: 'yyyy'
                },
                vAxis: {
                    title: 'Total Students',
                    viewWindow: {
                        min: 0
                    }
                },
                tooltip: { text: 'value' },
            };

            const chart = new window.google.visualization.LineChart(document.getElementById('student_chart'));
            chart.draw(data, options);
        };

        loadGoogleCharts();

        // Cleanup function to remove script if the component unmounts
        return () => {
            const script = document.querySelector('script[src="https://www.gstatic.com/charts/loader.js"]');
            if (script) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <div id="student_chart" style={{ width: '100%', height: '500px' }}></div>
    );
};

export default StudentGraph;