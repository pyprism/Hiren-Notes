from django.urls import resolve, reverse
from django.test import TestCase, TransactionTestCase
from django.contrib.auth.models import User
from django.test import Client
from . import views
from base.models import Account, Setting
from .models import NoteBook, Notes
from freezegun import freeze_time
from django.utils import timezone


class NotebooksViewTest(TestCase):

    def setUp(self):
        self.user = Account.objects.create_user(username='hiren', password="xyz")
        self.c = Client()

    def test_login_url_resolves_to_login_view(self):
        found = resolve(reverse('notebook'))
        self.assertEqual(found.func, views.notebooks)

    def test_redirect_for_unauthenticated_user_works(self):
        response = self.c.get(reverse('notebook'))
        self.assertRedirects(response, '/?next=' + reverse('notebook'))

    def test_view_returns_correct_template(self):
        self.c.force_login(self.user)
        response = self.c.get(reverse('notebook'), CONTENT_TYPE='text/plain')
        self.assertTemplateUsed(response, 'note/notebook.html')


