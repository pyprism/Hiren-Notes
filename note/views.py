from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import NoteBook, Notes
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from .forms import NoteBookForm


@login_required
def notebook(request):
    if request.META.get('HTTP_ACCEPT').startswith("text/html"):
        return render(request, 'note/notebook.html')
    elif request.content_type == 'application/json':
        notebooks = NoteBook.objects.all()  # TODO pagination
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
    if request.META.get('HTTP_ACCEPT').startswith("text/html"):
        return render(request, 'note/notebook_create.html')
    elif request.content_type == 'application/json':
        pass


