from django.urls import path
from django.contrib.auth.views import logout
from . import views

urlpatterns = [
    path('', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('settings/', views.settings, name='settings'),
    path('create_user/', views.create_user, name='create_user'),
    path('secret/', views.secret_code, name='secret_code'),
    path('logout/', logout, {'next_page': '/'}, name='logout'),
]

