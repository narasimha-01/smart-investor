document.addEventListener('DOMContentLoaded', () => {
    // Particles.js initialization
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#00bcd4"
            },
            "shape": {
                "type": "circle",
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ff007b",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    const doughnutChartCanvas = document.getElementById('portfolioDoughnutChart');
    const barChartCanvas = document.getElementById('portfolioBarChart');

    // Portfolio Allocation Doughnut Chart
    const portfolioData = {
        labels: ['Stocks', 'Mutual Funds', 'Fixed Deposits', 'Gold'],
        datasets: [{
            data: [40, 35, 20, 5],
            backgroundColor: [
                '#00bcd4',
                '#ff007b',
                '#4caf50',
                '#ffc107'
            ],
            hoverBackgroundColor: [
                '#00e9ff',
                '#ff3b99',
                '#66bb6a',
                '#ffcf33'
            ],
            borderWidth: 2,
            borderColor: '#1a1a2e',
        }]
    };

    new Chart(doughnutChartCanvas, {
        type: 'doughnut',
        data: portfolioData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#fff',
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
                            const percentage = (value / total * 100).toFixed(2);
                            return `${label}: ${percentage}%`;
                        }
                    }
                }
            }
        }
    });

    // Portfolio Growth Bar Chart
    const barData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Portfolio Value (₹)',
            data: [450000, 465000, 490000, 480000, 510000, 525000],
            backgroundColor: 'rgba(0, 188, 212, 0.8)',
            borderColor: '#00bcd4',
            borderWidth: 2,
            borderRadius: 5,
            hoverBackgroundColor: 'rgba(255, 0, 123, 0.8)',
        }]
    };

    new Chart(barChartCanvas, {
        type: 'bar',
        data: barData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255,255,255,0.1)'
                    },
                    ticks: {
                        color: '#fff'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255,255,255,0.1)'
                    },
                    ticks: {
                        color: '#fff',
                        callback: function(value) {
                            return `₹ ${value.toLocaleString('en-IN')}`;
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#fff'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += `₹ ${context.parsed.y.toLocaleString('en-IN')}`;
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
});