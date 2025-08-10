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
});
