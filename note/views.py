from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import NoteBook, Notes
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from .forms import NoteBookForm, NoteForm
from django.shortcuts import get_list_or_404, get_object_or_404
from django.contrib import messages


@login_required
def notebooks(request):
    """
    Returns all notebooks
    :param request:
    :return:
    """
    if request.content_type == 'text/plain':
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
    notebook = get_object_or_404(NoteBook, pk=pk, user=request.user)
    if request.content_type == 'text/plain':
        return render(request, 'note/notebook_by_id.html', {'pk': pk})
    elif request.content_type == 'application/json':
        notes = Notes.objects.filter(note_book=notebook, user=request.user)
        data = serializers.serialize('json', notes)
        return HttpResponse(data, content_type='application/json')


@login_required
def note_create(request, pk):
    """
    Create new note
    :param request:
    :param pk: notebook pk
    :return:
    """
    if request.method == 'POST':
        notebook = get_object_or_404(NoteBook, pk=pk, user=request.user)
        note_form = NoteForm(request.POST)
        if note_form.is_valid():
            note = note_form.save(commit=False)
            note.user = request.user
            note.note_book = notebook
            note.save()
            return HttpResponse("success")
        else:
            return HttpResponse(note_form.errors)
    return render(request, 'note/note_create.html')


@login_required
def note_by_id(request, pk):
    """
    Return note by id
    :param request:
    :param pk: note pk
    :return:
    """
    if request.content_type == 'text/plain':
        return render(request, 'note/note_by_id.html', {'pk': pk})
    elif request.content_type == 'application/json':
        note = Notes.objects.filter(user=request.user, pk=pk)
        data = serializers.serialize('json', note)
        return HttpResponse(data, content_type='application/json')


@login_required
def note_delete(request, pk):
    """
    Delete note by id
    :param request:
    :param pk:
    :return:
    """
    note = get_object_or_404(Notes, pk=pk, user=request.user)
    note.delete()
    messages.success(request, 'Note has been deleted.')
    return redirect('notebook_by_id', pk=pk)


@login_required
def note_edit(request, pk):
    """
    Handle note editing
    :param request:
    :param pk:
    :return:
    """
    if request.method == 'POST':
        pk = request.POST.get('pk')
        note = get_object_or_404(Notes, user=request.user, pk=pk)
        note_form = NoteForm(request.POST, instance=note)
        if note_form.is_valid():
            note_form.save()
            messages.success(request, "Note has been updated.")
            return redirect("note_edit", pk=pk)
        else:
            messages.warning(request, note_form.errors)
            return redirect("note_edit", pk=pk)
    if request.content_type == 'text/plain':
        return render(request, 'note/note_edit.html', {'pk': pk})
    elif request.content_type == 'application/json':
        note = Notes.objects.filter(user=request.user, pk=pk)
        data = serializers.serialize('json', note)
        return HttpResponse(data, content_type='application/json')




