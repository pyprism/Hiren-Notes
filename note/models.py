from django.db import models
from hiren.settings import AUTH_USER_MODEL as User
import uuid


class NoteBook(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=500, unique=True)
    unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Notes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    note_book = models.ForeignKey(NoteBook, on_delete=models.PROTECT)
    title = models.TextField()
    content = models.TextField()
    encrypted = models.BooleanField(default=False)
    iv = models.CharField(max_length=500, blank=True, null=True)
    salt = models.CharField(max_length=1000, blank=True, null=True)
    synced_desktop = models.BooleanField(default=False)
    synced_mobile = models.BooleanField(default=False)
    unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

