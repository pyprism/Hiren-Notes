from django.db import models
from base.models import Account as User
import uuid


class NoteBook(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.TextField()
    encrypted = models.BooleanField(default=False)
    iv = models.CharField(max_length=500, blank=True, null=True)
    salt = models.CharField(max_length=1000, blank=True, null=True)
    unique_id = models.UUIDField(default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Notes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    note_book = models.ForeignKey(NoteBook, on_delete=models.CASCADE)
    title = models.TextField()
    title_salt = models.CharField(max_length=1000, blank=True, null=True)
    content = models.TextField()
    encrypted = models.BooleanField(default=False)
    iv = models.CharField(max_length=500, blank=True, null=True)
    salt = models.CharField(max_length=1000, blank=True, null=True)
    unique_id = models.UUIDField(default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

