from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework import viewsets
from .serializers import NotesSerializer
from .models import Notes


class NotesViewset(viewsets.ModelViewSet):
    """
        API endpoint that allows notes to be created, viewed ,edited and deleted.
    """
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)
    queryset = Notes.objects.all()
    serializer_class = NotesSerializer

