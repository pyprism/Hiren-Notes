from django.urls import resolve, reverse
from django.test import TestCase, TransactionTestCase
from django.contrib.auth.models import User
from django.test import Client
from . import views
from .models import Account
from freezegun import freeze_time
from django.utils import timezone


class LoginViewTest(TestCase):

    def setUp(self):
        self.user = Account.objects.create_user(username='hiren', password="xyz")
        self.c = Client()

    def test_login_url_resolves_to_login_view(self):
        found = resolve(reverse('login'))
        self.assertEqual(found.func, views.login)

    def test_auth(self):
        respond = self.c.post(reverse('login'), {'username': 'hiren', 'password': 'xyz'})
        self.assertRedirects(respond, reverse('secret_code'))

    def test_redirect_for_unauthenticated_user_works(self):
        response = self.c.get(reverse('secret_code'))
        self.assertRedirects(response, '/?next=' + reverse('secret_code'))

    def test_redirect_for_authenticated_user_works(self):
        self.c.force_login(self.user)
        response = self.c.get(reverse('login'))
        self.assertRedirects(response, reverse('secret_code'))

    def test_redirect_works_for_bad_auth(self):
        respond = self.c.post(reverse('secret_code'), {'username': 'hiren', 'password': 'bad pass'})
        self.assertRedirects(respond, '/?next=' + reverse('secret_code'))

    def test_view_returns_correct_template(self):
        response = self.c.get(reverse('login'))
        self.assertTemplateUsed(response, 'base/login.html')

    def test_bad_auth(self):
        response = self.c.post(reverse('login'), {'username': 'hiren', 'password': 'bad pass'}, follow=True)
        message = list(response.context.get('messages'))[0]
        self.assertEqual(message.message, 'Username/Password is not valid!')

        self.assertRedirects(response, reverse('login'))


class SignupViewTest(TestCase):

    def setUp(self):
        self.c = Client()
        self.user = Account.objects.create_user(username='hiren', password="xyz")

    def test_logged_in_user_redirect_to_correct_view(self):
        self.c.force_login(self.user)
        response = self.c.get(reverse('signup'))
        self.assertRedirects(response, reverse('secret_code'))

    def test_signup_works(self):
        response = self.c.post(reverse('signup'), {'username': "bunny", "password": "xyz"})
        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, reverse('login'))
        self.assertEqual(Account.objects.count(), 2)

    def test_duplicate_username(self):
        response = self.c.post(reverse('signup'), {'username': "hiren", "password": "xyz"}, follow=True)
        message = list(response.context.get('messages'))[0]
        self.assertEqual(message.message, 'Username is not available!')

        self.assertRedirects(response, reverse('signup'))

    def test_view_returns_correct_template(self):
        response = self.c.get(reverse('signup'))
        self.assertTemplateUsed(response, 'base/signup.html')


class SecretViewTest(TestCase):

    def setUp(self):
        self.c = Client()
        self.user = Account.objects.create_user(username='hiren', password="xyz")
        self.c.force_login(self.user)

    def test_view_returns_correct_template(self):
        response = self.c.get(reverse('secret_code'))
        self.assertTemplateUsed(response, 'base/secret_code.html')


