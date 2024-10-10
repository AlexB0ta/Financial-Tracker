import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    LineController,  // Add this line
    BarController,   // Add this line (since you're using bar chart too)
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartLine} from "@fortawesome/free-solid-svg-icons";

// Register required components including LineController and BarController
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    LineController, // Register the LineController
    BarController,  // Register the BarController
    Title,
    Tooltip,
    Legend
);

const ChartComponent = () => {
    // Data for the chart
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                type: 'bar',
                label: 'Expenses',
                data: [12000, 19000, 3000, 5000, 20000, 30000],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                type: 'bar',
                label: 'Income',
                data: [15000, 23000, 20000, 15000, 25000, 35000],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                type: 'line',  // Ensure "line" type is used correctly
                label: 'Net Profit',
                data: [3000, 4000, 17000, 10000, 5000, 5000],
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 2,
                tension: 0.3, // Smoothing the line
            },
        ],
    };

    // Options to style the chart
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Income, Expenses, and Net Profit Over Time',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="flex flex-col items-center">
            <div className="card-title font-bold">
                <p className="bg-blue-900 p-2 rounded-lg flex items-center justify-center">
                    Analytics <FontAwesomeIcon className="ml-2" icon={faChartLine}/>
                </p>
            </div>
            <div className="w-full max-w-3xl mx-auto mt-3">
                <Bar data={data} options={options}/>
            </div>
        </div>

    );
};

export default ChartComponent;
