// static/myapp/food_list.js
// Handles progress bar color and form clear button logic

document.addEventListener('DOMContentLoaded', function() {
    // Progress bar color logic
    var bar = document.getElementById('calorieProgress');
    if (bar) {
        var calories = parseFloat(bar.getAttribute('data-calories'));
        // Remove all possible bg classes
        bar.classList.remove('bg-success', 'bg-danger', 'bg-warning', 'bg-primary');
        if (calories < 1500) {
            bar.classList.add('bg-warning');
        } else if (calories <= 2000) {
            bar.classList.add('bg-success');
        } else {
            bar.classList.add('bg-danger');
        }
    }

    // Clear button disables required on select
    var clearBtn = document.getElementById('clear-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', function(e) {
            var select = document.getElementById('id_food');
            if (select) {
                select.required = false;
            }
        });
    }
    // Chart.js Pie Chart for nutrients
    var pie = document.getElementById('nutrientPieChart');
    if (pie) {
        var carbs = parseFloat(pie.getAttribute('data-carbs'));
        var protein = parseFloat(pie.getAttribute('data-protein'));
        var fats = parseFloat(pie.getAttribute('data-fats'));
        var total = carbs + fats + protein
        var ctx = pie.getContext('2d');
        var data = {
            labels: [`Carbs ${Math.round((carbs/total)*100)} %`, `Protein ${Math.round((protein/total)*100)} %`, `Fats ${Math.round((fats/total)*100)} %`],
            datasets: [{
                data: [carbs, protein, fats],
                backgroundColor: [
                    '#4e79a7', // Carbs - blue
                    '#f28e2b', // Protein - orange
                    '#e15759'  // Fats - red
                ],
                borderColor: [
                    '#4e79a7',
                    '#f28e2b',
                    '#e15759'
                ],
                borderWidth: 2
            }]
        };
        new Chart(ctx, {
            type: 'pie',
            data: data,
            options: {
                responsive: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            font: { size: 14 }
                        }
                    }
                }
            }
        });
    }
});


