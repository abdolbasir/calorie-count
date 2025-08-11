from django.urls import path
from . import views

urlpatterns = [
    path('foods/', views.food_list, name='food_list'),
    path('delete-consume/<int:consume_id>/', views.delete_consume, name='delete_consume'),
]
