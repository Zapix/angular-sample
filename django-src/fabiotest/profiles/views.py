# -*- coding: utf-8 -*-
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth.forms import UserCreationForm

from rest_framework import status
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.decorators import permission_classes as set_permissions

from .serializers import UserSerializer


class UserView(RetrieveUpdateAPIView):

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class RegisterUserView(APIView):

    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        form = UserCreationForm(request.data)

        if form.is_valid():
            form.save()
            return Response({'info': "User has been registered please login"})
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def post(self, request, *args, **kwargs):
        form = PasswordChangeForm(self.get_object(), request.data)

        if form.is_valid():
            form.save()
            return Response(data={"info": "Your password has been changed"})
        return Response(
            data=form.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
