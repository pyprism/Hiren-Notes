from django.db import models
from base.models import Account as User
import uuid


class NoteBook(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.TextField()
    description = models.TextField()
    encrypted = models.BooleanField(default=False)
    unique_id = models.UUIDField(default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Notes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    note_book = models.ForeignKey(NoteBook, on_delete=models.CASCADE)
    title = models.TextField()
    content = models.TextField()
    encrypted = models.BooleanField(default=False)
    unique_id = models.UUIDField(default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

