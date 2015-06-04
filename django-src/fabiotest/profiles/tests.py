from django.core.urlresolvers import reverse
from django.contrib.auth.models import User

from rest_framework.test import APITestCase

from .serializers import UserSerializer


class ChangePasswordTestCase(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user('tester', 'test@gmail.com', 'test')

    def test_password_change_success(self):
        self.client.login(username='tester', password='test')

        response = self.client.post(
            reverse('user-change-password'),
            {
                'old_password': 'test',
                'new_password1': '123123',
                'new_password2': '123123'
            },
            format='json'
        )
        self.assertEquals(response.status_code, 200)

    def test_password_change_fail(self):
        self.client.login(username='tester', password='test')

        response = self.client.post(
            reverse('user-change-password'),
            {
                'old_password': 'test',
                'new_password1': '123123'
            },
            format='json'
        )
        self.assertEquals(response.status_code, 400)


class CreateUserTestCase(APITestCase):

    def test_create_user_success(self):
        response = self.client.post(
            reverse('user-register'),
            {
                'username': 'test',
                'password1': 'test',
                'password2': 'test'
            },
            format='json'
        )
        self.assertEquals(response.status_code, 200)

    def test_create_user_error(self):
        response = self.client.post(
            reverse('user-register'),
            {
                'username': 'test',
                'password1': 'test',
                'password2': 'error'
            }
        )
        self.assertEquals(response.status_code, 400)


class BirthdayUpdateTestCae(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user('tester', 'test@gmail.com', 'test')

    def test_profile_update(self):
        serializer = UserSerializer(
            self.user,
            data={'birthday': '2000-05-03'},
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        self.assertEquals(serializer.data['birthday'], '2000-05-03')

