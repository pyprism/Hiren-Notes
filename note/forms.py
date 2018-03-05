from django.forms import ModelForm
from .models import NoteBook, Notes


class NoteBookForm(ModelForm):
    class Meta:
        model = NoteBook
        exclude = ('user',)

