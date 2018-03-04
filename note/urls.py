from django.urls import path
from . import views

urlpatterns = [
    path('', views.notebook, name='notebook'),
    path('create/', views.notebook_create, name='notebook_create'),
]

