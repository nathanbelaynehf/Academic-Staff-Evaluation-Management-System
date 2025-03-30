import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Studentgraph() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8082/reg/student-counts', {
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setDepartments(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center">Loading chart data...</div>;
  if (error) return <div className="text-danger">Error: {error}</div>;

  // Prepare chart data
  const chartData = {
    labels: departments.map(dept => dept.departmentName),
    datasets: [
      {
        label: 'Number of Students',
        data: departments.map(dept => dept.studentCount),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
       
        ],
        borderColor: [
          'rgba(54, 162, 235, 0.6)',
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Number of Students on each Department',
        font: {
          size: 18
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Students'
        }
      }
    }
  };

  return (
    <div className="card shadow-sm p-3">
      <div style={{ height: '420px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default Studentgraph;