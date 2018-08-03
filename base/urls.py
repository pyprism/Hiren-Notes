from django.urls import path
from . import views

urlpatterns = [
    path('', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('settings/', views.settings, name='settings'),
    path('signup_settings/', views.signup_settings, name='signup_settings'),
    path('user/<str:username>/', views.update_user, name='update_user'),
    path('user/', views.create_user, name='create_user'),
    path('secret/', views.secret_code, name='secret_code'),
    path('logout/', views.logout, name='logout'),
]

