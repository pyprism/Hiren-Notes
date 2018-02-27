from django.test import TestCase, TransactionTestCase
from note.models import Notes, NoteBook
from django.utils import timezone
from rest_framework.test import APIRequestFactory, APIClient
from hiren.settings import AUTH_USER_MODEL as User
from base.models import Account
from freezegun import freeze_time
import uuid
from unittest.mock import patch


class NotesViewTest(TransactionTestCase):
    """
        Test Notes View
    """
    reset_sequences = True

    @freeze_time("2012-05-12")
    # @patch.object(uuid, 'uuid4', side_effect=TEST_UUID)
    def setUp(self):
        self.client = APIClient()
        self.user = Account.objects.create_user('hiren', 'password')
        self.client.force_authenticate(user=self.user)
        self.TEST_UUID = '2e49f1f0-e17b-4876-9beb-4d9b539683d8'
        with patch.object(uuid, 'uuid4', side_effect=self.TEST_UUID):
            self.notebook = NoteBook.objects.create(user=self.user, name="bunny")
            Notes.objects.create(note_book=self.notebook, user=self.user, iv="random", content="test content")

    def test_login_works(self):
        response = self.client.get('/api/notes/')
        self.assertEqual(response.status_code, 200)

        self.client.logout()
        response = self.client.get('/api/notes/')
        self.assertEqual(response.status_code, 403)

    # def test_return_correct_note(self):
    #     response = self.client.get('/api/notes/1/')
    #     print(response.json())


class LoginViewTest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = Account.objects.create_user('hiren', 'password')

    def test_login_failed(self):
        response = self.client.post('/api/auth/', {'username': 'hire', 'password': 'password'})
        self.assertEqual(response.json(), {'error': 'Username/Password is not valid'})

    def test_login_success(self):
        response = self.client.post('/api/auth/', {'username': 'hiren', 'password': 'password'})
        self.assertEqual(response.status_code, 200)
