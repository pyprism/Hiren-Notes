from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password
from django.contrib import auth
from django.contrib import messages
from .models import Account


def login(request):
    """
        Handles authentication
        :param request:
        :return:
        """
    if request.user.is_authenticated:
        return redirect('inbox')
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = auth.authenticate(username=username, password=password)
        if user:
            auth.login(request, user)
            return redirect('inbox')
        else:
            messages.warning(request, 'Username/Password is not valid!')
            return redirect('login')
    else:
        return render(request, 'base/login.html')

