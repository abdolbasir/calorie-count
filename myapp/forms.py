from django import forms
from .models import Food

class FoodSelectForm(forms.Form):
    food = forms.ModelChoiceField(queryset=Food.objects.all(), label="Select Food", empty_label="Choose a food item")
