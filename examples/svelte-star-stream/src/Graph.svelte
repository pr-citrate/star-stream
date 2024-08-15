<script lang="ts">
    import { Line } from 'svelte-chartjs';
    import 'chart.js/auto';

    export let stars: number[] = [];
    export let mean: number = 0;
    export let stdDev: number = 0;

    const chartData = {
        labels: stars.map((_, index) => `Star ${index + 1}`),
        datasets: [
            {
                label: 'Stars',
                data: stars,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
                pointRadius: 5,
            },
            {
                label: 'Mean',
                data: Array(stars.length).fill(mean),
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                borderDash: [5, 5],
                pointRadius: 0,
            },
            {
                label: 'stdDev',
                data: Array(stars.length).fill(mean + stdDev),
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 2,
                borderDash: [5, 5],
                pointRadius: 0,
                fill: false,
                type: 'line',
            },
            {
                data: Array(stars.length).fill(mean - stdDev),
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 2,
                borderDash: [5, 5],
                pointRadius: 0,
                fill: false,
                type: 'line',
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };
</script>

<Line {chartData} {options} />
