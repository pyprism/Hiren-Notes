from django.urls import path
from . import views

urlpatterns = [
    path('', views.notebook, name='notebook'),
]

