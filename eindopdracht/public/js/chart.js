let bmiChart = null;

function initChart() {
    const ctx = document.getElementById('bmiChart').getContext('2d');
    bmiChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'BMI Waarde',
                data: [],
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                tension: 0.3,
                fill: true
            }, {
                label: 'Ondergewicht (<18.5)',
                data: [],
                borderColor: '#2196F3',
                borderDash: [5, 5],
                showLine: true,
                pointRadius: 0
            }, {
                label: 'Gezond (18.5-25)',
                data: [],
                borderColor: '#4CAF50',
                borderDash: [5, 5],
                showLine: true,
                pointRadius: 0
            }, {
                label: 'Overgewicht (>25)',
                data: [],
                borderColor: '#FF9800',
                borderDash: [5, 5],
                showLine: true,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}` } }
            },
            scales: {
                y: { min: 10, max: 40, title: { display: true, text: 'BMI' } },
                x: { title: { display: true, text: 'Datum' } }
            }
        }
    });
}

async function updateChart(period) {
    if (!bmiChart) initChart();
    
    const measurements = await filterByPeriod(period);
    measurements.sort((a, b) => new Date(a.datum) - new Date(b.datum));
    
    const labels = measurements.map(m => new Date(m.datum).toLocaleDateString());
    const bmiValues = measurements.map(m => m.bmi);
    
    bmiChart.data.labels = labels;
    bmiChart.data.datasets[0].data = bmiValues;
    
    // Referentielijnen
    const ondergewichtLine = Array(labels.length).fill(18.5);
    const gezondLine = Array(labels.length).fill(25);
    
    bmiChart.data.datasets[1].data = ondergewichtLine;
    bmiChart.data.datasets[2].data = gezondLine;
    bmiChart.update();
}