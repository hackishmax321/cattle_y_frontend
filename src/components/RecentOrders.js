// components/RecentOrders.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registering necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RecentOrders = () => {
  // Sample data for milk production over the past 7 days
  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Milk Production (Liters)',
        data: [120, 150, 100, 180, 170, 140, 190], // Sample production values
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
        },
      },
      title: {
        display: true,
        text: 'Milk Production Over the Past 7 Days',
        color: '#333',
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#333',
        },
        title: {
          display: true,
          text: 'Days',
          color: '#333',
        },
      },
      y: {
        ticks: {
          color: '#333',
        },
        title: {
          display: true,
          text: 'Liters Produced',
          color: '#333',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="recentOrders">
      <div className="cardHeader">
        <h2>Recent Production</h2>
        <a href="#" className="btn">View All</a>
      </div>
      <div className="chartContainer">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default RecentOrders;
