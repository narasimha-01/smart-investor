// This file is not strictly necessary as chart logic is embedded in the respective script files.
// However, to follow the requested structure, I will provide the functions here.
// Note: You must include this file in your HTML files after the Chart.js library.

function createPieChart(canvasId, data) {
    const chartCanvas = document.getElementById(canvasId);
    new Chart(chartCanvas, {
        type: 'pie',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: [
                    '#00bcd4',
                    '#ff007b',
                    '#4caf50',
                    '#ffc107',
                    '#673ab7'
                ],
                borderColor: '#1a1a2e',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#fff'
                    }
                }
            }
        }
    });
}

function createDoughnutChart(canvasId, data) {
    const chartCanvas = document.getElementById(canvasId);
    new Chart(chartCanvas, {
        type: 'doughnut',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: [
                    '#00bcd4',
                    '#ff007b',
                    '#4caf50',
                    '#ffc107',
                    '#673ab7'
                ],
                borderColor: '#1a1a2e',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#fff'
                    }
                }
            }
        }
    });
}

function createLineChart(canvasId, data) {
    const chartCanvas = document.getElementById(canvasId);
    new Chart(chartCanvas, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Projected Value (₹)',
                data: data.values,
                borderColor: '#00bcd4',
                backgroundColor: 'rgba(0, 188, 212, 0.2)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#ff007b'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    ticks: {
                        color: '#fff'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                },
                y: {
                    ticks: {
                        color: '#fff',
                        callback: function(value) {
                            return `₹ ${value.toLocaleString('en-IN')}`;
                        }
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                }
            }
        }
    });
}

function createBarChart(canvasId, data) {
    const chartCanvas = document.getElementById(canvasId);
    new Chart(chartCanvas, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Portfolio Growth (₹)',
                data: data.values,
                backgroundColor: 'rgba(0, 188, 212, 0.8)',
                borderColor: '#00bcd4',
                borderWidth: 2,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    ticks: {
                        color: '#fff'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                },
                y: {
                    ticks: {
                        color: '#fff',
                        callback: function(value) {
                            return `₹ ${value.toLocaleString('en-IN')}`;
                        }
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                }
            }
        }
    });
}