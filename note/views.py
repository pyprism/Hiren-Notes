from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import NoteBook, Notes


@login_required
def notebook(request):
    return render(request, 'note/notebook.html')

