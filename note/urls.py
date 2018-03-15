from django.urls import path
from . import views

urlpatterns = [
    path('', views.notebooks, name='notebook'),
    path('<int:pk>/', views.notebook_by_id, name='notebook_by_id'),
    path('create/', views.notebook_create, name='notebook_create'),
    path('<int:pk>/create/', views.note_create, name='note_create'),
    path('note/<int:pk>/delete/', views.note_delete, name='note_delete'),
    path('note/<int:pk>/edit/', views.note_edit, name='note_edit'),
    path('note/<int:pk>/', views.note_by_id, name='note_by_id'),
]

