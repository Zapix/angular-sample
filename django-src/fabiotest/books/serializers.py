# -*- coding: utf-8 -*-
from rest_framework.serializers import ModelSerializer

from .models import Book
from profiles.serializers import UserSerializer


class BookSerializer(ModelSerializer):
    author = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Book


class BookWithoutAuthorFieldSerializer(ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'title')
