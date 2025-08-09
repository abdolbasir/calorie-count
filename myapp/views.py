
from django.shortcuts import render

from .models import Food
from .forms import FoodSelectForm

def food_list(request):
    foods = Food.objects.all()
    form = FoodSelectForm()
    return render(request, 'myapp/food_list.html', {'foods': foods, 'form': form})
