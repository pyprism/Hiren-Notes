from django.urls import include, path, re_path
from . import views

urlpatterns = [
    path('', views.login, name='login'),
    path('signup/', views.signup, name='signup')
]

