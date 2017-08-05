from django.test import TestCase, TransactionTestCase
from .models import Notes
from django.utils import timezone
from rest_framework.test import APIRequestFactory, APIClient
from django.contrib.auth.models import User
from freezegun import freeze_time
import json
