from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password
from django.contrib import auth
from django.contrib import messages
from django.db.utils import IntegrityError
from .models import Account, Setting
from django.shortcuts import get_object_or_404


def login(request):
    """
    Handles authentication
    :param request:
    :return:
    """
    if request.user.is_authenticated:
        return redirect('secret_code')
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = auth.authenticate(username=username, password=password)
        if user:
            auth.login(request, user)
            return redirect('secret_code')
        else:
            messages.warning(request, 'Username/Password is not valid!')
            return redirect('login')
    else:
        return render(request, 'base/login.html')


def signup(request):
    """
    Handles signup
    :param request:
    :return:
    """
    if request.user.is_authenticated:
        return redirect('secret_code')
    if request.method == "POST":
        sign_up, created = Setting.objects.get_or_create(task='S')
        if sign_up.active:
            username = request.POST.get('username')
            password = request.POST.get('password')
            acc = Account(username=username, password=make_password(password))
            try:
                acc.save()
            except IntegrityError:
                messages.warning(request, "Username is not available!")
                return redirect('signup')
            messages.success(request, 'Account has been created successfully!')
            return redirect('login')
        else:
            messages.warning(request, 'Signup is disabled!')
        return redirect('signup')
    else:
        return render(request, 'base/signup.html')


@login_required
def secret_code(request):
    return render(request, 'base/secret_code.html')


@login_required
def settings(request):
    users = Account.objects.all()
    sign_up, created = Setting.objects.get_or_create(task='S')
    return render(request, 'base/settings.html', {'users': users, 'signup': sign_up})


@login_required
def create_user(request):
    """
    Create non-admin user
    :param request:
    :return:
    """
    if request.user.is_admin:
        if request.method == 'POST':
            username = request.POST.get('username')
            password = request.POST.get('password')
            acc = Account(username=username, password=make_password(password))
            try:
                acc.save()
            except IntegrityError:
                messages.error(request, "username is not available!")
                return redirect('create_user')
            messages.success(request, 'Account created successfully!')
            return redirect('create_user')
        return render(request, 'base/create_user.html')


@login_required
def signup_settings(request):
    if request.user.is_admin:
        if request.method == 'POST':
            sign_up = Setting.objects.get(task='S')
            if request.POST.get('enable'):
                sign_up.active = False
            elif request.POST.get('disable'):
                sign_up.active = True
            sign_up.save()
            return redirect('settings')


@login_required
def update_user(request, username):
    """
    update password
    :param request:
    :param username:
    :return:
    """
    if request.user.is_admin:
        if request.method == 'POST':
            user = get_object_or_404(Account, username=username)
            user.set_password(request.POST.get('password'))
            user.save()
            messages.success(request, 'Password updated.')
            return redirect('update_user', username=username)
        return render(request, 'base/update_user.html')



