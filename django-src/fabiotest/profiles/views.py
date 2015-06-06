# -*- coding: utf-8 -*-
from django.contrib.auth.forms import PasswordChangeForm

from rest_framework import status
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateAPIView, ListAPIView

from .forms import ExtendedUserCreationForm
from .serializers import UserSerializer
from books.serializers import BookWithoutAuthorFieldSerializer


class UserView(RetrieveUpdateAPIView):

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class RegisterUserView(APIView):

    permission_classes = [permissions.AllowAny]
    form_class = ExtendedUserCreationForm

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.data)

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


class BookListView(ListAPIView):
    serializer_class = BookWithoutAuthorFieldSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.books.all()
