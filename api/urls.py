from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'notebook', views.NoteBookViewset)
router.register(r'notes', views.NotesViewset)

urlpatterns = [
    path('auth/', views.login),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('/', include(router.urls)),
    path('', views.BunnyAppView.as_view()),
]


