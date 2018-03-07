from django.urls import path
from . import views

urlpatterns = [
    path('', views.notebooks, name='notebook'),
    path('<int:pk>/', views.notebook_by_id, name='notebook_by_id'),
    path('create/', views.notebook_create, name='notebook_create'),
]

