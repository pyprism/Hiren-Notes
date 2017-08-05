from django.db import models
from django.contrib.auth.models import User
import uuid


class Notes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.TextField()
    content = models.TextField()
    iv = models.CharField(max_length=500)
    salt = models.CharField(max_length=1000)
    synced_desktop = models.BooleanField(default=False)
    synced_mobile = models.BooleanField(default=False)
    unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

