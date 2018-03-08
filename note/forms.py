from django.forms import ModelForm
from .models import NoteBook, Notes


class NoteBookForm(ModelForm):
    class Meta:
        model = NoteBook
        exclude = ('user',)


class NoteForm(ModelForm):
    class Meta:
        model = Notes
        exclude = ('user', 'note_book')

