from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import NoteBook, Notes
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from .forms import NoteBookForm
from django.shortcuts import get_list_or_404, get_object_or_404


@login_required
def notebooks(request):
    """
    Returns all notebooks
    :param request:
    :return:
    """
    if request.META.get('HTTP_ACCEPT').startswith("text/html"):
        return render(request, 'note/notebook.html')
    elif request.content_type == 'application/json':
        notebooks = NoteBook.objects.filter(user=request.user)  # TODO pagination
        data = serializers.serialize('json', notebooks)
        return HttpResponse(data, content_type='application/json')


@login_required
def notebook_create(request):
    """
    Handles notebook creation
    :param request:
    :return:
    """
    if request.method == "POST":
        notebook_form = NoteBookForm(request.POST)
        if notebook_form.is_valid():
            notebook = notebook_form.save(commit=False)
            notebook.user = request.user
            notebook.save()
            return HttpResponse("success")
        else:
            return HttpResponse("error")
    return render(request, 'note/notebook_create.html')


@login_required
def notebook_by_id(request, pk):
    """
    Render notes list
    :param request:
    :param pk:
    :return:
    """
    if request.META.get('HTTP_ACCEPT').startswith("text/html"):
        return render(request, 'note/notebook_by_id.html')
    elif request.content_type == 'application/json':
        notebook = get_object_or_404(NoteBook, pk=pk, user=request.user)
        notes = Notes.objects.filter(note_book=notebook, user=request.user)
        data = serializers.serialize('json', notes)
        return HttpResponse(data, content_type='application/json')

