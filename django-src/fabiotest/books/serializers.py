# -*- coding: utf-8 -*-
from rest_framework.serializers import ModelSerializer

from .models import Book


class BookSerializer(ModelSerializer):
    class Meta:
        model = Book
