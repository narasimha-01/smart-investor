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

    const monthlySavingsSlider = document.getElementById('monthly-savings');
    const riskLevelSlider = document.getElementById('risk-level');
    const durationSlider = document.getElementById('duration');
    const savingsValueDisplay = document.getElementById('savings-value-display');
    const riskValueDisplay = document.getElementById('risk-value-display');
    const durationValueDisplay = document.getElementById('duration-value-display');
    const projectedGrowthPercent = document.getElementById('projected-growth-percent');
    const finalValueDisplay = document.getElementById('final-value');
    const chartCanvas = document.getElementById('simulatorChart');
    let simulatorChart = null;

    // Mapping risk levels to returns
    const riskReturns = {
        '1': 0.08,  // Low risk (e.g., FD)
        '2': 0.12,  // Medium risk (e.g., Mutual Funds)
        '3': 0.18   // High risk (e.g., Stocks)
    };

    function updateSimulation() {
        const monthlySavings = parseFloat(monthlySavingsSlider.value);
        const riskLevel = riskLevelSlider.value;
        const durationYears = parseInt(durationSlider.value);
        const annualReturnRate = riskReturns[riskLevel];

        savingsValueDisplay.textContent = monthlySavings.toLocaleString('en-IN');
        riskValueDisplay.textContent = ['Low', 'Medium', 'High'][riskLevel - 1];
        durationValueDisplay.textContent = durationYears;

        const monthlyRate = annualReturnRate / 12;
        const totalMonths = durationYears * 12;
        let futureValue = 0;
        const labels = [];
        const data = [];

        for (let i = 1; i <= totalMonths; i++) {
            futureValue = futureValue * (1 + monthlyRate) + monthlySavings;
            if (i % 12 === 0) {
                labels.push(`Year ${i / 12}`);
                data.push(futureValue.toFixed(0));
            }
        }

        const totalInvestment = monthlySavings * totalMonths;
        const totalGrowth = futureValue - totalInvestment;
        const growthPercentage = (totalGrowth / totalInvestment) * 100;

        projectedGrowthPercent.textContent = `${growthPercentage.toFixed(2)}%`;
        finalValueDisplay.textContent = `₹ ${Math.round(futureValue).toLocaleString('en-IN')}`;

        if (simulatorChart) {
            simulatorChart.destroy();
        }

        simulatorChart = new Chart(chartCanvas, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Projected Wealth (₹)',
                    data: data,
                    borderColor: '#00bcd4',
                    backgroundColor: 'rgba(0, 188, 212, 0.2)',
                    borderWidth: 3,
                    pointRadius: 5,
                    pointBackgroundColor: '#ff007b',
                    pointBorderColor: '#fff',
                    fill: 'start',
                    tension: 0.4,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        ticks: {
                            color: '#fff',
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
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#fff',
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
    }

    monthlySavingsSlider.addEventListener('input', updateSimulation);
    riskLevelSlider.addEventListener('input', updateSimulation);
    durationSlider.addEventListener('input', updateSimulation);

    // Initial run
    updateSimulation();
});