import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend);

interface StarChartProps {
    stars: number[];
    mean: number;
    stdDev: number;
}

const StarChart: React.FC<StarChartProps> = ({ stars, mean, stdDev }) => {
    const chartData = {
        labels: stars.map((_, index) => `Star ${index + 1}`),
        datasets: [
            {
                label: 'Star Ratings',
                data: stars,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
                pointRadius: 5,
                fill: true,
            },
            {
                label: 'Mean',
                data: Array(stars.length).fill(mean),
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                borderDash: [5, 5],
                pointRadius: 0,
                fill: false,
            },
            {
                label: 'Std Dev + Mean',
                data: Array(stars.length).fill(mean + stdDev),
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 2,
                borderDash: [5, 5],
                pointRadius: 0,
                fill: false,
            },
            {
                label: 'Std Dev - Mean',
                data: Array(stars.length).fill(mean - stdDev),
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 2,
                borderDash: [5, 5],
                pointRadius: 0,
                fill: false,
            },
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => `${context.dataset.label}: ${context.raw}`,
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default StarChart;
