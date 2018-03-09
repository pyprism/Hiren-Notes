from django.urls import resolve, reverse
from django.test import TestCase, TransactionTestCase
from django.contrib.auth.models import User
from django.test import Client
from . import views
from base.models import Account, Setting
from .models import NoteBook, Notes
from freezegun import freeze_time
from django.utils import timezone
