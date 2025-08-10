
from django.shortcuts import render

from .models import Food
from .forms import FoodSelectForm

from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from .models import Food, Consume
from .forms import FoodSelectForm

from django.contrib import messages

@login_required
def food_list(request):
    foods = Food.objects.all()
    if request.method == 'POST':
        if 'clear' in request.POST:
            Consume.objects.filter(user=request.user).delete()
            messages.success(request, "All consumed foods cleared.")
            return redirect('food_list')
        else:
            form = FoodSelectForm(request.POST)
            if form.is_valid():
                food = form.cleaned_data['food']
                Consume.objects.create(user=request.user, food_consumed=food)
                messages.success(request, f"{food.name} added to your consumed foods.")
                return redirect('food_list')
    else:
        form = FoodSelectForm()
    consumed = None
    if request.user.is_authenticated:
        consumed = Consume.objects.filter(user=request.user).select_related('food_consumed')
    # Calculate sums for consumed foods
    sum_carbs = round(sum([item.food_consumed.carbs for item in consumed]), 2) if consumed else 0
    sum_protein = round(sum([item.food_consumed.protein for item in consumed]), 2) if consumed else 0
    sum_fats = round(sum([item.food_consumed.fats for item in consumed]), 2) if consumed else 0
    sum_calories = round(sum([item.food_consumed.calories for item in consumed]), 2) if consumed else 0
    return render(request, 'myapp/food_list.html', {
        'foods': foods,
        'form': form,
        'consumed': consumed,
        'sum_carbs': sum_carbs,
        'sum_protein': sum_protein,
        'sum_fats': sum_fats,
        'sum_calories': sum_calories,
    })
