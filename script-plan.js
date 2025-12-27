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

    const calculateBtn = document.getElementById('calculate-btn');
    const monthlyIncomeEl = document.getElementById('monthly-income');
    const monthlyExpensesEl = document.getElementById('monthly-expenses');
    const savingsValueEl = document.getElementById('savings-value');
    const savingsProgressEl = document.getElementById('savings-progress');
    const progressTextEl = document.getElementById('progress-text');
    const chartCanvas = document.getElementById('savingsChart');
    let savingsChart = null;

    calculateBtn.addEventListener('click', () => {
        const monthlyIncome = parseFloat(monthlyIncomeEl.value) || 0;
        const monthlyExpenses = parseFloat(monthlyExpensesEl.value) || 0;
        const monthlySavings = monthlyIncome - monthlyExpenses;

        savingsValueEl.textContent = `₹ ${monthlySavings.toLocaleString('en-IN')}`;

        // Update progress bar (mock goal)
        const savingsGoal = 50000;
        const progress = Math.min((monthlySavings / savingsGoal) * 100, 100);
        savingsProgressEl.style.width = `${progress}%`;
        progressTextEl.textContent = `${progress.toFixed(0)}% Achieved`;

        // Update or create chart
        if (savingsChart) {
            savingsChart.destroy();
        }

        const data = {
            labels: ['Savings', 'Expenses'],
            datasets: [{
                data: [monthlySavings, monthlyExpenses],
                backgroundColor: [
                    '#00bcd4',
                    '#ff007b'
                ],
                hoverBackgroundColor: [
                    '#00e9ff',
                    '#ff3b99'
                ],
                borderWidth: 2,
                borderColor: '#1a1a2e',
            }]
        };

        const config = {
            type: 'pie',
            data: data,
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
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    label += `₹ ${context.parsed.toLocaleString('en-IN')}`;
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        };

        savingsChart = new Chart(chartCanvas, config);
    });
});